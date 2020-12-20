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
    var db = firebase.firestore();

    const txtEmail = document.getElementById("email");
    const txtName = document.getElementById("name");
    const txtType = document.getElementById("type");

    const email = sessionStorage.getItem("EMAIL");

    if(email) {
        txtEmail.innerHTML = email;
    }

    var docRef = db.collection("users").doc(email);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            txtName.innerHTML = doc.data().name;
            txtType.innerHTML = doc.data().type;
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
}());