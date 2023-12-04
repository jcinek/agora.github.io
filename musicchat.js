// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDpwCPnRNY7xvODSzx1aDh_ez8UUJjsAuE",
    authDomain: "chat2-b77dd.firebaseapp.com",
    databaseURL: "https://chat2-b77dd-default-rtdb.firebaseio.com",
    projectId: "chat2-b77dd",
    storageBucket: "chat2-b77dd.appspot.com",
    messagingSenderId: "311197750092",
    appId: "1:311197750092:web:f5cbf285ff6b9f43bc35e9"
  };
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// initialize database
const db = firebase.database();

// get user's data
getName = sessionStorage.getItem("savedName");

const username = getName;

// submit form
// listen for submit event on the form and call the postChat function
document.getElementById("message-form").addEventListener("submit", sendMessage);

// send message to db
function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

// display the messages
// reference the collection created earlier
const fetchChat = db.ref("messages/");

// check for new messages using the onChildAdded event listener
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});