import React, { Component } from "react";
import SolarSailer from "./SolarSailer";
import Latte from "./Latte";
import Join from "./Join";
import wtfRtc from "wtf-rtc";
import { db, setHostSdp, listenOnRoom } from "./db";
import QRCode from "react-qr-code";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Robots from "./Robots";

export class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      host: true,
      sdp: null,
      dataChannel: null,
      offerResult: null,
      roomkey: null,
      tab: 0
    };
  }

  componentDidMount() {
   // var roomKey = localStorage.getItem("link_2.roomkey");
    var roomKey = roomKey || ("" + Math.random()).substring(2, 8);
    // if (!localStorage.getItem("link_2.roomkey")) {
    //   localStorage.setItem("link_2.roomkey", roomKey);
    // }
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

    listenOnRoom(roomKey, doc => {
      var sdps = doc.data();
      if (sdps && "guestSdp" in sdps) {
        console.log(sdps.guestSdp);
        if (this.state.offerResult)
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
    let match = this.props.match.params.roomid;
    let appId = this.props.location.pathname.split("/")[1];
    let shareURL = `${window.location.href.split("#")[0]}#${appId}/${
      this.state.roomKey
    }`;
    return (
      <React.Fragment>
        {this.state.dataChannel == null && (
          <div style={{ textAlign: "center" }}>
            <Tabs
              value={this.state.tab}
              onChange={(e, tab) => this.setState({ tab })}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Host"></Tab>
              <Tab label="Join"></Tab>
            </Tabs>
            <div style={{ textAlign: "center" }}>
              <br />
              {this.state.sdp == null && "generating id.."}
            </div>
            {this.state.tab == 0 && (
              <React.Fragment>
                <br />
                {match ? (
                  <Join
                    match={match}
                    noInputs
                    sdp={this.state.sdp}
                    saveDataChannel={dataChannel => {
                      this.setState({ dataChannel, host: false });
                    }}
                  />
                ) : (
                  <div>
                    <br />
                    <br />
                    <tt style={{ fontSize: 38, letterSpacing: 16 }}>
                      {this.state.roomKey}
                    </tt>
                    <br />
                    <br />
                    {this.state.roomKey && (
                      <div>
                        <QRCode value={shareURL} />
                        <br />
                        <br />
                        <br />
                        <tt>{shareURL}</tt>
                      </div>
                    )}
                  </div>
                )}
              </React.Fragment>
            )}

            {this.state.tab == 1 && (
              <Join
                match={match}
                sdp={this.state.sdp}
                saveDataChannel={dataChannel => {
                  this.setState({ dataChannel, host: false });
                }}
              />
            )}
          </div>
        )}

        {this.state.dataChannel && (
          <React.Fragment>
            {appId == "draw" && (
              <SolarSailer
              roomKey={this.state.roomKey}
                host={this.state.host}
                dataChannel={this.state.dataChannel}
              />
            )}
            {appId == "latte" && (
              <Latte
              roomKey={this.state.roomKey}
                host={this.state.host}
                dataChannel={this.state.dataChannel}
              />
            )}
            {appId == "robots" && (
              <Robots
              settings={{W:7,H:11}}
              roomKey={this.state.roomKey}
                host={this.state.host}
                dataChannel={this.state.dataChannel}
              />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
export default Room;
