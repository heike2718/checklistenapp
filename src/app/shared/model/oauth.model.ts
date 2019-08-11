export const STORAGE_KEY_CLIENT_EXPIRES_AT = 'client_token_expires_at';
export const STORAGE_KEY_CLIENT_ACCESS_TOKEN = 'client_access_token';

export interface OAuthAccessTokenPayload {
	accessToken: string;
	expiresAt: number;
}

export interface RefreshAccessTokenPayload {
	clientAccessToken: string;
	userRefreshToken: string;
}

export interface JWTPayload {
	jwt: string;
	expiresAtSeconds: number;
}

