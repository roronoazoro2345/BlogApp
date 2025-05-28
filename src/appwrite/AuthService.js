// src/appwrite/AuthService.js
import conf from '../conf/conf';
import { Client, Account, ID } from 'appwrite';

class AuthService {
  client = new Client();
  account;

  constructor() {
    if (!conf.appwriteUrl || !conf.appwriteProjectId) {
      throw new Error('Appwrite endpoint URL or Project ID is not defined in conf.js');
    }

    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  // ✅ Create a new user account and login immediately
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        const session = await this.login({ email, password });
        return { user: userAccount, session };
      }
    } catch (error) {
      console.error('AuthService :: createAccount error:', error.message);
      throw error;
    }
  }

  // ✅ Create an email/password session (login)
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error('AuthService :: login error:', error.message);
      throw error;
    }
  }

  // ✅ Safely get current logged-in user
  async getCurrentUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      // Catch 401 when no session exists
      if (error.code === 401) {
        console.warn('No active session, user is not logged in.');
        return null;
      }

      console.error('AuthService :: getCurrentUser error:', error.message);
      return null;
    }
  }

  // ✅ Check if user is logged in
  async isLoggedIn() {
    const user = await this.getCurrentUser();
    return !!user;
  }

  // ✅ Logout (delete all sessions)
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error('AuthService :: logout error:', error.message);
    }
  }
}

const authService = new AuthService();
export default authService;
