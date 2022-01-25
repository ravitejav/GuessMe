import { isDevEnv } from "../helpers/ApiHelpers";

const BASE_URL = isDevEnv() ? "/" : "/";
const USER_URL = BASE_URL + "user/";

/* uses the user services */
export const GET_USERNAME = USER_URL + "getUserDetails/";
export const REGISTER_USER = USER_URL + "createUser";
export const AUTHORIZE_USER = USER_URL + "auth";
export const GET_BY_USERID = USER_URL + "getUserById/";

const ROOM_URL = BASE_URL + "room/";

/* uses the room services */
export const GET_ELIGIBLE_ROOMS = ROOM_URL + "elgibleRooms/";
export const GET_CREATED_ROOM_BY_USER = ROOM_URL + "getRoomByUser/";
export const CREATE_ROOM = ROOM_URL + "saveRoom";


/* websocket constant URLs */
export const SUBMIT_IMAGE_UPDATES = (roomId: string) => `/app/room/${roomId}/imageUpdates`; 
export const SUBMIT_MESSAGE_UPDATES = (roomId: string) => `/app/room/${roomId}/messageUpdates`; 
export const SUBMIT_USER_UPDATES = (roomId: string) => `/app/room/${roomId}/scoreUpdates`; 


/* uses the room services */
export const TOPIC_IMAGE_UPDATES = (roomId: string) => `/topic/room/${roomId}/imageUpdates`;
export const TOPIC_MESSAGE_UPDATES = (roomId: string) => `/topic/room/${roomId}/messageUpdates`;
export const TOPIC_SCORE_UPDATES = (roomId: string) => `/topic/room/${roomId}/scoreUpdates`;

export const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
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

export const createRoomElements = ["roomname", "createdBy", "users"];

export const loginElements = ["username", "password"];

export const signupElements = ["name", "username", "password", "emailId"];
