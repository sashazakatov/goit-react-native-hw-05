import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from "@react-navigation/native";

useNavigation

const Logout = () => {
    const navigation = useNavigation() 
    return(
        <TouchableWithoutFeedback
            onPress={()=>navigation.navigate("LoginScreen")}
        >
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableWithoutFeedback>
    );
}
export default Logout;