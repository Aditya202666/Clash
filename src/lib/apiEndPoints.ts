import Env from "./env";

export const BASE_URL = `${Env.BACKEND_URL}/api/v1`

export const REGISTER_ENDPOINT = `${BASE_URL}/auth/register`

export const CHECK_CREDENTIALS_ENDPOINT = `${BASE_URL}/auth/check/credentials`
export const LOGIN_ENDPOINT = `${BASE_URL}/auth/login`

export const FORGOT_PASSWORD_ENDPOINT = `${BASE_URL}/auth/forgot-password`
export const RESET_PASSWORD_ENDPOINT = `${BASE_URL}/auth/reset-password`


export const LOGOUT_ENDPOINT = `${BASE_URL}/auth/logout`