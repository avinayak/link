import firebase from "firebase";
import config from './config'

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

let setGuestSdp = (guestSdp, key) => {
    db.collection("live")
      .doc(key)
      .set(
        {
          guestSdp
        },
        { merge: true }
      )
      .then(function() {
        console.log("guestSdp successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };

  let setHostSdp = (hostSdp, key) => {
    db.collection("live")
      .doc(key)
      .set({
        hostSdp
      })
      .then(function() {
        console.log("hostSdp successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  };
  

  export { db, setGuestSdp, setHostSdp };
