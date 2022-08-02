import {FlatList, StyleSheet, Text, TouchableOpacity} from "react-native";
import {CategoryType, getCategoryDisplayValue} from "../../../constants/categoryType";
import {Colors} from "../../../constants/colors";
import {useCallback} from "react";
import {AllCategory} from "../allCategory";

const Categories = ({selectedCategory, selectCategory}) => {

    const extractKey = useCallback((item) => item, []);

    const renderItem = useCallback(({item}) => {
        return (
            <TouchableOpacity style={selectedCategory === item ? styles.activeCategoryFilter : styles.categoryFilter}
                              onPress={() => selectCategory(item)}>
                <Text style={selectedCategory === item ? styles.activeCategoryText : styles.categoryText}>
                    {item === AllCategory ? 'All' : getCategoryDisplayValue(item)}
                </Text>
            </TouchableOpacity>
        )
    }, [selectedCategory, selectCategory]);

    return (
        <FlatList data={[AllCategory, ...Object.entries(CategoryType).map(categoryType => categoryType[1])]}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.flatListStyle}
                  keyExtractor={extractKey}
                  renderItem={renderItem} />
    );
}

const styles = StyleSheet.create({
    activeCategoryFilter: {
        backgroundColor: Colors.Primary,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10
    },
    categoryFilter: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10
    },
    activeCategoryText: {
        color: 'white',
        fontWeight: '500'
    },
    categoryText: {
        fontWeight: '500'
    },
    flatListStyle: {
        marginBottom: 10
    }
});

export default Categories;
