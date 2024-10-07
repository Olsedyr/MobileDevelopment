import AsyncStorage from '@react-native-async-storage/async-storage';
import instance from '@/axios/instance';
import { Credentials, UserInfo } from './types';

const authorizationHeader = 'Authorization';

export const authenticate = async ({ username, password }: Credentials) => {
  try {
    const response = await instance.post('/auth/login', { username, password });
    const { token, tokenType } = response.data;
    await AsyncStorage.setItem('token', token);
    instance.defaults.headers.common[
      authorizationHeader
    ] = `${tokenType} ${token}`;
    return { token, tokenType };
  } catch (error) {
    console.error('Failed to authenticate:', error);
    throw error;
  }
};

export const register = async ({ username, password }: Credentials) => {
  try {
    await instance.post('/auth/register', {
      username,
      password,
    });
  } catch (error) {
    console.error('Failed to register:', error);
    throw error;
  }
};

export const removeAuthHeader = async () => {
  delete instance.defaults.headers.common[authorizationHeader];
};

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await instance.get('/auth/me');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user info:', error);
    throw error;
  }
};
