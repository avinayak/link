import * as React from "react";
import { usePeerState, useReceivePeerState } from "react-peer";

const PeerTest = () => {
  const [peerBrokerId, setPeerBrokerId] = React.useState("");
  const [state, setState, brokerId, connections, stateErr] = usePeerState({
    data: Math.random()
  });
  const [peerState, isConnected, recErr] = useReceivePeerState(peerBrokerId);

  const connectToPeer = e => {
    e.preventDefault();
    const brokerId = document.getElementById("key").value;
    setPeerBrokerId(brokerId);
  };

  const sendDataToPeer = e => {
    e.preventDefault();
    setState({ data: document.getElementById("data").value, peerId: brokerId });
  };

  if (peerState && "data" in peerState) {
    console.log(peerState);
  }

  return (
    <div>
      <strong>usePeerState()</strong> <br />
      broker id: {brokerId} <br />
      local state: {JSON.stringify(state)} <br />
      connected peers: {JSON.stringify(connections.length)} <br />
      err: {JSON.stringify(stateErr)}
      <form onSubmit={sendDataToPeer}>
        <input id="data" />
        <button>send data</button>
      </form>
      <br />
      <strong>useReceivePeerState()</strong> <br />
      connected: {JSON.stringify(isConnected)} <br />
      received state: {JSON.stringify(peerState)} <br />
      err: {JSON.stringify(recErr)}
      <form onSubmit={connectToPeer}>
        <input id="key" />
        <button>connect</button>
      </form>
    </div>
  );
};

export default PeerTest;
