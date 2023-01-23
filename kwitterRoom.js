// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCySiaAu1CZ7HJ_3o461qiK1c-mTK0OXNc",
  authDomain: "chat-6a8eb.firebaseapp.com",
  databaseURL: "https://chat-6a8eb-default-rtdb.firebaseio.com",
  projectId: "chat-6a8eb",
  storageBucket: "chat-6a8eb.appspot.com",
  messagingSenderId: "1018209622579",
  appId: "1:1018209622579:web:664d8108dc9b94d3eca146"
};



firebase.initializeApp(firebaseConfig);

nameu = localStorage.getItem('userName');
document.getElementById("userName").innerHTML = "Bem-vindo(a) " + nameu + "!";

function add() {
  roomNames = document.getElementById("roomName").value;
  firebase.database().ref('/').child(roomNames).update({
    criador: nameu
  });
  localStorage.setItem('roomName', roomNames);
  window.location = "kwitterPage.html";
}

function getData() {
  firebase.database().ref("/").on('value', function (snapshot) {
    document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      row = "<div class='roomName' id=" + roomNames + " onclick='redirectToRoomName(this.id)' >#" + roomNames + "</div><hr>";
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();
function redirectToRoomName(name) {
  localStorage.setItem("roomName", name);
  window.location = "kwitterPage.html";
}

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}
