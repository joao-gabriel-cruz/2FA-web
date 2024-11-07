import { atomWithStorage } from "jotai/utils";

export type AuthState = {
  data: {
    token: string;
    authenticated: boolean;
  };
  status: 'idle' | 'loading' | 'success' | 'error';
}


export const authAtom = atomWithStorage<AuthState>("auth",{
  data: {
    token: '',
    authenticated: false
  },
  status: 'idle'
})