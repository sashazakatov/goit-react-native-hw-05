import { useState } from "react";
import { View,
    TextInput, 
    TouchableOpacity, 
    Text,
    StyleSheet,
} from 'react-native';

const InputPassword = ({ password, dispatch}) => {
    const [isTextEntry, setIsTextEntry] = useState(true);
    return(
        <View style={style.container}>
                <TextInput
                    style={style.input}
                    keyboardType='default'
                    placeholder='Пароль'
                    secureTextEntry={isTextEntry}
                    value={password}
                    onChangeText={(payload) => 
                        dispatch({ type: 'registerInformation/password', payload })
                    }
                />
                <TouchableOpacity 
                    style={style.button}
                    onPress={() => setIsTextEntry((state) => !state)}
                >
                    <Text>
                        Показать
                    </Text>
                </TouchableOpacity>
        </View>
    );
}
export default InputPassword;

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        marginBottom: 43,
    },
    input:{
        height: 40,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    button: {
        position: 'absolute',
        top: 10,
        right: 16,
    },
    password:{
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        height: '100%',
    },
})