import { initializeApp, FirebaseOptions, FirebaseApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

export class FirebaseService {
  private config: FirebaseOptions;
  private app: FirebaseApp;

  constructor(databaseURL: string, apiKey: string, enableAuth: boolean = true) {
    this.config = { databaseURL };
    if (enableAuth && apiKey) {
      this.config = { ...this.config, apiKey };
    }
    this.app = initializeApp(this.config, 'discord-mirror-component');
    if (enableAuth) {
      // This allows us to put read protection on the database without requiring individual users to authenticate.
      const auth = getAuth(this.app);
      signInAnonymously(auth).then(() => console.log(`🌲 Hi from CascadiaJS 2021! 🌲`));
    }
  }

  public getDatabase() {
    return getDatabase(this.app);
  }
}
