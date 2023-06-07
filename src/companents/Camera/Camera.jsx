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
    container: { flex: 1 },
    camera: { flex: 1 },
    photoView: {
      flex: 1,
      backgroundColor: "transparent",
      justifyContent: "flex-end",
    },
  
    flipContainer: {
      flex: 0.1,
      alignItems: "flex-end",
      justifyContent: "space-around",
    },
  
    button: { alignSelf: "center" },
  
    takePhotoOut: {
      borderWidth: 2,
      borderColor: "white",
      height: 50,
      width: 50,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 50,
    },
  
    takePhotoInner: {
      borderWidth: 2,
      borderColor: "white",
      height: 40,
      width: 40,
      backgroundColor: "white",
      borderRadius: 50,
    },
});
export default CameraPreview;