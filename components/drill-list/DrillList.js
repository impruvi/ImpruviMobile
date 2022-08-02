import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import {useCallback, useEffect, useState} from "react";
import EmptyPlaceholder from "../EmptyPlaceholder";
import DrillListItem from "./DrillListItem";
import SearchBar from "./search-bar/SearchBar";
import Categories from "./categories/Categories";
import {AllCategory} from "./allCategory";
import ReloadableScreen from "../ReloadableScreen";


function compareDrills( drill1, drill2 ) {
    if ( drill1.name < drill2.name ){
        return -1;
    }
    if ( drill1.name > drill2.name ){
        return 1;
    }
    return 0;
}

const getMatchingDrills = (drills, category, searchInput) => {
    return drills.filter(drill => {
        return (category === AllCategory || drill.category === category)
            && (drill.name.toLowerCase().search(searchInput.toLowerCase()) >= 0 || drill.description.toLowerCase().search(searchInput.toLowerCase()) >= 0)
    });
}

const DrillList = ({drills, onPressDrill, isLoading, hasError, reload, optionRight}) => {

    const [visibleDrills, setVisibleDrills] = useState(drills || []);

    const [searchInput, setSearchInput] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(AllCategory);

    const selectCategory = useCallback((category) => {
        setVisibleDrills(drills.filter(drill => category === AllCategory || drill.category === category).sort(compareDrills));
        setSelectedCategory(category);
    }, [drills]);

    const onSearchInputChange = useCallback((text) => {
        setSearchInput(text);
        if (!text || text.length === 0) {
            setVisibleDrills(drills.filter(drill => selectedCategory === AllCategory || drill.category === selectedCategory).sort(compareDrills));
        } else {
            const matchingDrills = getMatchingDrills(drills, selectedCategory, searchInput);
            setVisibleDrills(matchingDrills.sort(compareDrills));
        }
    }, [drills]);

    useEffect(() => {
        const matchingDrills = getMatchingDrills(drills, selectedCategory, searchInput);
        setVisibleDrills(matchingDrills.sort(compareDrills));
    }, [drills]);

    const extractKey = useCallback(item => item.drillId, []);
    const renderItem = useCallback(({item}) => {
        return (
            <DrillListItem drill={item}
                           onPress={() => onPressDrill(item)}/>
        );
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <SearchBar searchInput={searchInput} onSearchInputChange={onSearchInputChange}/>
                {optionRight}
            </View>
            <View>
                <Categories selectedCategory={selectedCategory}
                            selectCategory={selectCategory}/>
            </View>
            <ReloadableScreen isLoading={isLoading}
                              hasError={hasError}
                              onReload={reload}
                              render={() => (
                                  <>
                                      {visibleDrills.length > 0 && (
                                          <FlatList
                                              numColumns={3}
                                              data={visibleDrills}
                                              showsVerticalScrollIndicator={false}
                                              keyExtractor={extractKey}
                                              renderItem={renderItem}/>
                                      )}
                                      {visibleDrills.length === 0 && (
                                          <ScrollView style={styles.scrollViewContainer}>
                                              <EmptyPlaceholder text={'No drills'}/>
                                          </ScrollView>
                                      )}
                                  </>
                              )} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    scrollViewContainer: {
        flex: 1
    }
});

export default DrillList;