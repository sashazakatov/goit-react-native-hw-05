import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from '@expo/vector-icons';

const CameraPreview = ({ onCapture }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <Camera
            style={styles.camera}
            type={type}
            pictureSize="1280x960"
            ref={setCameraRef}
        >
            <View style={styles.photoView}>
                <TouchableOpacity
                    style={styles.flipBtn}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}
                >
                    <MaterialIcons name={'flip-camera-android'} size={50} color={'white'} />
                </TouchableOpacity >
                <TouchableOpacity
                    style={styles.captureBtn}
                    onPress={async () => {
                        if (cameraRef) {
                            const photo = await cameraRef.takePictureAsync();
                            onCapture(photo.uri);
                        }
                    }}
                >
                    <MaterialIcons name={'camera'} size={50} color={'white'} />
                </TouchableOpacity>
            </View >
        </Camera >
    )
}

const styles = StyleSheet.create({
    camera: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
    photoView: {
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "flex-end",
        padding: 20,
    },
    flipBtn: {
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: '#0005',
        padding: 5,
        borderRadius: 50,
    },
    captureBtn: {
        alignSelf: "center",
        backgroundColor: '#0005',
        padding: 5,
        borderRadius: 50,
    },
});

export default CameraPreview;