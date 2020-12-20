(function() {
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

    // Add login event
    btnNext.addEventListener("click", e => {
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
            var errorMessage = error.message;
            alert(errorMessage);
          });
    })
}());