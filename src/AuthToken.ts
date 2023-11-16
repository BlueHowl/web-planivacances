export const getCustomToken = async () => {
    return localStorage.getItem("ResfreshToken");
};

//stocke un customToken valide

export const setCustomToken = (customToken: string) => {
    localStorage.setItem('ResfreshToken', customToken);
}

/*export function getToken() { ou acces direct?
    return storedToken;
}*/