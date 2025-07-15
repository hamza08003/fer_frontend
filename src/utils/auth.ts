



const auth_token_name = 'fer_auth_token';

export const token = {
    get: () => {
        if (typeof window === 'undefined') return null;
        let token = localStorage.getItem(auth_token_name);
        if (!token)
        {
            token = sessionStorage.getItem(auth_token_name);
            if (!token) {
                return null;
            }
        }
        return token;
    },
    set: (token: string, rememberMe: boolean) => {
        if (typeof window === 'undefined') return;
        if (rememberMe) {
            localStorage.setItem(auth_token_name, token);
        } else {
            sessionStorage.setItem(auth_token_name, token);
        }
    },
    remove: () => {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(auth_token_name);
        sessionStorage.removeItem(auth_token_name);
    },
}

export const isLoggedIn = () => {
    return token.get() !== null ? token.get() : false;
}

export const getAuthHeader = () => {
    return {
        'Authorization': `Token ${token.get()}`,
        'Content-Type': 'application/json'
    }
}

export const getUserProfile = async  ()=> {

}