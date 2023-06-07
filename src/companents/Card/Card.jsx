import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const Card = ({ item }) => {

    const navigation = useNavigation();
    const { photo, title, location, place, comments } = item;

    return (
        <View style={styles.post}>
            <View style={styles.imageWrap}>
                <Image
                    style={styles.image}
                    source={{ uri: photo }}
                />
            </View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.btnsWrap}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("MapScreen", location)}
                    style={styles.button}
                >
                    <EvilIcons
                        name={'location'}
                        size={20}
                        color={'black'}
                    />
                    <Text style={{ textDecorationLine: 'underline' }}>{place}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("CommentsScreen", { comments, photo })}
                    style={styles.button}
                >
                    <EvilIcons
                        name={'comment'}
                        size={20}
                        color={'black'}
                    />
                    <Text>{comments.length}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    post: {
        marginBottom: 20,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 700,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    imageWrap: {
        aspectRatio: 3 / 4,
        width: '100%',
        alignSelf: 'center',
        marginBottom: 10,
    },
    button: {
        flexDirection: 'row'
    },
    btnsWrap: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flexDirection: 'row',
        padding: 10
    },
});
export default Card;