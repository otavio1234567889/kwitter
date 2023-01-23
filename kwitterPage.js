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
username = localStorage.getItem('userName');
roomName = localStorage.getItem('roomName');
function send() {
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomName).push({
    name: username,
    message: msg,
    like: 0


  });
  document.getElementById("msg").value = " ";
}

function getData() {
  firebase.database().ref("/" + roomName).on('value', function (snapshot) {
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function (childSnapshot) {
      childKey = childSnapshot.key;
      childData = childSnapshot.val();
      if (childKey != "purpose") {
        firebaseMessageId = childKey;
        messageData = childData;
        name = messageData['name'];
        message = messageData['message'];
        like = messageData['like'];
        nameWithTag = "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
        messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
        like_button = "<button class='btn btn-warning' id=" + firebaseMessageId + " value=" + like + " onclick='updateLike(this.id)'>";
        spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";


        row = nameWithTag + messageWithTag + like_button + spanWithTag;
        document.getElementById("output").innerHTML += row;

      }
    });
  });
}
getData();

function logout() {
  localStorage.removeItem("userName");
  localStorage.removeItem("roomName");
  window.location = "index.html";
}
function updateLike(m){
console.log('botão pressionado' +m);
button_id=m;
likes=document.getElementById(button_id).value;
updateL=Number(likes)+1;
firebase.database().ref(roomName).child(m).update({
  like:updateL
});
}
