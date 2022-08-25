import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useMemo, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {Colors} from "../../../constants/colors";
import {CoachScreenNames} from "../../ScreenNames";
import useHttpClient from "../../../hooks/useHttpClient";
import useAuth from "../../../hooks/useAuth";
import {getCategoryDisplayValue} from "../../../constants/categoryType";
import {RequirementType} from "../../../constants/requirementType";
import {getEquipmentTypeDisplayValue} from "../../../constants/equipmentType";
import useError from "../../../hooks/useError";
import FormOption from "../../../components/FormOption";
import HeaderCenter from "../../../components/HeaderCenter";
import {generateThumbnail} from "../../../util/thumbnailUtil";
import useLongRequest from "../../../hooks/useLongRequest";
import {LongRequest, LongRequestType} from "../../../model/longRequest";

const Fields = {
    Name: 'NAME',
    Description: 'DESCRIPTION',
    Category: 'CATEGORY',
    Equipment: 'EQUIPMENT',
    DemoFront: 'DEMO_FRONT',
    DemoSide: 'DEMO_SIDE',
    DemoClose: 'DEMO_CLOSE',
}

const CreateOrEditDrillScreen = ({route}) => {

    let drill;
    if (!!route.params) {
        drill = route.params.drill;
    }

    const [name, setName] = useState(!!drill ? drill.name : '');
    const [description, setDescription] = useState(!!drill ? drill.description : '');
    const [category, setCategory] = useState(!!drill ? drill.category : '');
    const [equipment, setEquipment] = useState(!!drill ? drill.equipment : []);

    const [frontVideo, setFrontVideo] = useState(!!drill?.demos?.front ? {uri: drill.demos.front.fileLocation} : undefined);
    const [sideVideo, setSideVideo] = useState(!!drill?.demos?.side ? {uri: drill.demos.side.fileLocation} : undefined);
    const [closeVideo, setCloseVideo] = useState(!!drill?.demos?.close ? {uri: drill.demos.close.fileLocation} : undefined);

    const [frontVideoThumbnail, setFrontVideoThumbnail] = useState(!!drill?.demos?.frontThumbnail ? {uri: drill.demos.frontThumbnail.fileLocation} : undefined);
    const [sideVideoThumbnail, setSideVideoThumbnail] = useState(!!drill?.demos?.sideThumbnail ? {uri: drill.demos.sideThumbnail.fileLocation} : undefined);
    const [closeVideoThumbnail, setCloseVideoThumbnail] = useState(!!drill?.demos?.closeThumbnail ? {uri: drill.demos.closeThumbnail.fileLocation} : undefined);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {executeLongRequest} = useLongRequest();
    const navigation = useNavigation();
    const {httpClient} = useHttpClient();
    const {coachId} = useAuth();
    const {setError} = useError();

    const onSubmit = async () => {
        if (isSubmitting) {
            return;
        }
        try {
            const fieldsWithInvalidInput = getFieldsWithInvalidInput();
            if (fieldsWithInvalidInput.length > 0) {
                setHasSubmitted(true);
                return;
            }

            if (fieldsWithInvalidInput.length === 0) {
                setIsSubmitting(true);

                let currentDrill = !!drill ? drill : null;
                if (!currentDrill) {
                    currentDrill = await httpClient.createDrill({
                        coachId: coachId,
                        name: name,
                        description: description,
                        category: category,
                        equipment: equipment,
                    });
                }

                const input = {
                    drill: {
                        ...currentDrill,
                        name: name,
                        description: description,
                        category: category,
                        equipment: equipment,
                    },
                    frontVideo: frontVideo,
                    sideVideo: sideVideo,
                    closeVideo: closeVideo,
                    frontVideoThumbnail: frontVideoThumbnail,
                    sideVideoThumbnail: sideVideoThumbnail,
                    closeVideoThumbnail: closeVideoThumbnail
                };
                executeLongRequest(new LongRequest(LongRequestType.UpdateDrill, {drillId: currentDrill.drillId}, input))

                // for some reason the navigation back glitches if we do not have some async function in here
                await httpClient.stall(0);
                setIsSubmitting(false);
                if (!currentDrill) {
                    navigation.goBack();
                } else {
                    navigation.pop(2);
                }
            }
        } catch (e) {
            console.log(e);
            setError('An error occurred. Please try again.');
            setIsSubmitting(false);
        }
    };

    const getFieldsWithInvalidInput = () => {
        const fieldsWithInvalidInput = [];

        if (!name) {
            fieldsWithInvalidInput.push(Fields.Name);
        }
        if (!description) {
            fieldsWithInvalidInput.push(Fields.Description);
        }
        if (!category) {
            fieldsWithInvalidInput.push(Fields.Category);
        }
        if (!equipment || equipment.length === 0) {
            fieldsWithInvalidInput.push(Fields.Equipment);
        }
        if (!frontVideo) {
            fieldsWithInvalidInput.push(Fields.DemoFront);
        }
        if (!sideVideo) {
            fieldsWithInvalidInput.push(Fields.DemoSide);
        }
        if (!closeVideo) {
            fieldsWithInvalidInput.push(Fields.DemoClose);
        }

        return fieldsWithInvalidInput;
    }

    const shouldShowValidationErrorForField = (field) => {
        return hasSubmitted && getFieldsWithInvalidInput().includes(field);
    }

    const getEquipmentDisplayValue = () => {
        return equipment.map(equipmentItem => {
            if (equipmentItem.requirement.requirementType === RequirementType.Count) {
                return `${equipmentItem.requirement.count} ${getEquipmentTypeDisplayValue(equipmentItem.equipmentType)}(s)`;
            } else {
                const length = equipmentItem.requirement.dimension.length;
                const width = equipmentItem.requirement.dimension.width;
                return `${length} X ${width} yards`;
            }
        }).join(', ');
    }

    const headerLeft = useMemo(() => <Text>Cancel</Text>, []);


    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeAreaView}>
                <View style={styles.content}>
                    <HeaderCenter title={!!drill ? 'Update drill' : 'Add drill'}
                                  left={headerLeft}
                                  onLeftPress={navigation.goBack}/>

                    <KeyboardAvoidingScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={0}>
                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>Overview</Text>
                        </View>
                        <FormOption title={'Name'}
                                onPress={() => navigation.navigate(CoachScreenNames.EditDrillName, {
                                    name: name,
                                    setName: setName
                                })}
                                textValue={name}
                                placeholder={'Give this drill a name'}
                                errorMessage={shouldShowValidationErrorForField(Fields.Name)
                                    ? 'Give this drill a name'
                                    : null}/>
                        <FormOption title={'Description'}
                                onPress={() => navigation.navigate(CoachScreenNames.EditDrillDescription, {
                                    description: description,
                                    setDescription: setDescription
                                })}
                                textValue={description}
                                placeholder={'Give this drill a description'}
                                errorMessage={shouldShowValidationErrorForField(Fields.Description)
                                    ? 'Give this drill a description'
                                    : null}/>
                        <FormOption title={'Category'}
                                onPress={() => navigation.navigate(CoachScreenNames.EditDrillCategory, {
                                    category: category,
                                    setCategory: setCategory
                                })}
                                textValue={getCategoryDisplayValue(category)}
                                placeholder={'Select a category'}
                                errorMessage={shouldShowValidationErrorForField(Fields.Category)
                                    ? 'Select a category'
                                    : null}/>
                        <FormOption title={'Equipment'}
                                onPress={() => navigation.navigate(CoachScreenNames.EditDrillEquipment, {
                                    equipment: equipment,
                                    setEquipment: setEquipment
                                })}
                                textValue={getEquipmentDisplayValue()}
                                placeholder={'Specify the required equipment'}
                                errorMessage={shouldShowValidationErrorForField(Fields.Equipment)
                                    ? 'Specify the required equipment'
                                    : null}/>

                        <View style={styles.section}>
                            <Text style={styles.sectionHeader}>Demos</Text>
                        </View>
                        <FormOption title={'Front view'}
                                onPress={() => navigation.navigate(CoachScreenNames.EditDrillDemo, {
                                    video: frontVideo,
                                    setVideo: async video => {
                                        setFrontVideo(video);
                                        const thumbnail = await generateThumbnail(video);
                                        setFrontVideoThumbnail(thumbnail);
                                    }
                                })}
                                imageValue={frontVideoThumbnail}
                                errorMessage={shouldShowValidationErrorForField(Fields.DemoFront)
                                    ? 'Provide a video'
                                    : null}/>
                        <FormOption title={'Side view'}
                                onPress={() => navigation.navigate(CoachScreenNames.EditDrillDemo, {
                                    video: sideVideo,
                                    setVideo: async video => {
                                        setSideVideo(video);
                                        const thumbnail = await generateThumbnail(video);
                                        setSideVideoThumbnail(thumbnail);
                                    }
                                })}
                                imageValue={sideVideoThumbnail}
                                errorMessage={shouldShowValidationErrorForField(Fields.DemoSide)
                                    ? 'Provide a video'
                                    : null}/>
                        <FormOption title={'Close up view'}
                                onPress={() => navigation.navigate(CoachScreenNames.EditDrillDemo, {
                                    video: closeVideo,
                                    setVideo: async video => {
                                        setCloseVideo(video);
                                        const thumbnail = await generateThumbnail(video);
                                        setCloseVideoThumbnail(thumbnail);
                                    }
                                })}
                                imageValue={closeVideoThumbnail}
                                errorMessage={shouldShowValidationErrorForField(Fields.DemoClose)
                                    ? 'Provide a video'
                                    : null}/>

                        <View style={styles.section}>
                            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                                {!!drill && (
                                    <Text style={styles.buttonText}>
                                        {isSubmitting ? 'Updating drill...' : 'Update drill'}
                                    </Text>
                                )}
                                {!drill && (
                                    <Text style={styles.buttonText}>
                                        {isSubmitting ? 'Creating drill...' : 'Create drill'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingScrollView>
                </View>
            </SafeAreaView>

            {isSubmitting && (
                <View style={styles.submittingContainer}>
                    <ActivityIndicator size="small" color="black"/>
                    <Text style={styles.submittingText}>
                        {isSubmitting && !!drill && 'Updating drill...'}
                        {isSubmitting && !drill && 'Creating drill...'}
                    </Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    safeAreaView: {
        flex: 1
    },
    content: {
        flex: 1,
        position: 'relative'
    },
    section: {
        paddingHorizontal: 15
    },
    sectionHeader: {
        marginTop: 20,
        marginBottom: 5,
        fontWeight: '600',
        fontSize: 13,
        color: Colors.TextSecondary,
    },
    button: {
        width: '100%',
        backgroundColor: Colors.Primary,
        borderRadius: 10,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 15
    },
    buttonSecondary: {
        width: '100%',
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    buttonTextSecondary: {
        color: Colors.Primary,
        fontWeight: '500',
        fontSize: 15
    },
    submittingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, .6)'
    },
    submittingText: {
        fontSize: 15,
        fontWeight: '500',
        marginTop: 10
    }
});

export default CreateOrEditDrillScreen;
