(window.webpackJsonpvs=window.webpackJsonpvs||[]).push([[0],{135:function(t,e,n){t.exports=n(249)},140:function(t,e,n){},244:function(t,e,n){},249:function(t,e,n){"use strict";n.r(e);var a=n(1),o=n.n(a),r=n(45),s=n.n(r),l=(n(140),n(274)),i=n(129),c=n(280),u=n(275),p=n(277),d=n(276),m=n(130),h=n.n(m),f=n(13),y=n(10),g=n(14),v=n(15),x=n(16),b=n(46),E=n.n(b);function w(t){var e=0,n=0,a=0,o=0;t.setup=function(){e=window.innerWidth-30<536?window.innerWidth-30:536,n=e,t.createCanvas(e,e,t.WEBGL),t.background(4)},t.myCustomRedrawAccordingToNewPropsHandler=function(e){t.sendDragged=e.sendDragged,e.rx==a&&e.ry==o||(a=e.rx,o=e.ry)},t.mouseDragged=function(e){t.noStroke(),t.ellipse(t.mouseX,t.mouseY,2),t.sendDragged(t.mouseX,t.mouseY)};t.draw=function(){t.noStroke(),t.translate(-e/2,-n/2),t.ellipse(a,o,2),1,t.rect(5,10,1,1)}}var O=function(t){function e(t){var n;return Object(f.a)(this,e),(n=Object(g.a)(this,Object(v.a)(e).call(this,t))).state={x:0,y:0},n}return Object(x.a)(e,t),Object(y.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.props.dataChannel.addEventListener("message",(function(e){t.setState(JSON.parse(e.data))}))}},{key:"render",value:function(){var t=this;return o.a.createElement("div",null,o.a.createElement("br",null),JSON.stringify(this.state),o.a.createElement(E.a,{sketch:w,rx:this.state.x,ry:this.state.y,sendDragged:function(e,n){t.props.dataChannel.send(JSON.stringify({x:e,y:n}))}}),"Latency Test 1")}}]),e}(a.Component),S=n(38),k=n(39),C=function(t){function e(t){var n;return Object(f.a)(this,e),(n=Object(g.a)(this,Object(v.a)(e).call(this,t))).state={ping:0,lats:[]},n}return Object(x.a)(e,t),Object(y.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.props.dataChannel.addEventListener("message",(function(e){console.log(e.data),"PONG"==e.data&&(console.log("PONG",(new Date).getTime()-t.state.ping),t.setState({lats:t.state.lats.concat([(new Date).getTime()-t.state.ping])})),"PING"==e.data&&t.props.dataChannel.send("PONG")})),setInterval((function(){var e=(new Date).getTime();t.setState({ping:e}),t.props.dataChannel.send("PING")}),2e3)}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("p",null,"Min: ",Math.min.apply(Math,Object(S.a)(this.state.lats))," ms"),o.a.createElement("p",null,"Average:"," ",Math.round(this.state.lats.reduce((function(t,e){return e+t}),0)/this.state.lats.length)," ms"),o.a.createElement("p",null,"Max: ",Math.max.apply(Math,Object(S.a)(this.state.lats))," ms"),o.a.createElement(k.e,{height:300,width:300},o.a.createElement(k.c,null),o.a.createElement(k.a,null),o.a.createElement(k.d,null),o.a.createElement(k.f,null),o.a.createElement(k.b,{animation:!0,data:this.state.lats.map((function(t,e){return{x:e,y:t}}))})))}}]),e}(a.Component),j=n(62),P=n.n(j),D={apiKey:"AIzaSyDGBsWu_dwvGW3TGXZswEMR4X2PNhStaA4",authDomain:"solar-sailer.firebaseapp.com",databaseURL:"https://solar-sailer.firebaseio.com",projectId:"solar-sailer",storageBucket:"solar-sailer.appspot.com",messagingSenderId:"23628532125",appId:"1:23628532125:web:f48762f23514163d940774"},M=P.a.initializeApp(D).firestore(),N=function(t,e){M.collection("live").doc(e).set({guestSdp:t,guestJoinTs:P.a.firestore.FieldValue.serverTimestamp()},{merge:!0}).then((function(){console.log("guestSdp successfully written!")})).catch((function(t){console.error("Error writing document: ",t)}))},R=n(58),K=n.n(R),T=n(126),W=n.n(T),A=function(t){function e(){var t;return Object(f.a)(this,e),(t=Object(g.a)(this,Object(v.a)(e).call(this))).handleChange=function(e){t.setState({roomcode:e.target.value.toUpperCase()})},t.listenToRoom=function(e){M.collection("live").doc(e).onSnapshot((function(n){console.log("Current data ",n.data());var a=n.data();(console.log(a),a&&"hostSdp"in a&&!("guestSdp"in a))&&K()("solarsailer",{iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"stun:stun3.l.google.com:19302"},{urls:"stun:stun4.l.google.com:19302"},{urls:"stun:stun.voxgratia.org"}]}).consumeOffer(a.hostSdp,(function(n,a){N(a.sdp,e),console.log("consumeResult",n,a),a.getOpenDataChannel((function(e,n){console.log(e,n),t.props.saveDataChannel(n)}))}))}))},t.handleClick=function(e){t.setState({loading:!0}),t.listenToRoom(e.toUpperCase())},t.state={loading:!1,roomcode:""},t}return Object(x.a)(e,t),Object(y.a)(e,[{key:"componentDidMount",value:function(){console.log(this.props.match),this.props.match&&this.props.match.length>0&&this.listenToRoom(this.props.match)}},{key:"render",value:function(){return o.a.createElement("div",null,this.props.noInputs?"linking...":o.a.createElement(o.a.Fragment,null,o.a.createElement(W.a,{length:6,initialValue:"",style:{padding:"10px"},inputStyle:{border:"none",borderBottom:"1px solid black"},inputFocusStyle:{borderColor:"blue"},onComplete:this.handleClick}),this.state.loading&&"linking..."))}}]),e}(a.Component),I=n(127),J=n.n(I),G=n(279),X=n(272),Y=(n(119),function(t){function e(t){var n;return Object(f.a)(this,e),(n=Object(g.a)(this,Object(v.a)(e).call(this,t))).sendMove=function(t){var e={payload:t,from:n.props.roomKey,type:"data"};console.log("sending",e),n.props.dataChannel.send(JSON.stringify(e)),n.setState({turn:!n.state.turn})},n.sketch=function(t){var e,n=t.windowWidth,a=t.windowWidth<t.windowHeight?(n-20)/8:n/3/8,o=0,r=0,s=["#ffffff","#111111"],l=.38*a,i=t.windowWidth<t.windowHeight?10:(n-8*a)/2,c=10*a+10+15,u=.2*a,p=[],d=-1,m=-1,h=null,f=!1,y=[0,0],g=function(t){return 0!=t.x&&7!=t.x||0!=t.y&&9!=t.y?0==t.x||7==t.x||0==t.y||9==t.y?3:4:2},v=function(t){var e={x:10,y:10},n=p[t.y][t.x].length;return 0==n?e={x:-u,y:u}:1==n?e={x:-u,y:-u}:2==n?e={x:u,y:-u}:3==n&&(e={x:u,y:u}),{x:t.x*a+a/2+i+e.x,y:t.y*a+a/2+10+e.y}},x=function(t){return t.x>=0&&t.x<8&&t.y>=0&&t.y<10},b=function(t){return!!x(t)&&(0==p[t.y][t.x].length||p[t.y][t.x][0].color==o)};t.setup=function(){h=t.loadSound("./hit.mp3"),e=t.loadFont("./pixel.ttf"),t.createCanvas(n,c),function(){for(var t=0;t<10;t++){p[t]=new Array(8);for(var e=0;e<8;e++)p[t][e]=[]}}()};var E=function(){for(var t=0;t<10;t++)for(var e=0;e<8;e++)for(var n=0;n<p[t][e].length;n++)if(p[t][e][n].inMovment)return!0;return!1},w=function(t){[{x:t.x-1,y:t.y},{x:t.x+1,y:t.y},{x:t.x,y:t.y-1},{x:t.x,y:t.y+1}].forEach((function(e){if(x(e)&&p[t.y][t.x].length>0){var n=p[t.y][t.x].pop(),a=v(e);n.move(a.x,a.y),function(t,e){for(var n=p[t.y][t.x],a=0;a<n.length;a++)n[a].robotId!=e.robotId&&(n[a].robotId=e.robotId,n[a].color=e.color);for(n.push(e);g(t)<n.length;)n.pop()}(e,n)}})),f||h.play()},O=function(e,n){var a=v(e);p[e.y][e.x].push(function(e,n,a){var o={inMovment:!1};return o.x=e,o.y=n,o.robotId=Math.random().toString(36).substring(7),o.destinationX=e,o.destinationY=n,o.color=a,o.show=function(){t.noStroke(),t.fill(s[o.color]),t.ellipse(o.x,o.y,l)},o.move=function(t,e){o.inMovment||(o.destinationX=t,o.destinationY=e)},o.update=function(t,e){o.x+=.5*(o.destinationX-o.x),o.y+=.5*(o.destinationY-o.y),o.inMovment=!(o.x-o.destinationX<.1&&o.y-o.destinationY<.1)},o}(a.x,a.y,n)),o=(o+1)%2,S()},S=function(){(function(){for(var t=[],e=null,n=0;n<10;n++)for(var a=0;a<8;a++)e={x:a,y:n},p[n][a].length==g(e)&&t.push(e);return t})().forEach((function(t){w(t)}))};t.mouseClicked=function(){var e,n,o=(e=t.mouseX,n=t.mouseY,{x:Math.floor((e-i)/a),y:Math.floor((n-10)/a)});b(o)&&!E()&&r&&(!0,O(o,k),h.play(),t.sendMove(o),d=-1,m=-1)};t.draw=function(){t.smooth(),t.strokeWeight(1),t.background("#777777"),t.textSize(32),t.stroke(255,255,255,128),function(){for(var e=0;e<9;e++)t.line(i+e*a,10,i+e*a,10+10*a);for(var n=0;n<11;n++)t.line(i,10+n*a,i+8*a,10+n*a)}(),t.fill(255),t.noStroke(),t.rect(i,10+10*a+12,8*a,3),0!=y[0]&&0!=y[1]&&(t.fill(s[0]),t.rect(i,10+10*a+12,8*a*(y[0]/(y[1]+y[0])),3),t.fill(s[1]),t.rect(i+8*a*(y[0]/(y[1]+y[0])),10+10*a+12,8*a*(y[1]/(y[1]+y[0])),3));for(var n=0;n<10;n++)for(var o=0;o<8;o++)p[n][o]&&p[n][o].forEach((function(t){t.update(),t.show()}));E()||S(),function(){for(var t=[0,0],e=0;e<10;e++)for(var n=0;n<8;n++)p[e][n].length>0&&(t[p[e][n][0].color]+=p[e][n].length);t[0]+t[1]>=2&&(0==t[0]||0==t[1])&&(f=!0),y=t}(),f&&(t.background(0,0,0,90),t.fill(255),t.textSize(32),t.textFont(e),t.text("Game Over",10,30),t.textSize(22),t.text(0==r?"You won! :)\ud83d\udc4f ":"You lost :'|",10,60))};var k=0,C=1;t.myCustomRedrawAccordingToNewPropsHandler=function(e){t.sendMove=e.sendMove,r=e.turn?1:0,k=e.host?1:0,C=e.host?0:1,e.opx==d&&e.opy==m||(d=e.opx,m=e.opy,b({x:d,y:m})&&!E()&&(!0,O({x:d,y:m},C),f||h.play()))}},n.state={x:-1,y:-1,turn:!n.props.host},n}return Object(x.a)(e,t),Object(y.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.props.dataChannel.addEventListener("message",(function(e){var n=JSON.parse(e.data);n.from!==t.props.roomKey&&(console.log("received",n),t.setState({turn:!t.state.turn,x:n.payload.x,y:n.payload.y}))}))}},{key:"render",value:function(){return o.a.createElement("div",{style:{position:"fixed",height:"100%",background:"#777777"}},o.a.createElement(E.a,{settings:this.props.settings,host:this.props.host,sketch:this.sketch,turn:this.state.turn,sendMove:this.sendMove,opx:this.state.x,opy:this.state.y}),o.a.createElement("div",{style:{textAlign:"center",color:"white"}},this.state.turn?o.a.createElement("tt",{className:"blink_me"},"Your turn"):o.a.createElement("tt",null,"Waiting for opponent to move")))}}]),e}(a.Component)),z=n(7);function F(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function L(t){var e,n,a,o=null,r=null,s=0,l=0,i=!0,c=!0,u=!1,p=!1,d=function(e,n){var a={pWidth:e,x:160,y:n?480:0,show:function(){t.fill(255),t.noStroke(),t.rect(a.x,a.y,e-10,20)}};return a};t.setup=function(){r=t.loadSound("./hit.mp3"),t.createCanvas(320,480),t.background(4),t.rectMode(t.CENTER),e=d(60,!0),n=d(60,!1)},t.myCustomRedrawAccordingToNewPropsHandler=function(d){c&&d.oppReady&&(p=d.oppReady),p&&u&&c&&(c=!1,p=!1,u=!1,a.resetPuck()),a||(o=d.host,t.sendData=d.sendData,t.sendScore=d.sendScore,t.sendReady=d.sendReady,a=function(){var a={x:160,y:240,vx:0,vy:0,show:function(){t.rect(a.x,a.y,10,10)},resetPuck:function(){a.x=160,a.y=240,a.vx=(2+5*Math.random()*(s+l)/22)*(Math.random()>=.5?-1:1),a.vy=(2.1+5*Math.random()*(s+l)/22)*(i?-1:1)},update:function(){(a.x>320||a.x<0)&&(a.vx=-a.vx,r.play()),a.y>470&&(a.x>e.x-30&&a.x<e.x+30?(a.vy=1.1*-a.vy,a.y=470,r.play()):(i=!0,l+=1,t.sendScore(s,l),a.resetPuck(),c=!0,p=!1,u=!1)),a.y<10&&(a.x>n.x-30&&a.x<n.x+30?(a.vy=1.1*-a.vy,a.y=10,r.play()):(i=!1,s+=1,t.sendScore(s,l),a.resetPuck(),c=!0,p=!1,u=!1)),a.x+=a.vx,a.y+=a.vy}};return a}()),o||(a.x=320-d.x,a.y=480-d.y),(d.selfPoints>s||d.oppPoints>l)&&(s=d.selfPoints,l=d.oppPoints,c=!0,p=!1,u=!1),n.x=320-d.px},t.mouseClicked=function(){u||(t.sendReady(),u=!0)},t.mouseDragged=function(){t.mouseX>30&&t.mouseX<290&&(e.x=t.mouseX)},t.draw=function(){t.background(0),t.stroke(255),t.line(0,240,320,240),t.push(),t.translate(20,240),t.rotate(t.radians(-90)),t.textSize(22),t.text("".concat(("00"+s).slice(-2),"   ").concat(("00"+l).slice(-2)),-35,0),t.pop(),t.noStroke(),e.show(),n.show(),a&&!c?(o?(a.update(),t.sendData(a.x,a.y,e.x)):t.sendData(null,null,e.x),a.show()):(s>=11||l>=11?(t.push(),t.textAlign(t.CENTER),t.textSize(33),t.text(s>l?"You Win \ud83d\ude0e\u270c":"\ud83d\ude2d",160,360),t.pop()):(u||(t.push(),t.textSize(22),t.textAlign(t.CENTER),t.text("\ud83d\udc46 if ready",160,360),t.pop()),p||(t.push(),t.textAlign(t.CENTER),t.translate(160,120),t.textSize(22),t.rotate(t.radians(180)),t.text("\ud83d\udc46 if ready",0,0),t.pop())),t.background(90,90,90,120))}}var B=function(t){function e(t){var n;return Object(f.a)(this,e),(n=Object(g.a)(this,Object(v.a)(e).call(this,t))).state={x:null,y:null,px:null,selfPoints:0,oppPoints:0},n}return Object(x.a)(e,t),Object(y.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.props.dataChannel.addEventListener("message",(function(e){var n=JSON.parse(e.data);n.from!==t.props.roomKey&&"ready"!=n.type&&t.setState(function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?F(n,!0).forEach((function(e){Object(z.a)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):F(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},n.data,{oppReady:!1})),"ready"==n.type&&n.from!==t.props.roomKey&&t.setState({oppReady:!0})}))}},{key:"render",value:function(){var t=this;return o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(E.a,{sketch:L,host:this.props.host,selfPoints:this.state.oppPoints,oppPoints:this.state.selfPoints,x:this.state.x,y:this.state.y,px:this.state.px,oppReady:this.state.oppReady,sendReady:function(){var e={data:{ready:!0},type:"ready",from:t.props.roomKey};t.props.dataChannel.send(JSON.stringify(e))},sendScore:function(e,n){var a={data:{selfPoints:e,oppPoints:n},type:"score",from:t.props.roomKey};t.props.dataChannel.send(JSON.stringify(a))},sendData:function(e,n,a){t.setState({oppReady:!1});var o={data:{x:e,y:n,px:a},type:"data",from:t.props.roomKey};t.props.dataChannel.send(JSON.stringify(o))}}))}}]),e}(a.Component),H=function(t){function e(t){var n;return Object(f.a)(this,e),(n=Object(g.a)(this,Object(v.a)(e).call(this,t))).rtcOffer=null,n.state={host:!0,sdp:null,dataChannel:null,offerResult:null,roomkey:null,tab:0},n}return Object(x.a)(e,t),Object(y.a)(e,[{key:"componentDidMount",value:function(){var t,e,n=this,a=a||(""+Math.random()).substring(2,8),o=K()("solarsailer",{iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"stun:stun3.l.google.com:19302"},{urls:"stun:stun4.l.google.com:19302"},{urls:"stun:stun.voxgratia.org"}]});null==this.state.sdp&&o.createOffer({ordered:!1},(function(t,e){var o,r;console.log(e.sdp),o=e.sdp,r=a,M.collection("live").doc(r).set({hostSdp:o,hostJoinTs:P.a.firestore.FieldValue.serverTimestamp()}).then((function(){console.log("hostSdp successfully written!")})).catch((function(t){console.error("Error writing document: ",t)})),n.setState({sdp:e.sdp,offerResult:e,roomKey:a})})),t=a,e=function(t){var e=t.data();e&&"guestSdp"in e&&(console.log(e.guestSdp),n.state.offerResult&&n.state.offerResult.answer(e.guestSdp,(function(t,e){console.log("answerResult",t,e),e&&e.getOpenDataChannel((function(t,e){console.log("in producer data channel"),console.log(t,e),e.send("hello"),n.setState({dataChannel:e})}))})))},M.collection("live").doc(t).onSnapshot(e)}},{key:"render",value:function(){var t=this,e=this.props.match.params.roomid,n=this.props.location.pathname.split("/")[1],a="".concat(window.location.href.split("#")[0],"#").concat(n,"/").concat(this.state.roomKey);return o.a.createElement(o.a.Fragment,null,null==this.state.dataChannel&&o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(G.a,{value:this.state.tab,onChange:function(e,n){return t.setState({tab:n})},indicatorColor:"primary",textColor:"primary",centered:!0},o.a.createElement(X.a,{label:"Host"}),o.a.createElement(X.a,{label:"Join"})),o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement("br",null),null==this.state.sdp&&"generating id.."),0==this.state.tab&&o.a.createElement(o.a.Fragment,null,o.a.createElement("br",null),e?o.a.createElement(A,{match:e,noInputs:!0,sdp:this.state.sdp,saveDataChannel:function(e){t.setState({dataChannel:e,host:!1})}}):o.a.createElement("div",null,o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("tt",{style:{fontSize:38,letterSpacing:16}},this.state.roomKey),o.a.createElement("br",null),o.a.createElement("br",null),this.state.roomKey&&o.a.createElement("div",null,o.a.createElement(J.a,{value:a}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("tt",null,a)))),1==this.state.tab&&o.a.createElement(A,{match:e,sdp:this.state.sdp,saveDataChannel:function(e){t.setState({dataChannel:e,host:!1})}})),this.state.dataChannel&&o.a.createElement(o.a.Fragment,null,"draw"==n&&o.a.createElement(O,{roomKey:this.state.roomKey,host:this.state.host,dataChannel:this.state.dataChannel}),"latte"==n&&o.a.createElement(C,{roomKey:this.state.roomKey,host:this.state.host,dataChannel:this.state.dataChannel}),"robots"==n&&o.a.createElement(Y,{settings:{W:7,H:11},roomKey:this.state.roomKey,host:this.state.host,dataChannel:this.state.dataChannel}),"pong"==n&&o.a.createElement(B,{settings:{W:7,H:11},roomKey:this.state.roomKey,host:this.state.host,dataChannel:this.state.dataChannel})))}}]),e}(a.Component),U=n(25),V=n(32),_=(n(244),n(245),n(273)),Z=function(t){function e(){return Object(f.a)(this,e),Object(g.a)(this,Object(v.a)(e).apply(this,arguments))}return Object(x.a)(e,t),Object(y.a)(e,[{key:"render",value:function(){return o.a.createElement(_.a,{maxWidth:"sm"},o.a.createElement("h2",null,"Welcome to The Link"),o.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},o.a.createElement("ul",{className:"navbar-nav mr-auto"},o.a.createElement("li",null,o.a.createElement(U.b,{to:"/pong",className:"nav-link"},"Pong")),o.a.createElement("li",null,o.a.createElement(U.b,{to:"/robots",className:"nav-link"},"Robots")),o.a.createElement("li",null,o.a.createElement(U.b,{to:"/draw",className:"nav-link"},"Draw Demo")),o.a.createElement("li",null,o.a.createElement(U.b,{to:"/latte",className:"nav-link"},"Latency tester")))))}}]),e}(a.Component),$=Object(i.a)((function(t){return{root:{flexGrow:1},menuButton:{marginRight:t.spacing(2)},title:{flexGrow:1}}}));var q=function(){var t=$();return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,null),o.a.createElement(c.a,{position:"static"},o.a.createElement(u.a,null,o.a.createElement(d.a,{edge:"start",className:t.menuButton,color:"inherit","aria-label":"menu"},o.a.createElement(h.a,null)),o.a.createElement(p.a,{variant:"h6",className:t.title},o.a.createElement("a",{href:window.location.href.split("#")[0],className:"nav-link nonlink pixel"},"Link")))),o.a.createElement(U.a,null,o.a.createElement("div",null,o.a.createElement(V.c,null,o.a.createElement(V.a,{path:"//",component:Z}),o.a.createElement(V.a,{path:"/pong/:roomid",component:H}),o.a.createElement(V.a,{path:"/pong",component:H}),o.a.createElement(V.a,{path:"/robots/:roomid",component:H}),o.a.createElement(V.a,{path:"/robots",component:H}),o.a.createElement(V.a,{path:"/draw/:roomid",component:H}),o.a.createElement(V.a,{path:"/draw",component:H}),o.a.createElement(V.a,{path:"/latte/:roomid",component:H}),o.a.createElement(V.a,{path:"/latte",component:H})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Q=n(131),tt=n(278),et=Object(Q.a)({shadows:["none"],palette:{primary:{main:"#000000"}}});s.a.render(o.a.createElement(tt.a,{theme:et},o.a.createElement(U.a,null,o.a.createElement(q,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))}},[[135,1,2]]]);
//# sourceMappingURL=main.f2e30f33.chunk.js.map