import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from 'react-native';

import Card from "../companents/Card";



const DefaultScreen = ({ route }) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (route.params) {
            setPosts((prevState) => [...prevState, route.params]);
        }
    }, [route.params]);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={({ item }) => <Card item={item} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
});

export default DefaultScreen;