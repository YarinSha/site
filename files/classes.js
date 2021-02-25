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

const table = document.getElementById("table");

const name = sessionStorage.getItem("NAME");
const type = sessionStorage.getItem("TYPE");

database.ref("כיתות").once('value').then((snapshot) => {
    var arr = snapshot.val();
    arr.forEach(element => {
        let txtName = document.createTextNode(element);
        var row = table.insertRow();
        row.insertCell().appendChild(txtName);
        row.onclick = function () {
            sessionStorage.setItem("CLASS", element);
            location.href = "class.html";
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