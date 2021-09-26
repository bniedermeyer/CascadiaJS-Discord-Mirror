import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import {getAuth, signInAnonymously} from 'firebase/auth'
import { getDatabase } from 'firebase/database';


export class FirebaseService {
  private config: FirebaseOptions;
  private app: FirebaseApp;

  constructor(databaseURL: string, apiKey: string) {
    this.config = { databaseURL, apiKey};
    this.app = initializeApp(this.config);
    const auth = getAuth(this.app);
    signInAnonymously(auth).then(() => console.log('authenticated'))
  }

  public getDatabase() {
    return getDatabase(this.app);
  }
}
