import React, { Component } from "react";
import { db, setGuestSdp } from "./db";
import wtfRtc from "wtf-rtc";

export class Chat extends Component {
  constructor() {
    super();
    this.state = {
      loading:false,
      roomcode: ""
    };
  }
  handleChange = event => {
    this.setState({ roomcode: event.target.value.toUpperCase() });
  };
  handleClick = () => {
    this.setState({loading:true})
    db.collection("live")
      .doc(this.state.roomcode.toUpperCase())
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
            setGuestSdp(consumeResult.sdp, this.state.roomcode);
            console.log("consumeResult", error, consumeResult);
            consumeResult.getOpenDataChannel((error, dataChannel) => {
              console.log(error, dataChannel);
              this.props.saveDataChannel(dataChannel);
            });
          });
        }
      });
  };
  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.roomcode}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>JOIN</button>
        <br/>
        {this.state.loading && "linking..."}
      </div>
    );
  }
}

export default Chat;
