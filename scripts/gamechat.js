/* Minified JavaScript */

const firebaseConfig={apiKey:"AIzaSyB9Bw3JOGH7Oxxa9ttpQzSoNuMcL1kU4iY",authDomain:"chat4-e20e2.firebaseapp.com",databaseURL:"https://chat4-e20e2-default-rtdb.firebaseio.com",projectId:"chat4-e20e2",storageBucket:"chat4-e20e2.appspot.com",messagingSenderId:"110846231148",appId:"1:110846231148:web:192a62701f275df7efce49"};firebase.initializeApp(firebaseConfig);const db=firebase.database();getName=sessionStorage.getItem("savedName");const username=getName;function sendMessage(e){e.preventDefault();let a=Date.now(),s=document.getElementById("message-input"),t=s.value;s.value="",document.getElementById("messages").scrollIntoView({behavior:"smooth",block:"end",inline:"nearest"}),db.ref("messages/"+a).set({username,message:t})}document.getElementById("message-form").addEventListener("submit",sendMessage);const fetchChat=db.ref("messages/");fetchChat.on("child_added",function(e){let a=e.val(),s=`<li class=${username===a.username?"sent":"receive"}><span>${a.username}: </span>${a.message}</li>`;document.getElementById("messages").innerHTML+=s});