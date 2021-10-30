import firebase from "firebase";
import 'firebase/auth';

let firebaseConfig = {
apiKey: "AIzaSyBGt2db8SAa3oKNvoWF4ZO3Lfyf4X-5ABw",
  authDomain: "ticketsystem-20519.firebaseapp.com",
  projectId: "ticketsystem-20519",
  storageBucket: "ticketsystem-20519.appspot.com",
  messagingSenderId: "1077461587295",
  appId: "1:1077461587295:web:14e05489658b79328792ea",
  measurementId: "G-MZG79NX2H1"
};

if(firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;