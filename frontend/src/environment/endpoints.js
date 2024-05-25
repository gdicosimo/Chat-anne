const endpoints = {
  ROOT: '/',
  AUTH: '/auth',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  CREATE_CHAT: '/chats/',
  SEND_MSG: '/chats/message',
  LIST_CHATS: '/chats/',
  RENAME: '/chats/rename-chat',
  ADD_DOC: '/chats/append-pdf', //formdata
  GET_MSGS: '/chats/messages', //formdata
  DELETE: '/chats/remove-chat'
};

export default endpoints;
