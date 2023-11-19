export const getCustomToken = async () => {
    return localStorage.getItem("ResfreshToken");
};

export const setCustomToken = (customToken: string) => {
    localStorage.setItem("ResfreshToken", customToken);
}

export const clearCustomToken = () => {
    localStorage.removeItem("ResfreshToken");
}