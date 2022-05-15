import jwt_decode from "jwt-decode";

// Function to get token string
export const getToken = () => {

    // Get token string from localStorage
    const tokenString = localStorage.getItem('token');

    return tokenString;
}

// Function to get decoded token
export const getTokenDecoded = () => {

    // Get token string from localStorage
    const tokenString = getToken();

    // Decode token string
    const tokenDecoded = tokenString? jwt_decode(tokenString) : null;

    return tokenDecoded;
}


// Function to save token string
export const saveToken = tokenString => {
    // Save tokenString to localStorage
    localStorage.setItem('token', tokenString);
};

// Function to save token string
export const removeToken = () => {
    // Remove tokenString from localStorage
    localStorage.removeItem('token');
};