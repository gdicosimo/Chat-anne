import endpoints from './endpoints';
import environment from './environment';

const apiPaths = {
  GET_AUTH: `${environment.hostBackend}${endpoints.AUTH}`,
  GET_LOGIN: `${environment.hostBackend}${endpoints.LOGIN}`,
  GET_REGISTER: `${environment.hostBackend}${endpoints.REGISTER}`,
};

export default apiPaths;
