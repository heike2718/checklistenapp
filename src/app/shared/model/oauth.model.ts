export const SUFFIX_KEY_CLIENT_ACCESS_TOKEN = 'client_access_token';
export const STORAGE_KEY_CLIENT_EXPIRES_AT = 'chl_client_token_expires_at';
export const STORAGE_KEY_CLIENT_ACCESS_TOKEN = 'chl_client_access_token';
export const STORAGE_KEY_HEARTBEAT = 'chl_heartbeat';


export interface OAuthAccessTokenPayload {
	accessToken: string;
	expiresAt: number;
}

export interface RefreshAccessTokenPayload {
	clientAccessToken: string[];
	userRefreshToken: string;
	force: boolean;
}

export interface JWTPayload {
	jwt: string;
	expiresAtSeconds: number;
}
