import React, { Component } from "react";
import { db, setGuestSdp } from "./db";
import wtfRtc from "wtf-rtc";
import PinInput from "react-pin-input";
export class Join extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      roomcode: ""
    };
  }
  handleChange = event => {
    this.setState({ roomcode: event.target.value.toUpperCase() });
  };

  listenToRoom = roomcode => {
    db.collection("live")
      .doc(roomcode)
      .onSnapshot(doc => {
        // console.log(rtcOffer);
        console.log("Current data ", doc.data());
        var sdps = doc.data();
        console.log(sdps);
        if (sdps && "hostSdp" in sdps && !("guestSdp" in sdps)) {
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
          rtc.consumeOffer(sdps.hostSdp, (error, consumeResult) => {
            setGuestSdp(consumeResult.sdp, roomcode);
            console.log("consumeResult", error, consumeResult);
            consumeResult.getOpenDataChannel((error, dataChannel) => {
              console.log(error, dataChannel);
              this.props.saveDataChannel(dataChannel);
            });
          });
        }
      });
  };

  handleClick = value => {
    this.setState({ loading: true });
    this.listenToRoom(value.toUpperCase());
  };

  componentDidMount() {
    console.log(this.props.match);
    if (this.props.match && this.props.match.length > 0) {
      this.listenToRoom(this.props.match);
    }
  }

  render() {
    return (
      <div>
        {!this.props.noInputs ? (
          <React.Fragment>
            <PinInput
              length={6}
              initialValue=""
         
              style={{ padding: "10px" }}
              inputStyle={{ border: "none", borderBottom: "1px solid black" }}
              inputFocusStyle={{ borderColor: "blue" }}
              onComplete={this.handleClick}
            />

            {/* <button onClick={this.handleClick}>JOIN</button>
        <br/> */}
            {this.state.loading && "linking..."}
          </React.Fragment>
        ):(
          "linking..."
        )}
      </div>
    );
  }
}

export default Join;
