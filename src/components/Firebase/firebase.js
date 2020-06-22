import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

import { firebaseConfig } from '../../config/fb';

// Firebase API Config function
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FB_API_KEY,
//   authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
//   projectId: process.env.REACT_APP_FB_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_G_APP_ID,
//   measurementId: process.env.REACT_APP_G_MEASUREMENT_ID
// };



// Initialize Firebase
class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    
    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

}

export default Firebase;
