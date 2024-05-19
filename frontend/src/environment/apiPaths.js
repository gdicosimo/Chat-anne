import endpoints from './endpoints';
import environment from './environment';

const apiPaths = {
  GET_AUTH: `${environment.hostBackend}${endpoints.AUTH}`,
  GET_LOGIN: `${environment.hostBackend}${endpoints.LOGIN}`,
  GET_REGISTER: `${environment.hostBackend}${endpoints.REGISTER}`,
  GET_CREATE_CHAT: `${environment.hostBackend}${endpoints.CREATE_CHAT}`,
  GET_SEND_MSG: `${environment.hostBackend}${endpoints.SEND_MSG}`,
  GET_LIST_CHATS: `${environment.hostBackend}${endpoints.LIST_CHATS}`,
  GET_RENAME: `${environment.hostBackend}${endpoints.RENAME}`,
  GET_ADD_DOC: `${environment.hostBackend}${endpoints.ADD_DOC}`,
  GET_MSGS: `${environment.hostBackend}${endpoints.GET_MSGS}`,
};

const endpointMethods = {
  GET_CREATE_CHAT: 'POST',
  GET_SEND_MSG: 'POST',
  GET_LIST_CHATS: 'GET',
  GET_RENAME: 'POST',
  GET_ADD_DOC: 'PUT',
  GET_MSGS: 'GET'
};

export {apiPaths, endpointMethods};