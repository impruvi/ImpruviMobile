import {StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {faMagnifyingGlass, faXmarkCircle} from "@fortawesome/pro-light-svg-icons";
import {useRef} from 'react';

const SearchBar = ({onSearchInputChange, searchInput}) => {

    const searchInputRef = useRef();

    const clearSearchInput = () => {
        searchInputRef.current?.focus();
        onSearchInputChange('');
    }

    return (
        <View style={styles.searchBar}>
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size={15}
                style={styles.searchIcon}/>
            <TextInput
                ref={searchInputRef}
                style={styles.searchInput}
                onChangeText={onSearchInputChange}
                value={searchInput}
                placeholder="Explore your drills"
                placeholderTextColor="#878787"
            />
            <TouchableOpacity style={styles.clearSearchContainer} onPress={clearSearchInput}>
                <FontAwesomeIcon icon={faXmarkCircle} size={18} style={styles.clearSearchIcon}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        backgroundColor: '#F7F7F7',
        borderRadius: 30,
        flex: 1
    },
    searchIcon: {
        marginHorizontal: 10,
        color: '#878787'
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 10
    },
    clearSearchContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    clearSearchIcon: {
        color: '#878787'
    },
});


export default SearchBar;