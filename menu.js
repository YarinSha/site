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

    const txtTitle = document.getElementById("title");
    const btnMeetings = document.getElementById("btnMeetings");
    const btnClasses = document.getElementById("btnClasses");
    const btnTeachers = document.getElementById("btnTeachers");

    const email = sessionStorage.getItem("EMAIL");
    var name, type;

    var docRef = db.collection("users").doc(email);

    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            name = doc.data().name;
            type = doc.data().type;
            txtTitle.innerHTML = "שלום " + name;
            if (type === "student") {
                btnClasses.style.display = "none";
                btnTeachers.style.display = "none";
            }
            if (type === "teacher") {
                btnTeachers.style.display = "none";
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

    // TODO onclick listeners
}());