import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCpOWFfBThfyVsVXVunWzqWvdC10k6BqrE',
  authDomain: 'cooking-ninja-2fdd6.firebaseapp.com',
  projectId: 'cooking-ninja-2fdd6',
  storageBucket: 'cooking-ninja-2fdd6.appspot.com',
  messagingSenderId: '532744089762',
  appId: '1:532744089762:web:4693e68fb738d0a6aea7fb',
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFireStore = firebase.firestore();

export { projectFireStore };
