// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-CP-VV7rYzgsWozJ456jtNDnTmf4Wk68",
  authDomain: "private-chat-bc127.firebaseapp.com",
  databaseURL: "https://private-chat-bc127-default-rtdb.firebaseio.com",
  projectId: "private-chat-bc127",
  storageBucket: "private-chat-bc127.appspot.com",
  messagingSenderId: "215475046173",
  appId: "1:215475046173:web:46052c38c8e00c9eeac3f4"
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