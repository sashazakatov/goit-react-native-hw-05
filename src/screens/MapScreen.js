import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from "react-native-maps";

const Map = ({ route }) => {

    const { latitude, longitude } = route.params;

    return (
        <View style={styles.container}>
            <MapView
                style={styles.mapStyle}
                region={{
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    latitude,
                    longitude,
                }}
                mapType="standard"
                minZoomLevel={15}
            >
                <Marker
                    coordinate={{ latitude, longitude }}
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
});
export default Map;