export const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isValidPassword = (password) => {
    return password && password.length > 0;
}

export const isValidEmail = (email) => {
    if (!email) {
        return false;
    }
    return email.match(EMAIL_REGEX);
};
