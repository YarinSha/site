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
var db = firebase.firestore();

const txtTitle = document.getElementById("title");

var btnMeetings = document.createElement("button");
btnMeetings.innerHTML = "פגישות";
btnMeetings.style.display = "none";
btnMeetings.style.margin = "10px auto";
document.body.appendChild(btnMeetings);

var btnClasses = document.createElement("button");
btnClasses.innerHTML = "כיתות";
btnClasses.style.display = "none";
btnClasses.style.margin = "10px auto";
document.body.appendChild(btnClasses);

var btnTeachers = document.createElement("button");
btnTeachers.innerHTML = "מורים";
btnTeachers.style.display = "none";
btnTeachers.style.margin = "10px auto";
document.body.appendChild(btnTeachers);

var btnPass = document.createElement("button");
btnPass.innerHTML = "שינוי סיסמה";
btnPass.style.margin = "10px auto";
document.body.appendChild(btnPass);

var inputTxtOld = document.createElement("h4");
inputTxtOld.innerHTML = "סיסמה ישנה:";
inputTxtOld.style.display = "none";
document.body.appendChild(inputTxtOld);

var inputOld = document.createElement("input");
inputOld.type = "password";
inputOld.style.display = "none";
inputOld.style.margin = "10px auto";
document.body.appendChild(inputOld);

var inputTxt = document.createElement("h4");
inputTxt.innerHTML = "סיסמה חדשה:";
inputTxt.style.display = "none";
document.body.appendChild(inputTxt);

var input = document.createElement("input");
input.type = "password";
input.style.display = "none";
input.style.margin = "10px auto";
document.body.appendChild(input);

var inputTxt2 = document.createElement("h4");
inputTxt2.innerHTML = "סיסמה חדשה שוב:";
inputTxt2.style.display = "none";
document.body.appendChild(inputTxt2);

var input2 = document.createElement("input");
input2.type = "password";
input2.style.display = "none";
input2.style.margin = "10px auto";
document.body.appendChild(input2);

var btnSub = document.createElement("button");
btnSub.innerHTML = "שינוי";
btnSub.style.display = "none";
btnSub.style.margin = "10px auto";
document.body.appendChild(btnSub);

const email = sessionStorage.getItem("EMAIL");
var name, type;

if (sessionStorage.getItem("PREVEMAIL") != null && sessionStorage.getItem("PREVEMAIL") == sessionStorage.getItem("EMAIL")) {
    name = sessionStorage.getItem("NAME");
    type = sessionStorage.getItem("TYPE");

    txtTitle.innerHTML = "שלום " + name;

    if (type === "student") {
        btnMeetings.style.display = "block";
    }
    if (type === "teacher") {
        btnMeetings.style.display = "block";
        btnClasses.style.display = "block";
    }
    if (type === "admin") {
        btnMeetings.style.display = "block";
        btnClasses.style.display = "block";
        btnTeachers.style.display = "block";
    }
}
else {
    var docRef = db.collection("users").doc(email);

    docRef.get().then(function (doc) {
        if (doc.exists) {
            name = doc.data().name;
            type = doc.data().type;

            sessionStorage.setItem("NAME", name);
            sessionStorage.setItem("TYPE", type);

            txtTitle.innerHTML = "שלום " + name;

            if (type === "student") {
                btnMeetings.style.display = "block";
            }
            if (type === "teacher") {
                btnMeetings.style.display = "block";
                btnClasses.style.display = "block";
            }
            if (type === "admin") {
                btnMeetings.style.display = "block";
                btnClasses.style.display = "block";
                btnTeachers.style.display = "block";
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
    });

    sessionStorage.setItem("PREVEMAIL", email);
}

btnMeetings.addEventListener("click", e => {
    location.href = "meetings.html";
});

btnClasses.addEventListener("click", e => {
    if (!(type === "student")) {
        location.href = "classes.html";
    }
});

btnTeachers.addEventListener("click", e => {
    if (type === "admin") {
        sessionStorage.setItem("CLASS", "מורים");
        location.href = "class.html";
    }
});

btnPass.onclick = function () {
    inputTxtOld.style.display = "block";
    inputOld.style.display = "block";
    inputTxt.style.display = "block";
    input.style.display = "block";
    inputTxt2.style.display = "block";
    input2.style.display = "block";
    btnSub.style.display = "block";

    btnSub.onclick = function () {
        var user = firebase.auth().currentUser;
        var newPassword = input.value;
        var credential = firebase.auth.EmailAuthProvider.credential(user.email, inputOld.value);

        user.reauthenticateWithCredential(credential).then(function () {
            // User re-authenticated.
            if (newPassword === input2.value) {
                user.updatePassword(newPassword).then(function () {
                    // Update successful.
                    inputTxt.innerHTML = "הסיסמה שונתה בהצלחה!"
                    input.style.display = "none";
                    btnSub.style.display = "none";
                    inputTxtOld.style.display = "none";
                    inputOld.style.display = "none";
                    inputTxt2.style.display = "none";
                    input2.style.display = "none";
                }).catch(function (error) {
                    // An error happened.
                    alert(error.message);
                });
            } else {
                alert("הסיסמאות החדשות לא תואמות!");
            }
        }).catch(function (error) {
            // An error happened.
            alert(error.message);
        });
    };
};

window.addEventListener('storage', function (e) {
    if (e.storageArea === sessionStorage) {
        alert("האתר זיהה ניסיון חשוד לשינוי פרטים!");
        sessionStorage.clear();
        location.href = "index.html"
    }
});