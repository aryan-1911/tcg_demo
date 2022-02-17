import { AppConfig } from 'config';
import firebase from 'firebase';
import Rebase from 're-base';

const firebaseApp = firebase.initializeApp({
  apiKey: `${AppConfig.FIREBASE_API_KEY}`,
  authDomain: `${AppConfig.FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${AppConfig.FIREBASE_DATABASE_URL}`,
  // projectId: 'tcg-showdown',
  // storageBucket: 'tcg-showdown.appspot.com',
  // messagingSenderId: '920618790939',
  // appId: '1:920618790939:web:028da6b4f8b32fff2f48be',
  // measurementId: 'G-NGHPLB3KJK',
});

const base = Rebase.createClass(firebaseApp.firebase_.database());

export { firebaseApp };

export default base;
