import app from 'firebase/app';
import 'firebase/auth'
import { getFirebaseConfig } from './environment';


class Firebase {

    private auth: app.auth.Auth;

    private googleProvider: app.auth.GoogleAuthProvider;

    constructor() {
        if (!app.apps.length) {
            app.initializeApp(getFirebaseConfig());
        }
        this.auth = app.auth(app.app());
        this.googleProvider = new app.auth.GoogleAuthProvider();
    }

    doCreateUserWithEmailAndPassword(email: string, password: string): Promise<app.auth.UserCredential> {
        return this.auth.createUserWithEmailAndPassword(email, password);
    }

    doSignInWithEmailAndPassword(email: string, password: string): Promise<app.auth.UserCredential> {
        return this.auth.signInWithEmailAndPassword(email, password);
    }

    doSignInWithGoogleAccount(): Promise<app.auth.UserCredential> {
        return this.auth.signInWithPopup(this.googleProvider);
    }

    doLogout(): Promise<void> {
        return this.auth.signOut();
    }

    getCurrentUser(): app.User | null {
        return this.auth.currentUser;
    }

    isLogged() {
        return !!this.getCurrentUser();
    }

}

export default Firebase;