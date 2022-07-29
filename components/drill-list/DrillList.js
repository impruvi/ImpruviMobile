import {FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Colors} from "../../constants/colors";
import {CategoryType, getCategoryDisplayValue} from "../../constants/categoryType";
import {useEffect, useRef, useState} from "react";
import Loader from "../Loader";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMagnifyingGlass, faXmarkCircle} from "@fortawesome/pro-light-svg-icons";
import Reload from "../Reload";
import EmptyPlaceholder from "../EmptyPlaceholder";
import DrillListItem from "./DrillListItem";


const AllCategory = 'ALL'

function compareDrills( drill1, drill2 ) {
    if ( drill1.name < drill2.name ){
        return -1;
    }
    if ( drill1.name > drill2.name ){
        return 1;
    }
    return 0;
}

const DrillList = ({drills, onPressDrill, isLoading, hasError, reload, optionRight}) => {

    const [visibleDrills, setVisibleDrills] = useState(drills || []);

    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(AllCategory);

    const searchInputRef = useRef();

    const getMatchingDrills = (drills, category, searchInput) => {
        return drills.filter(drill => {
            return (category === AllCategory || drill.category === category)
                && (drill.name.toLowerCase().search(searchInput.toLowerCase()) >= 0 || drill.description.toLowerCase().search(searchInput.toLowerCase()) >= 0)
        });
    }

    const selectCategory = (category) => {
        setVisibleDrills(drills.filter(drill => category === AllCategory || drill.category === category).sort(compareDrills));
        setSelectedCategory(category);
    }

    const onSearchInputChange = (text) => {
        setSearchInput(text);
        if (!text || text.length === 0) {
            setVisibleDrills(drills.filter(drill => selectedCategory === AllCategory || drill.category === selectedCategory).sort(compareDrills));
        } else {
            const matchingDrills = getMatchingDrills(drills, selectedCategory, searchInput);
            setVisibleDrills(matchingDrills.sort(compareDrills));
        }
    }

    const clearSearchInput = () => {
        setSearchInput('');
        searchInputRef.current?.focus();
        setVisibleDrills(drills.filter(drill => selectedCategory === AllCategory || drill.category === selectedCategory).sort(compareDrills));
    }

    useEffect(() => {
        const matchingDrills = getMatchingDrills(drills, selectedCategory, searchInput);
        setVisibleDrills(matchingDrills.sort(compareDrills));
    }, [drills]);


    return (
        <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10, backgroundColor: '#F7F7F7', borderRadius: 30, flex: 1}}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={15} style={{marginHorizontal: 10, color: '#878787'}}/>
                    <TextInput
                        ref={searchInputRef}
                        style={{flex: 1, fontSize: 14, paddingVertical: 10}}
                        onChangeText={onSearchInputChange}
                        value={searchInput}
                        placeholder="Explore your drills"
                        placeholderTextColor="#878787"
                    />
                    <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 10}} onPress={clearSearchInput}>
                        <FontAwesomeIcon icon={faXmarkCircle} size={18} style={{color: '#878787'}}/>
                    </TouchableOpacity>
                </View>
                {optionRight}
            </View>
            <View>
                <FlatList data={[AllCategory, ...Object.entries(CategoryType).map(categoryType => categoryType[1])]}
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={{marginBottom: 10}}
                          keyExtractor={(item) => item}
                          renderItem={({item}) => (
                              <TouchableOpacity style={selectedCategory === item ? {backgroundColor: Colors.Primary, ...styles.categoryFilter} : {backgroundColor: '#F5F5F5', ...styles.categoryFilter}}
                                                onPress={() => selectCategory(item)}>
                                  <Text style={selectedCategory === item ? {color: 'white', fontWeight: '500'} : {fontWeight: '500'}}>
                                      {item === AllCategory ? 'All' : getCategoryDisplayValue(item)}
                                  </Text>
                              </TouchableOpacity>
                          )} />
            </View>
            {isLoading && (
                <View style={{height: 200}}>
                    <Loader />
                </View>
            )}
            {!isLoading && (
                <>
                    {hasError && (
                        <View style={{height: 200}}>
                            <Reload onReload={reload}/>
                        </View>
                    )}
                    {!hasError && (
                        <>
                            {visibleDrills.length > 0 && (
                                <FlatList
                                    data={visibleDrills}
                                    keyExtractor={(item) => item.drillId}
                                    showsVerticalScrollIndicator={false}
                                    numColumns={3}
                                    renderItem={({item}) => (
                                        <DrillListItem drill={item}
                                                       onPress={() => onPressDrill(item)}/>
                                    )}/>
                            )}
                            {visibleDrills.length === 0 && (
                                <ScrollView style={{flex: 1}}>
                                    <EmptyPlaceholder text={'No drills'}/>
                                </ScrollView>
                            )}
                        </>
                    )}
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    categoryFilter: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10
    }
});

export default DrillList;