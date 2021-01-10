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
var storage = firebase.storage();
var storageRef = storage.ref();

const tableUpcoming = document.getElementById("tableUpcoming");
const tableDone = document.getElementById("tableDone");

const name = sessionStorage.getItem("NAME");
const type = sessionStorage.getItem("TYPE");
console.log(name, type);

storageRef.child("Meetings/Upcoming").listAll()
    .then(function (res) {
        res.prefixes.forEach(function (folderRef) {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });
        res.items.forEach(function (itemRef) {
            // All the items under listRef.
            if (itemRef.name.includes(name) || type === "admin") {
                txtName = document.createTextNode(itemRef.name.split(".")[0].replace("&", " - "));
                var row = tableUpcoming.insertRow();
                row.insertCell().appendChild(txtName);
                row.onclick = function () {
                    sessionStorage.setItem("MEETING", itemRef.name);
                    sessionStorage.setItem("U/D", "U");
                    location.href = "meeting.html";
                };
            }
        });
    })
    .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });

storageRef.child("Meetings/Done").listAll()
    .then(function (res) {
        res.prefixes.forEach(function (folderRef) {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });
        res.items.forEach(function (itemRef) {
            // All the items under listRef.
            if (itemRef.name.includes(name) || type === "admin") {
                txtName = document.createTextNode(itemRef.name.split(".")[0].replace("&", " - "));
                var row = tableDone.insertRow();
                row.insertCell().appendChild(txtName);
                row.onclick = function () {
                    sessionStorage.setItem("MEETING", itemRef.name);
                    sessionStorage.setItem("U/D", "D");
                    location.href = "meeting.html";
                };
            }
        });
    })
    .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });