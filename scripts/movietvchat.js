// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbDsvU86vW5YSRRUATHNqlyg5zt4l9XG4",
    authDomain: "chat3-92675.firebaseapp.com",
    databaseURL: "https://chat3-92675-default-rtdb.firebaseio.com",
    projectId: "chat3-92675",
    storageBucket: "chat3-92675.appspot.com",
    messagingSenderId: "8319987283",
    appId: "1:8319987283:web:9c42ee5dc3ae3aa100a0a6"
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