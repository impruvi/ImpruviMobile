import {useNavigation} from "@react-navigation/native";
import {AuthScreenNames} from "../ScreenNames";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";
import {useCallback, useState} from "react";
import {isValidEmail, isValidPassword} from "../../util/authUtil";
import useHttpClient from "../../hooks/useHttpClient";
import Form from "../../components/auth/Form";
import Error from "../../components/auth/Error";
import useError from "../../hooks/useError";

const isValidFirstName = (firstName) => {
    return !!firstName && firstName.length > 0;
}

const isValidLastName = (lastName) => {
    return !!lastName && lastName.length > 0;
}

const SignUpScreen = () => {

    const {setError} = useError();
    const {httpClient} = useHttpClient();
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [isSubmissionErrorShowing, setIsSubmissionErrorShowing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigateToSignIn = useCallback(() => {
        navigation.navigate(AuthScreenNames.SignIn);
    }, [navigation]);

    const onFirstNameChange = (firstName) => {
        if (isValidFirstName(firstName)) {
            const errors = validationErrors.filter(err => err !== 'firstName');
            setFirstName(firstName);
            setValidationErrors(errors);
        } else {
            setFirstName(firstName);
        }
    }

    const onLastNameChange = (lastName) => {
        if (isValidLastName(lastName)) {
            const errors = validationErrors.filter(err => err !== 'lastName');
            setLastName(lastName);
            setValidationErrors(errors);
        } else {
            setLastName(lastName);
        }
    }

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
        if (!isValidFirstName(firstName)) {
            errors.push('firstName');
        }
        if (!isValidLastName(lastName)) {
            errors.push('lastName');
        }
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
                const result = await httpClient.initiateSignUp({
                    password,
                    email: email.trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim()
                });

                if (result.success) {
                    navigation.navigate(AuthScreenNames.VerifyEmail, {
                        playerId: result.playerId
                    });
                } else {
                    setIsSubmissionErrorShowing(true);
                }
            } catch (e) {
                console.log(e);
                setError('An error occurred. Please try again.');
            }
            setIsSubmitting(false);
        }
    }, [firstName, lastName, email, password, httpClient]);

    return (
        <Form footerText={'Already have an account?'} footerLink={'Sign in'} onFooterLinkPress={navigateToSignIn}>
            <Input error={hasError('firstName') ? 'Please provide the player\'s first name' : null}
                   value={firstName}
                   onChangeText={onFirstNameChange}
                   autoCapitalize='words'
                   placeholder="Enter your first name"/>
            <Input error={hasError('lastName') ? 'Please provide the player\'s last name' : null}
                   value={lastName}
                   onChangeText={onLastNameChange}
                   autoCapitalize='words'
                   placeholder="Enter your last name"/>
            <Input error={hasError('email') ? 'Please provide a valid email' : null}
                   value={email}
                   onChangeText={onEmailChange}
                   autoCapitalize='none'
                   keyboardType='email-address'
                   placeholder="Enter your email"/>
            <Input error={hasError('password') ? 'Please enter a password' : null}
                   value={password}
                   onChangeText={onPasswordChange}
                   autoCapitalize='none'
                   secureTextEntry
                   placeholder="Enter your password"/>

            <Button isSubmitting={isSubmitting}
                    submit={submit}
                    text={isSubmitting ? 'Signing up...' : 'Sign up'}/>

            {isSubmissionErrorShowing && !isSubmitting && (
                <Error errorText={'An account already exists with the given email.'}/>
            )}
        </Form>
    )
};


export default SignUpScreen;
