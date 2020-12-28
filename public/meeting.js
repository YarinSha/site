(function () {
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

    const title = document.getElementById("title");
    const student = document.getElementById("student");
    const teacher = document.getElementById("teacher");
    const admin = document.getElementById("admin");

    const name = sessionStorage.getItem("NAME");
    const type = sessionStorage.getItem("TYPE");
    console.log(name, type);

    const meeting = sessionStorage.getItem("MEETING");

    if (type === "student") {

    }
    if (type === "teacher") {
        
    }
    if (type === "admin") {
        title.innerHTML = meeting.split("&&")[0] + " - " + meeting.split("&&")[1];

        let txtS = document.createElement("h3");
        txtS.innerHTML = "משוב תלמיד";
        txtS.style.margin = 0;

        let txtT = document.createElement("h3");
        txtT.innerHTML = "משוב מורה";
        txtT.style.margin = 0;

        admin.appendChild(document.createTextNode(meeting.split("&&")[2] + " - " + meeting.split("&&")[3]));
        admin.appendChild(document.createElement("br"));
        admin.appendChild(document.createElement("br"));
        admin.appendChild(txtS);
        admin.appendChild(document.createTextNode(meeting.split("&&")[4]));
        admin.appendChild(document.createElement("br"));
        admin.appendChild(document.createElement("br"));
        admin.appendChild(txtT);
        admin.appendChild(document.createTextNode(meeting.split("&&")[5]));
    }
}());