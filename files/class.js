// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAaVVlIVaomAuhJxt75hkLrxid6kt1dXVM",
    authDomain: "amit-6b7b6.firebaseapp.com",
    projectId: "amit-6b7b6",
    storageBucket: "amit-6b7b6.appspot.com",
    messagingSenderId: "207665282730",
    appId: "1:207665282730:web:e46ea2120b5e23f5a05ad3",
    measurementId: "G-RK412JV7N4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

const pageTitle = document.getElementById("pageTitle");
const title = document.getElementById("title");
const table = document.getElementById("table");

const name = sessionStorage.getItem("NAME");
const type = sessionStorage.getItem("TYPE");
const className = sessionStorage.getItem("CLASS");

pageTitle.innerHTML = className;
title.innerHTML = className;

database.ref(className).once('value').then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        let txtName = document.createTextNode(childKey);
        if (className === "מורים") {
            var txtMeetings = document.createTextNode(childData);
        }
        else {
            var txtMeetings = document.createTextNode(childData + "/2");
        }
        var row = table.insertRow();
        row.insertCell().appendChild(txtName);
        row.insertCell().appendChild(txtMeetings);
        if (txtMeetings.nodeValue === "2/2") {
            row.style.color = "DarkSlateGray";
        }
        row.onclick = function () {
            sessionStorage.setItem("OF", txtName.nodeValue);
            sessionStorage.setItem("NUM", txtMeetings.nodeValue.split("/")[0]);
            location.href = "info.html";
        };
    });
});

window.addEventListener('storage', function (e) {
    if (e.storageArea === sessionStorage) {
        alert("האתר זיהה ניסיון חשוד לשינוי פרטים!");
        sessionStorage.clear();
        location.href = "index.html"
    }
});