import useAuth from "../../hooks/useAuth";
import {useCallback, useState} from "react";
import usePush from '../../hooks/usePush';
import useHttpClient from "../../hooks/useHttpClient";
import useError from "../../hooks/useError";
import Input from "../../components/auth/Input";
import Error from "../../components/auth/Error";
import Button from "../../components/auth/Button";
import Form from "../../components/auth/Form";
import {isValidEmail, isValidPassword} from "../../util/authUtil";
import {useNavigation} from "@react-navigation/native";
import {AuthScreenNames} from "../ScreenNames";
import useGoogleAnalyticsClient from "../../hooks/useGoogleAnalyticsClient";

const SignInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [isSubmissionErrorShowing, setIsSubmissionErrorShowing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {setError} = useError();
    const {setPlayerId} = useAuth();
    const {httpClient} = useHttpClient();
    const {gaClient} = useGoogleAnalyticsClient();
    const {expoPushToken} = usePush();

    const onEmailChange = (email) => {
        if (isValidEmail(email)) {
            const errors = validationErrors.filter(err => err !== 'email');
            setEmail(email);
            setValidationErrors(errors);
        } else {
            setEmail(email);
        }
    };

    const onPasswordChange = (password) => {
        if (isValidPassword(password)) {
            const errors = validationErrors.filter(err => err !== 'password');
            setPassword(password);
            setValidationErrors(errors);
        } else {
            setPassword(password);
        }
    };

    const hasError = (error) => {
        return validationErrors.filter(err => err === error).length > 0;
    };

    const submit = useCallback(async () => {
        setIsSubmissionErrorShowing(false);

        const errors = [];
        if (!isValidEmail(email)) {
            errors.push('email');
        }
        if (!isValidPassword(password)) {
            errors.push('password');
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
        } else {
            setIsSubmitting(true);
            try {
                const result = await httpClient.signIn({
                    email: email.trim(),
                    password,
                    expoPushToken
                });
                if (result.success) {
                    gaClient.sendGeneralEvent("login");
                    if (!!result.player.coachId) {
                        setPlayerId(result.player.playerId);
                    } else {
                        navigation.navigate(AuthScreenNames.ChooseCoach, {
                            playerId: result.player.playerId,
                            token: result.token
                        });
                    }
                } else {
                    setIsSubmissionErrorShowing(true);
                }
            } catch (e) {
                setError('Unable to sign in. Please check your internet connection');
            }
            setIsSubmitting(false);
        }
    }, [email, password, expoPushToken, httpClient]);

    return (
        <Form>
            <Input error={hasError('email') ? 'You must specify a valid email' : null}
                   value={email}
                   onChangeText={onEmailChange}
                   autoCapitalize='none'
                   type={'email-address'}
                   placeholder="Enter your email"/>
            <Input error={hasError('password') ? 'Please enter a password' : null}
                   value={password}
                   onChangeText={onPasswordChange}
                   autoCapitalize='none'
                   secureTextEntry
                   placeholder="Enter your password"/>

            <Button isSubmitting={isSubmitting}
                    submit={submit}
                    text={isSubmitting ? 'Signing in...' : 'Sign in'}/>

            {isSubmissionErrorShowing && !isSubmitting && (
                <Error errorText={'Invalid email/password combination'}/>
            )}
        </Form>
    )
}

export default SignInScreen;
