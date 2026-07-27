import type {User} from "../types/auth.types";

const TOKEN_KEY = "token";
const USER_KEY = "user";

class AuthStorageService {
  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  }

  saveUser(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);

    if (!user) return null;

    return JSON.parse(user);
  }

  removeUser() {
    localStorage.removeItem(USER_KEY);
  }

  clearSession() {
    this.removeToken();
    this.removeUser();
  }
}

export default new AuthStorageService();
