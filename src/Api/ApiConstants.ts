import { isDevEnv } from "../helpers/ApiHelpers";

const BASE_URL = isDevEnv() ? '/' : '/';
const USER_URL = BASE_URL + 'user/';

/* uses the user service micro service */
export const GET_USERNAME = USER_URL + 'getUserDetails/{username}';
export const REGISTER_USER = USER_URL + 'createUser';
export const AUTHORIZE_USER = USER_URL + 'auth';

export const HTTP_METHODS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
};

export const HTTP_STATUS_CODES = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const loginElements = ["username", "password"];

export const signupElements = ["name", "username", "password", "email"];