// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByxpH9v07bMAQ18ZYPYBJW7DlS18zhDlI",
    authDomain: "pets-c4d0c.firebaseapp.com",
    databaseURL: "https://pets-c4d0c-default-rtdb.firebaseio.com",
    projectId: "pets-c4d0c",
    storageBucket: "pets-c4d0c.appspot.com",
    messagingSenderId: "306964300640",
    appId: "1:306964300640:web:62c2572d2943638c49d405"
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