import { EventEmitter } from 'events';
import jwtDecode from 'jwt-decode';

class AuthManager {
  tokenKey = 'User_Auth';

  accessTokenKey = 'BOOK_AND_STORY_ACCESS_TOKEN';

  refreshTokenKey = 'BOOK_AND_STORY_REFRESH_TOKEN';

  emitter = new EventEmitter();

  getAccessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenKey);
  }

  setAccessToken(accessToken) {
    localStorage.setItem(this.accessTokenKey, accessToken);
  }

  setRefreshToken(refreshToken) {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  eventTypes = {
    LOGIN_STATUS_CHANGE: 'LOGIN_STATUS_CHANGE',
  };

  isLoggedIn() {
    return !!this.getAccessToken();
  }

  login({ accessToken, refreshToken }) {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
    this.emitter.emit(this.eventTypes.LOGIN_STATUS_CHANGE, true);
  }

  logout() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.emitter.emit(this.eventTypes.LOGIN_STATUS_CHANGE, false);
  }

  registration({ accessToken, refreshToken }) {
    this.login({ accessToken, refreshToken });
  }

  onLoginStatusChange(sb) {
    this.emitter.on(this.eventTypes.LOGIN_STATUS_CHANGE, sb);
  }

  offLoginStatusChange(sb) {
    this.emitter.off(this.eventTypes.LOGIN_STATUS_CHANGE, sb);
  }

  isAccessTokenExpired = () => {
    const token = this.getAccessToken();
    if (!token) {
      return null;
    }
    const decoded = jwtDecode(token);
    const expirationDate = decoded.exp;
    return new Date().getTime() >= expirationDate * 1000;
  };
}

export default new AuthManager();
