export const STORAGE_KEY_ID_REFERENCE = 'chl_id_reference';
export const STORAGE_KEY_SESSION_EXPIRES_AT = 'chl_session_expires_at';
export const STORAGE_KEY_DEV_SESSION_ID = 'chl_dev_session_id';

export interface UserSession {
	sessionId?: string;
	idReference: string;
	expiresAt: number; // expiration in milliseconds after 01.01.1970
}

