import React, { Component } from "react";
import SolarSailer from "./SolarSailer";
import Chat from "./Chat";
import wtfRtc from "wtf-rtc";
import { db, setHostSdp } from "./db";

export class Versus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sdp: null,
      dataChannel: null,
      offerResult: null
    };
  }

  componentDidMount() {
    var roomKey = Math.random()
      .toString(36)
      .slice(2)
      .substring(0, 5)
      .toUpperCase();
    var rtc = wtfRtc("solarsailer", {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
        { urls: "stun:stun2.l.google.com:19302" },
        { urls: "stun:stun3.l.google.com:19302" },
        { urls: "stun:stun4.l.google.com:19302" },
        { urls: "stun:stun.voxgratia.org" }
      ]
    });

    if (this.state.sdp == null) {
      rtc.createOffer({ ordered: false }, (error, offerResult) => {
        console.log(offerResult.sdp);
        setHostSdp(offerResult.sdp, roomKey);
        this.setState({ sdp: offerResult.sdp, offerResult, roomKey });
      });
    }

    db.collection("live")
      .doc(roomKey)
      .onSnapshot(doc => {
        console.log("App data ", doc.data());
        var sdps = doc.data();
        if (sdps && "guestSdp" in sdps) {
          console.log(sdps.guestSdp);
          this.state.offerResult.answer(
            sdps.guestSdp,
            (error, answerResult) => {
              console.log("answerResult", error, answerResult);
              if (answerResult)
                answerResult.getOpenDataChannel((error, dataChannel) => {
                  console.log("in producer data channel");
                  console.log(error, dataChannel);
                  dataChannel.send("hello");
                  this.setState({ dataChannel });
                });
            }
          );
        }
      });
  }

  rtcOffer = null;
  render() {
    return (
      <React.Fragment>
        {this.state.dataChannel == null && (
          <div style={{ textAlign: "center" }}>
            <br />
            <br />
            Share this code:<b>{this.state.roomKey}</b>
            <br />
            <small> or</small>
            <Chat
              sdp={this.state.sdp}
              saveDataChannel={dataChannel => {
                this.setState({ dataChannel });
              }}
            />
          </div>
        )}

        {this.state.dataChannel && (
          <SolarSailer dataChannel={this.state.dataChannel} />
        )}
      </React.Fragment>
    );
  }
}

export default Versus;
