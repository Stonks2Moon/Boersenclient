import router from '@/router';
import store from '@/store';
import { backendUrl } from './constants';
import { IBroker } from './inerfaces';

const lsKey = 'moonstonks-boersenclient-auth';

export function getToken(): string | null {
  return localStorage.getItem(lsKey);
}

export function getUserFromJWT(): IBroker {
  const base64Url = (getToken() || 'A.B.C').split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export async function signOut() {
  localStorage.removeItem(lsKey);
  if (router.currentRoute.name !== 'login')
    await router.push({ name: 'login' });
  store.commit('signOut');
}

export async function verfiyUser(): Promise<boolean> {
  const token: string | null = getToken();

  if (!token) return false;

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  };

  const res = await fetch(`${backendUrl}broker/verify/stockmarket`, options)
    .then(res => res.json())
    .catch(() => {
      signOut();
      return false;
    });

  if (res.statusCode && res.statusCode === 401) {
    signOut();
    return false;
  }

  return true;
}

export function persistLogin(token: string): void {
  localStorage.setItem(lsKey, token);
}

export async function signIn(token: string): Promise<boolean> {
  persistLogin(token);
  return await verfiyUser();
}
