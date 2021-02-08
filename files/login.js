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

// Get elements
const userEmail = document.getElementById("userEmail");
const userPassword = document.getElementById("userPassword");
const btnNext = document.getElementById("btnNext");
const btnForget = document.getElementById("btnForget");
const inputTxt = document.getElementById("inputTxt");
const input = document.getElementById("input");
const btnSub = document.getElementById("btnSub");

inputTxt.style.display = "none";
input.style.display = "none";
btnSub.style.display = "none";

// Add login event
btnNext.addEventListener("click", e => {
    inputTxt.style.display = "none";
    input.style.display = "none";
    btnSub.style.display = "none";
    var loadTxt = document.createElement("h4");
    loadTxt.innerHTML = "מתחבר...";
    document.body.appendChild(loadTxt);
    // Get email and password
    const email = userEmail.value;
    const password = userPassword.value;
    const auth = firebase.auth();
    // Sign in
    auth.signInWithEmailAndPassword(email, password)
        .then((user) => {
            sessionStorage.setItem("EMAIL", user.user.email);
            location.href = "menu.html";
        })
        .catch((error) => {
            loadTxt.style.display = "none";
            var errorMessage = error.message;
            alert(errorMessage);
        });
});

btnForget.onclick = function () {
    inputTxt.innerHTML = "מייל לשחזור:"
    inputTxt.style.display = "block";
    input.style.display = "block";
    btnSub.style.display = "block";

    btnSub.onclick = function () {
        var emailAddress = input.value;

        firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
            // Email sent.
            inputTxt.innerHTML = "נשלח מייל לשחזור סיסמה"
            input.style.display = "none";
            btnSub.style.display = "none";
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