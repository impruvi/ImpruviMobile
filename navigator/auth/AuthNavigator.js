import {AuthScreenNames} from "../../screens/ScreenNames";
import {createStackNavigator} from "@react-navigation/stack";
import SignInScreen from "../../screens/auth/SignInScreen";
import InvitationCodeScreen from "../../screens/auth/InvitationCodeScreen";
import LandingScreen from "../../screens/auth/LandingScreen";
import ChooseCoachScreen from "../../screens/auth/ChooseCoachScreen";
import SignUpScreen from "../../screens/auth/SignUpScreen";
import VerifyEmailScreen from "../../screens/auth/VerifyEmailScreen";
import PreviewCoachScreen from "../../screens/auth/PreviewCoachScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name={AuthScreenNames.Landing} component={LandingScreen}/>
            <Stack.Screen name={AuthScreenNames.SignIn} component={SignInScreen} options={{gestureResponseDistance: 0}}/>
            <Stack.Screen name={AuthScreenNames.InvitationCode} component={InvitationCodeScreen} options={{gestureResponseDistance: 0}}/>
            <Stack.Screen name={AuthScreenNames.SignUp} component={SignUpScreen} options={{gestureResponseDistance: 0}}/>
            <Stack.Screen name={AuthScreenNames.VerifyEmail} component={VerifyEmailScreen} options={{gestureResponseDistance: 0}}/>
            <Stack.Screen name={AuthScreenNames.ChooseCoach} component={ChooseCoachScreen} options={{gestureResponseDistance: 0}}/>
            <Stack.Screen name={AuthScreenNames.PreviewCoach} component={PreviewCoachScreen} options={{gestureResponseDistance: 0}}/>
        </Stack.Navigator>
    );
};

export default AuthNavigator;
