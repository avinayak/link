(window.webpackJsonpvs=window.webpackJsonpvs||[]).push([[0],{138:function(e,t,n){e.exports=n(252)},143:function(e,t,n){},247:function(e,t,n){},252:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(46),s=n.n(r),l=(n(143),n(290)),i=n(132),c=n(291),u=n(292),p=n(294),m=n(293),d=n(133),h=n.n(d),f=n(14),y=n(10),g=n(15),v=n(16),x=n(17),E=n(47),b=n.n(E);function w(e){var t=0,n=0,a=0,o=0;e.setup=function(){t=window.innerWidth-30<536?window.innerWidth-30:536,n=t,e.createCanvas(t,t,e.WEBGL),e.background(4)},e.myCustomRedrawAccordingToNewPropsHandler=function(t){e.sendDragged=t.sendDragged,t.rx==a&&t.ry==o||(a=t.rx,o=t.ry)},e.mouseDragged=function(t){e.noStroke(),e.ellipse(e.mouseX,e.mouseY,2),e.sendDragged(e.mouseX,e.mouseY)};e.draw=function(){e.noStroke(),e.translate(-t/2,-n/2),e.ellipse(a,o,2),1,e.rect(5,10,1,1)}}var O=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={x:0,y:0},n}return Object(x.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.dataChannel.addEventListener("message",(function(t){e.setState(JSON.parse(t.data))}))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",null,o.a.createElement("br",null),JSON.stringify(this.state),o.a.createElement(b.a,{sketch:w,rx:this.state.x,ry:this.state.y,sendDragged:function(t,n){e.props.dataChannel.send(JSON.stringify({x:t,y:n}))}}),"Latency Test 1")}}]),t}(a.Component),k=n(39),S=n(40),C=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={ping:0,lats:[]},n}return Object(x.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.dataChannel.addEventListener("message",(function(t){console.log(t.data),"PONG"==t.data&&(console.log("PONG",(new Date).getTime()-e.state.ping),e.setState({lats:e.state.lats.concat([(new Date).getTime()-e.state.ping])})),"PING"==t.data&&e.props.dataChannel.send("PONG")})),setInterval((function(){var t=(new Date).getTime();e.setState({ping:t}),e.props.dataChannel.send("PING")}),2e3)}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("p",null,"Min: ",Math.min.apply(Math,Object(k.a)(this.state.lats))," ms"),o.a.createElement("p",null,"Average:"," ",Math.round(this.state.lats.reduce((function(e,t){return t+e}),0)/this.state.lats.length)," ms"),o.a.createElement("p",null,"Max: ",Math.max.apply(Math,Object(k.a)(this.state.lats))," ms"),o.a.createElement(S.e,{height:300,width:300},o.a.createElement(S.c,null),o.a.createElement(S.a,null),o.a.createElement(S.d,null),o.a.createElement(S.f,null),o.a.createElement(S.b,{animation:!0,data:this.state.lats.map((function(e,t){return{x:t,y:e}}))})))}}]),t}(a.Component),j=n(64),P=n.n(j),D={apiKey:"AIzaSyDGBsWu_dwvGW3TGXZswEMR4X2PNhStaA4",authDomain:"solar-sailer.firebaseapp.com",databaseURL:"https://solar-sailer.firebaseio.com",projectId:"solar-sailer",storageBucket:"solar-sailer.appspot.com",messagingSenderId:"23628532125",appId:"1:23628532125:web:f48762f23514163d940774"},N=P.a.initializeApp(D).firestore(),R=function(e,t){N.collection("live").doc(t).set({guestSdp:e,guestJoinTs:P.a.firestore.FieldValue.serverTimestamp()},{merge:!0}).then((function(){console.log("guestSdp successfully written!")})).catch((function(e){console.error("Error writing document: ",e)}))},M=n(59),I=n.n(M),T=n(129),K=n.n(T),A=function(e){function t(){var e;return Object(f.a)(this,t),(e=Object(g.a)(this,Object(v.a)(t).call(this))).handleChange=function(t){e.setState({roomcode:t.target.value.toUpperCase()})},e.listenToRoom=function(t){N.collection("live").doc(t).onSnapshot((function(n){console.log("Current data ",n.data());var a=n.data();(console.log(a),a&&"hostSdp"in a&&!("guestSdp"in a))&&I()("solarsailer",{iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"stun:stun3.l.google.com:19302"},{urls:"stun:stun4.l.google.com:19302"},{urls:"stun:stun.voxgratia.org"}]}).consumeOffer(a.hostSdp,(function(n,a){R(a.sdp,t),console.log("consumeResult",n,a),a.getOpenDataChannel((function(t,n){console.log(t,n),e.props.saveDataChannel(n)}))}))}))},e.handleClick=function(t){e.setState({loading:!0}),e.listenToRoom(t.toUpperCase())},e.state={loading:!1,roomcode:""},e}return Object(x.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){console.log(this.props.match),this.props.match&&this.props.match.length>0&&this.listenToRoom(this.props.match)}},{key:"render",value:function(){return o.a.createElement("div",null,this.props.noInputs?"linking...":o.a.createElement(o.a.Fragment,null,o.a.createElement(K.a,{length:6,initialValue:"",style:{padding:"10px"},inputStyle:{border:"none",borderBottom:"1px solid black"},inputFocusStyle:{borderColor:"blue"},onComplete:this.handleClick}),this.state.loading&&"linking..."))}}]),t}(a.Component),W=n(130),J=n.n(W),z=n(296),G=n(279),X=(n(124),function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(g.a)(this,Object(v.a)(t).call(this,e))).sendMove=function(e){var t={payload:e,from:n.props.roomKey,type:"data"};n.props.dataChannel.send(JSON.stringify(t)),n.setState({turn:!n.state.turn})},n.sketch=function(e){var t=e.windowWidth,n=e.windowWidth<e.windowHeight?(t-20)/8:t/3/8,a=0,o=0,r=["#ffffff","#111111"],s=.36*n,l=e.windowWidth<e.windowHeight?10:(t-8*n)/2,i=10*n+10+15,c=.21*n,u=[],p=-1,m=-1,d=null,h=!1,f=[0,0],y=function(e){return 0!=e.x&&7!=e.x||0!=e.y&&9!=e.y?0==e.x||7==e.x||0==e.y||9==e.y?3:4:2},g=function(e){var t={x:10,y:10},a=u[e.y][e.x].length;return 0==a?t={x:-c,y:c}:1==a?t={x:-c,y:-c}:2==a?t={x:c,y:-c}:3==a&&(t={x:c,y:c}),{x:e.x*n+n/2+l+t.x,y:e.y*n+n/2+10+t.y}},v=function(){for(var e=[],t=null,n=0;n<10;n++)for(var a=0;a<8;a++)t={x:a,y:n},u[n][a].length==y(t)&&e.push(t);return e},x=function(e){return e.x>=0&&e.x<8&&e.y>=0&&e.y<10},E=function(e){return!!x(e)&&(0==u[e.y][e.x].length||u[e.y][e.x][0].color==a)};e.setup=function(){d=e.loadSound("./hit.mp3"),e.loadFont("./pixel.ttf"),e.createCanvas(t,i),function(){for(var e=0;e<10;e++){u[e]=new Array(8);for(var t=0;t<8;t++)u[e][t]=[]}}()};var b=function(){for(var e=0;e<10;e++)for(var t=0;t<8;t++)for(var n=0;n<u[e][t].length;n++)if(u[e][t][n].inMovment)return!0;return!1},w=function(e){[{x:e.x-1,y:e.y},{x:e.x+1,y:e.y},{x:e.x,y:e.y-1},{x:e.x,y:e.y+1}].forEach((function(t){if(x(t)&&u[e.y][e.x].length>0){var n=u[e.y][e.x].pop(),a=g(t);n.move(a.x,a.y),function(e,t){for(var n=u[e.y][e.x],a=0;a<n.length;a++)n[a].robotId!=t.robotId&&(n[a].robotId=t.robotId,n[a].color=t.color);for(n.push(t);y(e)<n.length;)n.pop()}(t,n)}})),h||d.play()},O=function(t,n){var o=g(t);u[t.y][t.x].push(function(t,n,a){var o={inMovment:!1};return o.x=t,o.y=n,o.robotId=Math.random().toString(36).substring(7),o.destinationX=t,o.destinationY=n,o.color=a,o.show=function(){e.smooth(),e.stroke(11,11,11),e.strokeWeight(2),e.fill(r[o.color]),e.ellipse(o.x,o.y,s)},o.move=function(e,t){o.inMovment||(o.destinationX=e,o.destinationY=t)},o.update=function(e,t){o.x+=.5*(o.destinationX-o.x),o.y+=.5*(o.destinationY-o.y),o.inMovment=!(o.x-o.destinationX<.1&&o.y-o.destinationY<.1)},o}(o.x,o.y,n)),a=(a+1)%2,k()},k=function(){v().forEach((function(e){w(e)}))};e.mouseClicked=function(){var t,a,r=(t=e.mouseX,a=e.mouseY,{x:Math.floor((t-l)/n),y:Math.floor((a-10)/n)});E(r)&&!b()&&o&&0==v().length&&(!0,O(r,S),d.play(),e.sendMove(r),p=-1,m=-1)};e.draw=function(){e.strokeWeight(1),e.background("#e6e6e6"),e.textSize(32),e.stroke(128),function(){for(var t=0;t<9;t++)e.line(l+t*n,10,l+t*n,10+10*n);for(var a=0;a<11;a++)e.line(l,10+a*n,l+8*n,10+a*n)}(),e.fill(255),e.noStroke(),e.rect(l,10+10*n+12,8*n,3),0!=f[0]&&0!=f[1]&&(e.fill(r[0]),e.rect(l,10+10*n+12,8*n*(f[0]/(f[1]+f[0])),3),e.fill(r[1]),e.rect(l+8*n*(f[0]/(f[1]+f[0])),10+10*n+12,8*n*(f[1]/(f[1]+f[0])),3));for(var a=0;a<10;a++)for(var s=0;s<8;s++)u[a][s]&&u[a][s].forEach((function(e){e.update(),e.show()}));b()||k(),function(){for(var e=[0,0],t=0;t<10;t++)for(var n=0;n<8;n++)u[t][n].length>0&&(e[u[t][n][0].color]+=u[t][n].length);e[0]+e[1]>=2&&(0==e[0]||0==e[1])&&(h=!0),f=e}(),h&&(e.push(),e.translate(t/2,i/2),e.textAlign(e.CENTER),e.background(597,597,597,10),e.fill(255),e.textSize(32),e.text("Game Over",10,30),e.textSize(22),e.text(0==o?"\ud83e\udd73\ud83c\udf89You won!\ud83d\udc4f\ud83c\udf86":"\ud83d\ude14 You lost \ud83d\ude22",10,60),e.pop())};var S=0,C=1;e.myCustomRedrawAccordingToNewPropsHandler=function(t){e.sendMove=t.sendMove,o=t.turn?1:0,S=t.host?1:0,C=t.host?0:1,t.opx==p&&t.opy==m||(p=t.opx,m=t.opy,E({x:p,y:m})&&!b()&&(!0,O({x:p,y:m},C),h||d.play()))}},n.state={x:-1,y:-1,turn:!n.props.host},n}return Object(x.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.dataChannel.addEventListener("message",(function(t){var n=JSON.parse(t.data);n.from!==e.props.roomKey&&e.setState({turn:!e.state.turn,x:n.payload.x,y:n.payload.y})}))}},{key:"render",value:function(){return o.a.createElement("div",{style:{position:"fixed",height:"100%",background:"#e6e6e6"}},o.a.createElement(b.a,{settings:this.props.settings,host:this.props.host,sketch:this.sketch,turn:this.state.turn,sendMove:this.sendMove,opx:this.state.x,opy:this.state.y}),o.a.createElement("div",{style:{textAlign:"center",color:"#222"}},this.state.turn?o.a.createElement("tt",{className:"blink_me"},"Your turn"):o.a.createElement("tt",null,"Waiting for opponent to move")))}}]),t}(a.Component)),L=n(8);function Y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function B(e){var t,n,a,o=null,r=null,s=0,l=0,i=!0,c=!0,u=!1,p=!1,m=function(t,n){var a={pWidth:t,x:160,y:n?480:0,show:function(){e.fill(255),e.noStroke(),e.rect(a.x,a.y,t-10,20)}};return a};e.setup=function(){r=e.loadSound("./hit.mp3"),e.createCanvas(320,480),e.background(4),e.rectMode(e.CENTER),t=m(60,!0),n=m(60,!1)},e.myCustomRedrawAccordingToNewPropsHandler=function(m){c&&m.oppReady&&(p=m.oppReady),p&&u&&c&&(c=!1,p=!1,u=!1,a.resetPuck()),a||(o=m.host,e.sendData=m.sendData,e.sendScore=m.sendScore,e.sendReady=m.sendReady,a=function(){var a={x:160,y:240,vx:0,vy:0,show:function(){e.rect(a.x,a.y,10,10)},resetPuck:function(){a.x=160,a.y=240,a.vx=(2+5*Math.random()*(s+l)/22)*(Math.random()>=.5?-1:1),a.vy=(2.1+5*Math.random()*(s+l)/22)*(i?-1:1)},update:function(){(a.x>320||a.x<0)&&(a.vx=-a.vx,r.play()),a.y>470&&(a.x>t.x-30&&a.x<t.x+30?(a.vy=1.1*-a.vy,a.y=470,r.play()):(i=!0,l+=1,e.sendScore(s,l),a.resetPuck(),c=!0,p=!1,u=!1)),a.y<10&&(a.x>n.x-30&&a.x<n.x+30?(a.vy=1.1*-a.vy,a.y=10,r.play()):(i=!1,s+=1,e.sendScore(s,l),a.resetPuck(),c=!0,p=!1,u=!1)),a.x+=a.vx,a.y+=a.vy}};return a}()),o||(a.x=320-m.x,a.y=480-m.y),(m.selfPoints>s||m.oppPoints>l)&&(s=m.selfPoints,l=m.oppPoints,c=!0,p=!1,u=!1),n.x=320-m.px},e.mouseClicked=function(){u||(e.sendReady(),u=!0)},e.mouseDragged=function(){e.mouseX>30&&e.mouseX<290&&(t.x=e.mouseX)},e.draw=function(){e.background(0),e.stroke(255),e.line(0,240,320,240),e.push(),e.translate(20,240),e.rotate(e.radians(-90)),e.textSize(22),e.text("".concat(("00"+s).slice(-2),"   ").concat(("00"+l).slice(-2)),-35,0),e.pop(),e.noStroke(),t.show(),n.show(),a&&!c?(o?(a.update(),e.sendData(a.x,a.y,t.x)):e.sendData(null,null,t.x),a.show()):(s>=11||l>=11?(e.push(),e.textAlign(e.CENTER),e.textSize(33),e.text(s>l?"You Win \ud83d\ude0e\u270c":"\ud83d\ude2d",160,360),e.pop()):(u||(e.push(),e.textSize(22),e.textAlign(e.CENTER),e.text("\ud83d\udc46 if ready",160,360),e.pop()),p||(e.push(),e.textAlign(e.CENTER),e.translate(160,120),e.textSize(22),e.rotate(e.radians(180)),e.text("\ud83d\udc46 if ready",0,0),e.pop())),e.background(90,90,90,120))}}var F=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(g.a)(this,Object(v.a)(t).call(this,e))).state={x:null,y:null,px:null,selfPoints:0,oppPoints:0},n}return Object(x.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.props.dataChannel.addEventListener("message",(function(t){var n=JSON.parse(t.data);n.from!==e.props.roomKey&&"ready"!=n.type&&e.setState(function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?Y(n,!0).forEach((function(t){Object(L.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):Y(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({},n.data,{oppReady:!1})),"ready"==n.type&&n.from!==e.props.roomKey&&e.setState({oppReady:!0})}))}},{key:"render",value:function(){var e=this;return o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(b.a,{sketch:B,host:this.props.host,selfPoints:this.state.oppPoints,oppPoints:this.state.selfPoints,x:this.state.x,y:this.state.y,px:this.state.px,oppReady:this.state.oppReady,sendReady:function(){var t={data:{ready:!0},type:"ready",from:e.props.roomKey};e.props.dataChannel.send(JSON.stringify(t))},sendScore:function(t,n){var a={data:{selfPoints:t,oppPoints:n},type:"score",from:e.props.roomKey};e.props.dataChannel.send(JSON.stringify(a))},sendData:function(t,n,a){e.setState({oppReady:!1});var o={data:{x:t,y:n,px:a},type:"data",from:e.props.roomKey};e.props.dataChannel.send(JSON.stringify(o))}}))}}]),t}(a.Component),H=function(e){function t(e){var n;return Object(f.a)(this,t),(n=Object(g.a)(this,Object(v.a)(t).call(this,e))).rtcOffer=null,n.state={host:!0,sdp:null,dataChannel:null,offerResult:null,roomkey:null,tab:0},n}return Object(x.a)(t,e),Object(y.a)(t,[{key:"componentDidMount",value:function(){var e,t,n=this,a=a||(""+Math.random()).substring(2,8),o=I()("solarsailer",{iceServers:[{urls:"stun:stun.l.google.com:19302"},{urls:"stun:stun1.l.google.com:19302"},{urls:"stun:stun2.l.google.com:19302"},{urls:"stun:stun3.l.google.com:19302"},{urls:"stun:stun4.l.google.com:19302"},{urls:"stun:stun.voxgratia.org"}]});null==this.state.sdp&&o.createOffer({ordered:!1},(function(e,t){var o,r;console.log(t.sdp),o=t.sdp,r=a,N.collection("live").doc(r).set({hostSdp:o,hostJoinTs:P.a.firestore.FieldValue.serverTimestamp()}).then((function(){console.log("hostSdp successfully written!")})).catch((function(e){console.error("Error writing document: ",e)})),n.setState({sdp:t.sdp,offerResult:t,roomKey:a})})),e=a,t=function(e){var t=e.data();t&&"guestSdp"in t&&(console.log(t.guestSdp),n.state.offerResult&&n.state.offerResult.answer(t.guestSdp,(function(e,t){console.log("answerResult",e,t),t&&t.getOpenDataChannel((function(e,t){console.log("in producer data channel"),console.log(e,t),t.send("hello"),n.setState({dataChannel:t})}))})))},N.collection("live").doc(e).onSnapshot(t)}},{key:"render",value:function(){var e=this,t=this.props.match.params.roomid,n=this.props.location.pathname.split("/")[1],a="".concat(window.location.href.split("#")[0],"#").concat(n,"/").concat(this.state.roomKey);return o.a.createElement(o.a.Fragment,null,null==this.state.dataChannel&&o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement(z.a,{value:this.state.tab,onChange:function(t,n){return e.setState({tab:n})},inkBarContainerStyle:{background:"#111",color:"#fff"},textColor:"#111",centered:!0},o.a.createElement(G.a,{label:"Host"}),o.a.createElement(G.a,{label:"Join"})),o.a.createElement("div",{style:{textAlign:"center"}},o.a.createElement("br",null),null==this.state.sdp&&"generating id.."),0==this.state.tab&&o.a.createElement(o.a.Fragment,null,o.a.createElement("br",null),t?o.a.createElement(A,{match:t,noInputs:!0,sdp:this.state.sdp,saveDataChannel:function(t){e.setState({dataChannel:t,host:!1})}}):o.a.createElement("div",null,o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("tt",{style:{fontSize:38,letterSpacing:16}},this.state.roomKey),o.a.createElement("br",null),o.a.createElement("br",null),this.state.roomKey&&o.a.createElement("div",null,o.a.createElement(J.a,{value:a}),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("tt",null,a)))),1==this.state.tab&&o.a.createElement(A,{match:t,sdp:this.state.sdp,saveDataChannel:function(t){e.setState({dataChannel:t,host:!1})}})),this.state.dataChannel&&o.a.createElement(o.a.Fragment,null,"draw"==n&&o.a.createElement(O,{roomKey:this.state.roomKey,host:this.state.host,dataChannel:this.state.dataChannel}),"latte"==n&&o.a.createElement(C,{roomKey:this.state.roomKey,host:this.state.host,dataChannel:this.state.dataChannel}),"robots"==n&&o.a.createElement(X,{settings:{W:7,H:11},roomKey:this.state.roomKey,host:this.state.host,dataChannel:this.state.dataChannel}),"pong"==n&&o.a.createElement(F,{settings:{W:7,H:11},roomKey:this.state.roomKey,host:this.state.host,dataChannel:this.state.dataChannel})))}}]),t}(a.Component),U=n(26),V=n(34),_=(n(247),n(248),n(285)),Z=n(283),$=n(284),q=n(286),Q=n(287),ee=n(288),te=n(289),ne=n(254),ae=n(280),oe=n(282),re=n(281);function se(e){var t=e.name,n=e.link,a=e.history,r=e.Icon,s=e.AI;return o.a.createElement(ne.a,{style:{opacity:.9,marginBottom:21}},o.a.createElement("div",{style:{padding:"41px 38px"}},o.a.createElement(ae.a,{container:!0,spacing:1},o.a.createElement(ae.a,{item:!0,sm:4},o.a.createElement(r,{style:{fontSize:"107px"}})),o.a.createElement(ae.a,{item:!0,sm:8},o.a.createElement("h1",null,t),o.a.createElement(re.a,{size:"small","aria-label":"small outlined button group"},s&&o.a.createElement(oe.a,null,o.a.createElement(Z.a,null),"\xa0\xa0AI"),o.a.createElement(oe.a,{onClick:function(){a.push(n)}},o.a.createElement($.a,null),"\xa0\xa01 v 1"))))))}var le=function(e){function t(){return Object(f.a)(this,t),Object(g.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(x.a)(t,e),Object(y.a)(t,[{key:"render",value:function(){return o.a.createElement(_.a,{maxWidth:"sm"},o.a.createElement("h2",null,"Welcome to The Link"),o.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},o.a.createElement(se,{name:"Robots",link:"/robots",AI:!0,history:this.props.history,Icon:q.a}),o.a.createElement(se,{name:"Pong",link:"/pong",history:this.props.history,Icon:Q.a}),o.a.createElement(se,{name:"Draw!",link:"/draw",history:this.props.history,Icon:ee.a}),o.a.createElement(se,{name:"Latency Test",link:"/latte",history:this.props.history,Icon:te.a}),o.a.createElement("ul",{className:"navbar-nav mr-auto"},o.a.createElement("li",null,o.a.createElement(U.b,{to:"/pong",className:"nav-link"},"Pong")),o.a.createElement("li",null,o.a.createElement(U.b,{to:"/robots",className:"nav-link"},"Robots")),o.a.createElement("li",null,o.a.createElement(U.b,{to:"/draw",className:"nav-link"},"Draw Demo")),o.a.createElement("li",null,o.a.createElement(U.b,{to:"/latte",className:"nav-link"},"Latency tester")))))}}]),t}(a.Component),ie=Object(V.f)(le),ce=Object(i.a)((function(e){return{root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));var ue=function(){var e=ce();return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,null),o.a.createElement(c.a,{elevation:.9,border:1,position:"static"},o.a.createElement(u.a,null,o.a.createElement(m.a,{edge:"start",className:e.menuButton,color:"inherit","aria-label":"menu"},o.a.createElement(h.a,null)),o.a.createElement(p.a,{variant:"h6",className:e.title},o.a.createElement("a",{href:window.location.href.split("#")[0],className:"nav-link nonlink pixel"},"Link")))),o.a.createElement(U.a,null,o.a.createElement("div",null,o.a.createElement(V.c,null,o.a.createElement(V.a,{path:"//",component:ie}),o.a.createElement(V.a,{path:"/pong/:roomid",component:H}),o.a.createElement(V.a,{path:"/pong",component:H}),o.a.createElement(V.a,{path:"/robots/:roomid",component:H}),o.a.createElement(V.a,{path:"/robots",component:H}),o.a.createElement(V.a,{path:"/draw/:roomid",component:H}),o.a.createElement(V.a,{path:"/draw",component:H}),o.a.createElement(V.a,{path:"/latte/:roomid",component:H}),o.a.createElement(V.a,{path:"/latte",component:H})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var pe=n(134),me=n(295),de=Object(pe.a)({palette:{primary:{main:"#ffffff"}}});s.a.render(o.a.createElement(me.a,{theme:de},o.a.createElement(U.a,null,o.a.createElement(ue,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[138,1,2]]]);
//# sourceMappingURL=main.a0835f35.chunk.js.map