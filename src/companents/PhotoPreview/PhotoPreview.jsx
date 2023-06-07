import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign } from '@expo/vector-icons';

const PhotoPreview = ({ photo, onCancel }) => {
    return (
        <View>
            <Image
                style={styles.image}
                source={{
                    uri: photo,
                }} />
            <TouchableOpacity
                style={styles.cancelBtn}
                onPress={onCancel}
            >
                <AntDesign
                    name={'closecircleo'}
                    size={50}
                    color={'white'}
                />
            </TouchableOpacity >
        </View>
    )
}
const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    cancelBtn: {
        backgroundColor: '#0005',
        padding: 5,
        borderRadius: 50,
        position: "absolute",
        bottom: 20,
        right: 20,
    },
});
export default PhotoPreview;