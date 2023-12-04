const userNames = ["JT", "Professor", "Anon"];

function checkUser() {
    const userInput = document.getElementById("userName").value;
    for (let i = 0; i <= userNames.length; i++) {
        if(userInput == userNames[i]) {
            uName = userNames[i];
            alert("Welcome back, " + userNames[i] + ".");
            return uName;
        }
    }
    document.getElementById("enterButton").href = "login.html"
    alert("You have entered an incorrect username, please try again!")
    return;
}


function getUser() {
    setName = uName;
    sessionStorage.setItem("savedName", setName);
    sessionStorage.getItem("savedName");
}