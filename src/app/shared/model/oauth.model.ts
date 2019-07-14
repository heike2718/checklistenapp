export const STORAGE_KEY_CLIENT_EXPIRES_AT = 'client_token_expires_at';
export const STORAGE_KEY_CLIENT_REFRESH_TOKEN = 'client_refresh_token';
export const STORAGE_KEY_CLIENT_ACCESS_TOKEN = 'client_access_token';

export interface OAuthAccessTokenPayload {
	accessToken: string;
	refreshToken: string;
	expiresAt: number;
}
