import firebase from "firebase";
import config from "./config";

const firebaseApp = firebase.initializeApp(config);

const db = firebaseApp.firestore();

let setGuestSdp = (guestSdp, key) => {
  db.collection("live")
    .doc(key)
    .set(
      {
        guestSdp,
        guestJoinTs: firebase.firestore.FieldValue.serverTimestamp()
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
      hostSdp,
      hostJoinTs: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function() {
      console.log("hostSdp successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};

let listenOnRoom = (room, callback) => {
  db.collection("live")
    .doc(room)
    .onSnapshot(callback);
};

export { db, setGuestSdp, setHostSdp, listenOnRoom };
