import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyAzPjmXJEkekx58VMLvtTMVsNr-sIq8bg4",
    authDomain: "idroidstore-a5c43.firebaseapp.com",
    databaseURL: "https://idroidstore-a5c43.firebaseio.com",
    projectId: "idroidstore-a5c43",
    storageBucket: "idroidstore-a5c43.appspot.com",
    messagingSenderId: "831606996417"
};
firebase.initializeApp(config);
export default firebase;