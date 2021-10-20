import { atom, useRecoilState } from 'recoil';

export interface User {
  id: string;
  username: string;
  email: string;
}

export const userState = atom({
  key: 'user',
  default: null as User | null | undefined,
});

export const useUserState = () => useRecoilState(userState);
