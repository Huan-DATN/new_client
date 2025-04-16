export const TokenType = {
	ForgotPasswordToken: 'forgotPasswordToken',
	EmailVerifyToken: 'emailVerifyToken',
	SessionToken: 'sessionToken',
} as const;

export type TokenTypeValue = (typeof TokenType)[keyof typeof TokenType];

export interface TokenPayload {
	userId: number;
	tokenType: TokenTypeValue;
	role: string;
	exp: number;
	iat: number;
}
