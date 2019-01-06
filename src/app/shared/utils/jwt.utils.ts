export const AUTH_STATE_SIGNIN = 'signin';
export const AUTH_STATE_LOGIN = 'login';

export const AUTH_STATE_EMPTY = 'empty';


export interface AuthResult {
    accessToken?: string;
    expiresIn?: string;
    tokenType?: string;
    state: string;
    idToken?: string;
}



export function parseHash(hashStr: string): AuthResult {

    hashStr = hashStr.replace(/^#?\/?/, '');

    const result: AuthResult = { state: AUTH_STATE_EMPTY };

    if (hashStr.length > 0) {

        const tokens = hashStr.split('&');
        tokens.forEach(
            (token) => {
                const keyVal = token.split('=');
                switch (keyVal[0]) {
                    case 'accessToken': result.accessToken = keyVal[1]; break;
                    case 'expiresIn': result.expiresIn = keyVal[1]; break;
                    case 'tokenType': result.tokenType = keyVal[1]; break;
                    case 'state': result.state = keyVal[1]; break;
                    case 'idToken': result.idToken = keyVal[1]; break;
                }
            }
        );
    }
    return result;
}

