(window.webpackJsonpvs=window.webpackJsonpvs||[]).push([[0],{42:function(e,t,n){e.exports=n(68)},47:function(e,t,n){},61:function(e,t,n){},68:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),l=n(17),s=n.n(l),r=(n(47),n(89)),c=n(35),i=n(95),u=n(90),d=n(92),g=n(93),m=n(91),h=n(37),p=n.n(h),f=n(94),v=n(18),E=n(13),b=n(19),w=n(20),S=n(22),C=n(32),y=n.n(C);function O(e){var t=0,n=0,a=0,o=0;e.setup=function(){t=window.innerWidth-30<536?window.innerWidth-30:536,n=t,e.createCanvas(t,t,e.WEBGL),e.background(4)},e.myCustomRedrawAccordingToNewPropsHandler=function(t){e.sendDragged=t.sendDragged,t.rx==a&&t.ry==o||(a=t.rx,o=t.ry)},e.mouseDragged=function(t){e.noStroke(),e.ellipse(e.mouseX,e.mouseY,2),e.sendDragged(e.mouseX,e.mouseY)};e.draw=function(){e.noStroke(),e.translate(-t/2,-n/2),e.ellipse(a,o,2),1,e.rect(5,10,1,1)}}var k=function(e){function t(e){var n;return Object(v.a)(this,t),(n=Object(b.a)(this,Object(w.a)(t).call(this,e))).state={x:0,y:0},n}return Object(S.a)(t,e),Object(E.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.dataChannel.addEventListener("message",(function(t){e.setState(JSON.parse(t.data))}))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("br",null),JSON.stringify(this.state),o.a.createElement(y.a,{sketch:O,rx:this.state.x,ry:this.state.y,sendDragged:function(t,n){e.props.dataChannel.send(JSON.stringify({x:t,y:n}))}}),"Latency Test 1")}}]),t}(a.Component),j=n(33),x={apiKey:"AIzaSyDGBsWu_dwvGW3TGXZswEMR4X2PNhStaA4",authDomain:"solar-sailer.firebaseapp.com",databaseURL:"https://solar-sailer.firebaseio.com",projectId:"solar-sailer",storageBucket:"solar-sailer.appspot.com",messagingSenderId:"23628532125",appId:"1:23628532125:web:f48762f23514163d940774"},D=n.n(j).a.initializeApp(x).firestore(),R=function(e,t){D.collection("live").doc(t).set({guestSdp:e},{merge:!0}).then((function(){console.log("guestSdp successfully written!")})).catch((function(e){console.error("Error writing document: ",e)}))},N=n(26),W=n.n(N),B=function(e){function t(){var e;return Object(v.a)(this,t),(e=Object(b.a)(this,Object(w.a)(t).call(this))).handleChange=function(t){e.setState({roomcode:t.target.value.toUpperCase()})},e.handleClick=function(){e.setState({loading:!0}),D.collection("live").doc(e.state.roomcode.toUpperCase()).onSnapshot((function(t){console.log("Current data ",t.data());var n=t.data();(console.log(n),n&&"hostSdp"in n&&!("guestSdp"in n))&&W()("solarsailer",{iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"stun:stun3.l.google.com:19302"},{urls:"stun:stun4.l.google.com:19302"},{urls:"stun:stun.voxgratia.org"}]}).consumeOffer(n.hostSdp,(function(t,n){R(n.sdp,e.state.roomcode),console.log("consumeResult",t,n),n.getOpenDataChannel((function(t,n){console.log(t,n),e.props.saveDataChannel(n)}))}))}))},e.state={loading:!1,roomcode:""},e}return Object(S.a)(t,e),Object(E.a)(t,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("input",{type:"text",value:this.state.roomcode,onChange:this.handleChange}),o.a.createElement("button",{onClick:this.handleClick},"JOIN"),o.a.createElement("br",null),this.state.loading&&"linking...")}}]),t}(a.Component),A=function(e){function t(e){var n;return Object(v.a)(this,t),(n=Object(b.a)(this,Object(w.a)(t).call(this,e))).rtcOffer=null,n.state={sdp:null,dataChannel:null,offerResult:null},n}return Object(S.a)(t,e),Object(E.a)(t,[{key:"componentDidMount",value:function(){var e=this,t=Math.random().toString(36).slice(2).substring(0,5).toUpperCase(),n=W()("solarsailer",{iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"stun:stun3.l.google.com:19302"},{urls:"stun:stun4.l.google.com:19302"},{urls:"stun:stun.voxgratia.org"}]});null==this.state.sdp&&n.createOffer({ordered:!1},(function(n,a){var o,l;console.log(a.sdp),o=a.sdp,l=t,D.collection("live").doc(l).set({hostSdp:o}).then((function(){console.log("hostSdp successfully written!")})).catch((function(e){console.error("Error writing document: ",e)})),e.setState({sdp:a.sdp,offerResult:a,roomKey:t})})),D.collection("live").doc(t).onSnapshot((function(t){console.log("App data ",t.data());var n=t.data();n&&"guestSdp"in n&&(console.log(n.guestSdp),e.state.offerResult.answer(n.guestSdp,(function(t,n){console.log("answerResult",t,n),n&&n.getOpenDataChannel((function(t,n){console.log("in producer data channel"),console.log(t,n),n.send("hello"),e.setState({dataChannel:n})}))})))}))}},{key:"render",value:function(){var e=this;return o.a.createElement(o.a.Fragment,null,null==this.state.dataChannel&&o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement("br",null),o.a.createElement("br",null),"Share this code:",o.a.createElement("b",null,this.state.roomKey),o.a.createElement("br",null),o.a.createElement("small",null," or"),o.a.createElement(B,{sdp:this.state.sdp,saveDataChannel:function(t){e.setState({dataChannel:t})}})),this.state.dataChannel&&o.a.createElement(k,{dataChannel:this.state.dataChannel}))}}]),t}(a.Component),G=(n(61),Object(c.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}})));var I=function(){var e=G();return o.a.createElement(o.a.Fragment,null,o.a.createElement(r.a,null),o.a.createElement(i.a,{position:"static"},o.a.createElement(u.a,null,o.a.createElement(m.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu"},o.a.createElement(p.a,null)),o.a.createElement(d.a,{variant:"h6",className:e.title},"Link"),o.a.createElement(g.a,{color:"inherit"},"Login"))),o.a.createElement(f.a,{maxWidth:"sm"},o.a.createElement(A,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[42,1,2]]]);
//# sourceMappingURL=main.08b71dc8.chunk.js.map