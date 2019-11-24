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

