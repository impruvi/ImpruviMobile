import useAuth from "../../hooks/useAuth";
import {useCallback, useState} from "react";
import usePush from '../../hooks/usePush';
import useHttpClient from "../../hooks/useHttpClient";
import useError from "../../hooks/useError";
import * as Linking from "expo-linking";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";
import Form from "../../components/auth/Form";
import Error from "../../components/auth/Error";
import useGoogleAnalyticsClient from "../../hooks/useGoogleAnalyticsClient";


const isValidInvitationCode = (code) => {
    return !!code && code.length > 0;
}

const InvitationCodeScreen = () => {
    const [invitationCode, setInvitationCode] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [isSubmissionErrorShowing, setIsSubmissionErrorShowing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {setError} = useError();
    const {setCoachId} = useAuth();
    const {httpClient} = useHttpClient();
    const {gaClient} = useGoogleAnalyticsClient();
    const {expoPushToken} = usePush();

    const submit = useCallback(async () => {
        setIsSubmissionErrorShowing(false);

        const errors = [];
        if (!isValidInvitationCode(invitationCode)) {
            errors.push('code');
        }

        if (errors.length > 0) {
            setValidationErrors(errors);
        } else {
            setIsSubmitting(true);
            try {
                const result = await httpClient.validateInviteCode(invitationCode, expoPushToken);
                if (result.success) {
                    setCoachId(result.coach.coachId);
                    gaClient.sendGeneralEvent("enter_invitation_code");
                } else {
                    setIsSubmissionErrorShowing(true);
                }
            } catch (e) {
                console.log(e);
                setError('Unable to sign in. Please check your internet connection');
            }
            setIsSubmitting(false);
        }
    }, [invitationCode, expoPushToken, httpClient]);

    const onInvitationCodeChange = (code) => {
        if (isValidInvitationCode(code)) {
            const errors = validationErrors.filter(err => err !== 'code');
            setInvitationCode(code);
            setValidationErrors(errors);
        } else {
            setInvitationCode(code);
        }
    };

    const hasError = (error) => {
        return validationErrors.filter(err => err === error).length > 0;
    };

    const navigateToBecomeACoach = useCallback(() => {
        Linking.openURL('https://impruviapp.com/become-a-coach');
    }, []);

    return (
        <Form footerText={'Don\'t have an invitation code?'} footerLink={'Contact us'} onFooterLinkPress={navigateToBecomeACoach}>
            <Input error={hasError('code') ? 'You must specify a valid invitation code' : null}
                   value={invitationCode}
                   onChangeText={onInvitationCodeChange}
                   autoCapitalize='characters'
                   placeholder="Enter your invitation code"/>

            <Button isSubmitting={isSubmitting}
                    submit={submit}
                    text={isSubmitting ? 'Validating...' : 'Continue'}/>

            {isSubmissionErrorShowing && !isSubmitting && (
                <Error errorText={'Invalid code'}/>
            )}
        </Form>
    )
}

export default InvitationCodeScreen;
