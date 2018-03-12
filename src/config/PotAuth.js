import { AsyncStorage } from 'react-native';
let base_64 = require('base-64');

export const APP_USER_ID = "applicationUserId"; // applicationUserId decoded from id_token
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const EXPIRES_IN = "expires_in";
export const CREDENTIALS   = "credentials"

/**
 * Decodes id_token into applicationUserId to store into AsyncStorage.
 * @param token (JWT)
 * @returns {Promise.<void>}
 */
export const storeApplicationUserId = async (token) => {
    try {
        await AsyncStorage.setItem(APP_USER_ID, this._decodeJWT(token).sub);
    } catch (error) {
        alert(error); // error saving app user id
    }
};

/**
 * Stores access_token into AsyncStorage.
 * @param token (JWT)
 * @returns {Promise.<void>}
 */
export const storeAccessToken = async (token) => {
    try {
        await AsyncStorage.setItem(ACCESS_TOKEN, token);
    } catch (error) {
        alert(error); // error saving token
    }
};

/**
 * Stores refresh_token into AsyncStorage.
 * @param token (JWT)
 * @returns {Promise.<void>}
 */
export const storeRefreshToken = async (token) => {
    try {
        await AsyncStorage.setItem(REFRESH_TOKEN, token);
    } catch (error) {
        alert(error);
    }
};

/**
 * Stores expires_in time into AsyncStorage.
 * @param time (presumably in seconds)
 * @returns {Promise.<void>}
 */
export const storeExpiresIn = async (time) => {
    try {
        await AsyncStorage.setItem(EXPIRES_IN, time);
    } catch (error) {
        alert(error);
    }
};

/**
 * 
 */
export const storeCredentials = async (email, password) => {
    try {
        await AsyncStorage.setItem(CREDENTIALS, JSON.stringify({ email, password }))
    } catch(error) {
        alert(error)
    }
}

/**
 * Gets APP_USER_ID (applicationUserId decoded from id_token).
 * @returns ACCESS_TOKEN
 */
export const getApplicationUserId = async () => {
    try {
        const token = await AsyncStorage.getItem(APP_USER_ID);
        if (token !== null) {
            return token;
        }
    } catch (error) {
        alert(error);
    }
};

/**
 * Gets ACCESS_TOKEN.
 * @returns ACCESS_TOKEN
 */
export const getAccessToken = async () => {
    try {
        const token = await AsyncStorage.getItem(ACCESS_TOKEN);
        if (token !== null) {
            return token;
        }
    } catch (error) {
        alert(error);
    }
};

/**
 * Gets REFRESH_TOKEN.
 * @returns {Promise.<*>}
 */
export const getRefreshToken = async () => {
    try {
        const token = await AsyncStorage.getItem(REFRESH_TOKEN);

        if (token !== null) {
            return token;
        }
    } catch (error) {
        alert(error);
    }

    return null
};

/**
 * Gets EXPIRES_IN.
 * @returns {Promise.<*>}
 */
export const getExpiresIn = async () => {
    try {
        const token = await AsyncStorage.getItem(EXPIRES_IN);
        if (token !== null) {
            return token;
        }
    } catch (error) {
        alert(error);
    }
};

/**
 * 
 */
export const getCredentials = async () => {
    let credentials = null

    try {
        credentials = await AsyncStorage.getItem(CREDENTIALS)

        if (credentials !== null)
            return credentials
    } catch(error) {
        alert(error)
    } 
    
    return null
}

/**
 * Removes APP_USER_ID from AsyncStorage.
 */
export const removeApplicationUserId = () => {
    try {
        AsyncStorage.removeItem(APP_USER_ID)
    } catch (error) {
        alert(error);
    }
};

/**
 * Removes ACCESS_TOKEN from AsyncStorage.
 */
export const removeAccessToken = () => {
    try {
        AsyncStorage.removeItem(ACCESS_TOKEN)
    } catch (error) {
        alert(error);
    }
};

/**
 * Removes REFRESH_TOKEN from AsyncStorage.
 */
export const removeRefreshToken = () => {
    try {
        AsyncStorage.removeItem(REFRESH_TOKEN)
    } catch (error) {
        alert(error);
    }
};

/**
 * Removes EXPIRES_IN from AsyncStorage.
 */
export const removeExpiresIn = () => {
    try {
        AsyncStorage.removeItem(EXPIRES_IN)
    } catch (error) {
        alert(error);
    }
};

/**
 * Removes Credentials from AsyncStorage.
 */
export const removeCredentials = () => {
    try {
        AsyncStorage.removeItem(CREDENTIALS)
    } catch (error) {
        alert(error);
    }
};

/**
 * Parses and decodes a JSON Web Token.
 * @param token (JWT)
 * @returns applicationUserId
 * 
 */
_decodeJWT = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(base_64.decode(base64));
};
