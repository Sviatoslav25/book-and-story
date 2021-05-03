import { EventEmitter } from 'events';

class AuthManager {
  tokenKey = 'User_Auth';

  emitter = new EventEmitter();

  eventTypes = {
    LOGIN_STATUS_CHANGE: 'LOGIN_STATUS_CHANGE',
  };

  isLoggedIn() {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(token) {
    localStorage.setItem(this.tokenKey, token);
    this.emitter.emit(this.eventTypes.LOGIN_STATUS_CHANGE, true);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.emitter.emit(this.eventTypes.LOGIN_STATUS_CHANGE, false);
  }

  onLoginStatusChange(sb) {
    this.emitter.on(this.eventTypes.LOGIN_STATUS_CHANGE, sb);
  }

  offLoginStatusChange(sb) {
    this.emitter.off(this.eventTypes.LOGIN_STATUS_CHANGE, sb);
  }
}

export default new AuthManager();
