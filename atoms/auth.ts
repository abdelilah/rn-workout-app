import { atom } from 'recoil';

export interface IUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
}

export type AuthState = IUser | null | undefined;

const authState = atom<AuthState>({
	key: 'Auth',
	default: undefined,
});

export default authState;
