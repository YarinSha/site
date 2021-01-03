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

    const table = document.getElementById("table");

    const name = sessionStorage.getItem("NAME");
    const type = sessionStorage.getItem("TYPE");
    console.log(name, type);

    storageRef.child("Classes").listAll()
        .then(function (res) {
            res.prefixes.forEach(function (folderRef) {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
            });
            res.items.forEach(function (itemRef) {
                // All the items under listRef.
                if (itemRef.name !== "Teachers.txt") {
                    let txtName = document.createTextNode(itemRef.name.split(".")[0]);
                        var row = table.insertRow();
                        row.insertCell().appendChild(txtName);
                        row.onclick = function(){
                            sessionStorage.setItem("CLASS", itemRef.name.split(".")[0]);
                            location.href = "class.html";
                        };
                }
            });
        })
        .catch(function (error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
}());