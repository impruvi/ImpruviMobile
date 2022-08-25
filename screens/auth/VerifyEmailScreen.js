import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";
import Error from "../../components/auth/Error";
import Form from "../../components/auth/Form";
import {useCallback, useState} from "react";
import useError from "../../hooks/useError";
import useHttpClient from "../../hooks/useHttpClient";
import {useNavigation} from "@react-navigation/native";
import {AuthScreenNames} from "../ScreenNames";
import usePush from "../../hooks/usePush";

const isValidVerificationCode = (code) => {
    return !!code && code.length > 0;
}

const VerifyEmailScreen = ({route}) => {

    const {playerId} = route.params;

    const [verificationCode, setVerificationCode] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [isSubmissionErrorShowing, setIsSubmissionErrorShowing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigation = useNavigation();
    const {setError} = useError();
    const {httpClient} = useHttpClient();
    const {expoPushToken} = usePush();

    const submit = useCallback(async () => {
        setIsSubmissionErrorShowing(false);

        const errors = [];
        if (!isValidVerificationCode(verificationCode)) {
            errors.push('code');
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
        } else {
            setIsSubmitting(true);
            try {
                const result = await httpClient.completeSignUp({playerId, verificationCode, expoPushToken});
                if (result.success) {
                    navigation.navigate(AuthScreenNames.ChooseCoach, {
                        token: result.token,
                        playerId: playerId
                    });
                } else {
                    setIsSubmissionErrorShowing(true);
                }
            } catch (e) {
                console.log(e);
                setError('Unable to sign in. Please check your internet connection');
            }
            setIsSubmitting(false);
        }
    }, [verificationCode, playerId, httpClient]);

    const onVerificationCodeChange = (code) => {
        if (isValidVerificationCode(code)) {
            const errors = validationErrors.filter(err => err !== 'code');
            setVerificationCode(code);
            setValidationErrors(errors);
        } else {
            setVerificationCode(code);
        }
    };

    const hasError = (error) => {
        return validationErrors.filter(err => err === error).length > 0;
    };

    return (
        <Form>
            <Input error={hasError('code') ? 'Please enter your verification code' : null}
                   value={verificationCode}
                   onChangeText={onVerificationCodeChange}
                   keyboardType={'numeric'}
                   placeholder="Enter code"/>

            <Button isSubmitting={isSubmitting}
                    submit={submit}
                    text={isSubmitting ? 'Verifying...' : 'Verify'}/>

            {isSubmissionErrorShowing && !isSubmitting && (
                <Error errorText={'The code you entered is invalid.'}/>
            )}
        </Form>
    )
}

export default VerifyEmailScreen;
