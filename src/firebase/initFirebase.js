import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBdMgpovDmQtRIG-1IIagPituFKCoXyfs8',
  authDomain: 'ux-cheatsheet.firebaseapp.com',
  databaseURL: 'https://ux-cheatsheet.firebaseio.com',
  projectId: 'ux-cheatsheet',
  storageBucket: 'ux-cheatsheet.appspot.com',
  messagingSenderId: '521268752058',
  appId: '1:521268752058:web:50b04804a0e15f9d42dc83',
};

firebase.initializeApp(firebaseConfig);

// export const auth = firebase.auth();
export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();

// export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
