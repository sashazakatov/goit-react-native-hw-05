import { useEffect, useState, useReducer } from 'react';
import { 
    Pressable, 
    Text, 
    TextInput, 
    View, 
    StyleSheet, 
    Keyboard, 
    TouchableWithoutFeedback,
    Alert,
    ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import background from '../assets/images/background.jpg'
import InputPassword from '../companents/InputPassword';

const initialState = {
    email: '',
    password: '',
}

function reducer(state, action) {
    switch (action.type){
        case 'registerInformation/email':
            return { ...state, email: action.payload }
        case 'registerInformation/password':
            return { ...state, password: action.payload }
        case 'registerInformation/reset':
            return initialState;
        default:
            Alert.alert('Data entry error, invalid input field');
            return state;
    }
}

const LoginScreen = () => {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [registerInformation, setRegisterInformation] = useReducer(reducer, initialState);
    const navigation = useNavigation();

    useEffect(() => {
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


    const hanadelSubmit = () => {
        const { email, password } = registerInformation;

        if( email === '' || password === ''){
            return Alert.alert('All fields must be filled');
        }

        console.log(`email: ${email}, password: ${password}`);
        
        navigation.navigate('Home');

        setRegisterInformation({ type: 'registerInformation/reset' });
    }

    return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground 
            source={background}
            resizeMode="cover" 
            style={style.container}
        >
            <View style={style.form}>
                <View style={style.photo}>
                    {/* <Button title='add'/> */}
                </View>
            <Text style={style.title}>Увійти</Text>
            <TextInput
                style={style.input}
                placeholder='Адреса електронної пошти'
                keyboardType='email-address'
                value={registerInformation.email}
                onChangeText={(payload) => 
                    setRegisterInformation({type: 'registerInformation/email', payload})
            }
            />
            <InputPassword 
                password={registerInformation.password} 
                dispatch={setRegisterInformation}
            />
            { !isKeyboardOpen && (
                <>
                    <Pressable style={style.button} onPress={hanadelSubmit}>
                        <Text style={{color: '#FFFFFF', fontSize: 16, }}>Увійти</Text>
                    </Pressable>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('RegistrationScreen')}>
                        <Text style={style.text}>Вже є акаунт? Увійти</Text>
                    </TouchableWithoutFeedback>
                </>
            )}
            </View>
        </ImageBackground>
    </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
    },
    form: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,

        alignItems: 'center',

        paddingTop: 92,
        paddingLeft: 16,
        paddingRight: 16,
    },
    photo: {
        position: 'absolute',
        backgroundColor: '#F6F6F6',
        width: 120,
        height: 120,
        borderRadius: 16,
        marginBottom:32,
        transform: [{ translateY: -50 }],
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Roboto',
        marginBottom: 33,
        fontSize: 30,
    },
    input: {
        height: 40,
        width: '100%',
        backgroundColor: 'whitesmoke',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
    },
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: '100%',
        fontFamily: 'Roboto',
        color: '#FFFFFF',
        backgroundColor: "#FF6C00",
        borderRadius: 100,
        marginBottom: 16,
    },
    text:{
        fontFamily: 'Roboto',
        fontWeight: 400,
        fontSize: 16,
        color: "#1B4371",
        marginBottom: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    inputButton: {
        position: 'absolute',
        top: 10,
        right: 16,
    },
    inputPassword:{
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
        height: '100%',
    },
});
export default LoginScreen;