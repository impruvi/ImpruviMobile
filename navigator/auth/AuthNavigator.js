import {AuthScreenNames} from "../../screens/ScreenNames";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import SignInScreen from "../../screens/auth/SignInScreen";
import InvitationCodeScreen from "../../screens/auth/InvitationCodeScreen";
import LandingScreen from "../../screens/auth/LandingScreen";
import ChooseCoachScreen from "../../screens/auth/ChooseCoachScreen";
import SignUpScreen from "../../screens/auth/SignUpScreen";
import VerifyEmailScreen from "../../screens/auth/VerifyEmailScreen";
import PreviewCoachScreen from "../../screens/auth/PreviewCoachScreen";
import PreviewDrillScreen from "../../screens/auth/PreviewDrillScreen";

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
            <Stack.Screen
                name={AuthScreenNames.PreviewDrill}
                component={PreviewDrillScreen}
                options={{
                    gestureResponseDistance: 0,
                    gestureDirection: 'vertical',
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }}/>
        </Stack.Navigator>
    );
};

export default AuthNavigator;
