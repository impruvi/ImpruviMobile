import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Cell from './Cell';
import {Colors} from '../../constants/colors';
import SpaceBetweenComponent from "../SpaceBetweenComponent";

const Calendar = ({navigateToSession, startSession}) => {

    return (
        <View style={styles.container}>
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Cell text={'SUN'} isHeader={true} isCurrent={true}/>
                    <Cell text={'MON'} isHeader={true}/>
                    <Cell text={'TUE'} isHeader={true}/>
                    <Cell text={'WED'} isHeader={true}/>
                    <Cell text={'THU'} isHeader={true}/>
                    <Cell text={'FRI'} isHeader={true}/>
                    <Cell text={'SAT'} isHeader={true}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Cell text={'1'} isCompleted={true} onPress={navigateToSession}/>
                    <Cell text={'2'} />
                    <Cell text={'3'} />
                    <Cell text={'4'} />
                    <Cell text={'5'} isCompleted={true} onPress={navigateToSession}/>
                    <Cell text={'6'} />
                    <Cell text={'7'} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Cell text={'8'} isCompleted={true} onPress={navigateToSession}/>
                    <Cell text={'9'} />
                    <Cell text={'10'} />
                    <Cell text={'11'} />
                    <Cell text={'12'} isCompleted={true} onPress={navigateToSession}/>
                    <Cell text={'13'} />
                    <Cell text={'14'} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Cell text={'15'} isCurrent={true} onPress={navigateToSession}/>
                    <Cell text={'16'} />
                    <Cell text={'17'} />
                    <Cell text={'18'} />
                    <Cell text={'19'} hasSession={true} onPress={navigateToSession}/>
                    <Cell text={'20'} />
                    <Cell text={'21'} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Cell text={'22'} hasSession={true} onPress={navigateToSession}/>
                    <Cell text={'23'} />
                    <Cell text={'24'} />
                    <Cell text={'25'} />
                    <Cell text={'26'} hasSession={true} onPress={navigateToSession}/>
                    <Cell text={'27'} />
                    <Cell text={'28'} />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Cell text={'29'} />
                    <Cell text={'30'} />
                    <Cell text={'31'} />
                </View>
            </View>
            <View style={styles.legendContainer}>
                <View style={styles.legendKeyContainer}>
                    <View style={{...styles.legendKeyColorIndicator, backgroundColor: Colors.Primary}} />
                    <Text style={styles.legendKeyText}>Today</Text>
                </View>
                <View style={styles.legendKeyContainer}>
                    <View style={{...styles.legendKeyColorIndicator, backgroundColor: 'rgba(24, 180, 102, .2)'}} />
                    <Text style={styles.legendKeyText}>Completed</Text>
                </View>
                <View style={styles.legendKeyContainer}>
                    <View style={{...styles.legendKeyColorIndicator, backgroundColor: 'rgba(30, 102, 240, .2)'}} />
                    <Text style={styles.legendKeyText}>Upcoming</Text>
                </View>
            </View>
            <SpaceBetweenComponent style={styles.startTrainingContainer}>
                <Text style={styles.startTrainingText}>You have a session today!</Text>
                <TouchableOpacity style={styles.startTrainingButton}
                                  onPress={startSession}>
                    <Text style={styles.startTrainingButtonText}>Start</Text>
                </TouchableOpacity>
            </SpaceBetweenComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20
    },
    legendContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flex: 1,
        paddingHorizontal: 10
    },
    legendKeyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 3,
        marginVertical: 5
    },
    legendKeyColorIndicator: {
        borderRadius: 10,
        width: 10,
        height: 10
    },
    legendKeyText: {
        marginHorizontal: 3,
        fontSize: 12
    },
    startTrainingContainer: {
        marginHorizontal: 5,
        marginVertical: 10,
        padding: 20,
        backgroundColor: Colors.Border,
        borderRadius: 20,
        alignItems: 'center'
    },
    startTrainingText: {
        marginRight: 10,
        fontWeight: '600'
    },
    startTrainingButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: Colors.Primary,
        borderRadius: 20
    },
    startTrainingButtonText: {
        color:'white',
        fontWeight: '600'
    }
});

export default Calendar;