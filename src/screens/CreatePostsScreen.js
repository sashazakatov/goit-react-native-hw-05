import React, { useState, useEffect } from "react";
import { TextInput, Button, View, StyleSheet, Keyboard, KeyboardAvoidingView } from "react-native";
import uuid from 'react-native-uuid';
import * as Location from "expo-location";

import Camera from "../companents/Camera";
import PhotoPreview from "../companents/PhotoPreview";

export default function CreatePostsScreen({ navigation }) {

    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState('');
    const [place, setPlace] = useState('');

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                console.log("Permission to access location was denied");
            }
        })();

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardOpen(true);
        });
        
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardOpen(false);
        });
        
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const formReset = () => {
        setPhoto(null);
        setTitle('');
        setPlace('');
    }

    const handleAddNewPost = async () => {
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
            maximumAge: 10000
        });
        const newPost = {
            id: uuid.v1(),
            photo,
            title,
            place,
            location: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
            comments: []
        }
        navigation.navigate("DefaultScreen", newPost);
        formReset();
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.photoContainer}>
                {photo
                    ? <PhotoPreview photo={photo} onCancel={() => setPhoto(null)} />
                    : <Camera onCapture={setPhoto} />
                }
            </View>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={styles.input}
                placeholder="Name"
            />
            <TextInput
                value={place}
                onChangeText={setPlace}
                style={styles.input}
                placeholder="Location"
            />
            { !isKeyboardOpen && (
                <Button
                    title='Post'
                    onPress={handleAddNewPost}
                    color="#FF6C00"
                    style={{ width: "343px", borderRadius: 5, }}
                />
            )}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    photoContainer: {
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        aspectRatio: 1,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
});