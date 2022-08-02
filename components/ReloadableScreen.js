import {StyleSheet, View} from "react-native";
import Loader from "./Loader";
import Reload from "./Reload";


const ReloadableScreen = ({isLoading, hasError, onReload, render}) => {
    return (
        <>
            {isLoading && (
                <View style={styles.loadingContainer}>
                    <Loader />
                </View>
            )}
            {!isLoading && (
                <>
                    {hasError && (
                        <View style={styles.loadingContainer}>
                            <Reload onReload={onReload}/>
                        </View>
                    )}
                    {!hasError && render()}
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        height: 200
    },
})

export default ReloadableScreen;