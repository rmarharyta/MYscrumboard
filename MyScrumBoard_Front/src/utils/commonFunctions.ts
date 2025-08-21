export const isValidPassword = (password: string) => {
    const lengthCondition = password.length >= 6;
    const digitCondition = /\d/.test(password);
    const uppercaseCondition = /[A-Z]/.test(password);
    return lengthCondition && digitCondition && uppercaseCondition;
};
export const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
