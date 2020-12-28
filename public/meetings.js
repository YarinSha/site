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

    storageRef.child("Meetings").listAll()
        .then(function (res) {
            res.prefixes.forEach(function (folderRef) {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
            });
            res.items.forEach(function (itemRef) {
                // All the items under listRef.
                if (itemRef.name.includes(name) || type === "admin") {
                    downloadFile(itemRef, type);
                }
            });
        })
        .catch(function (error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
}());

function downloadFile(file, type) {
    file.getDownloadURL()
        .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var blob = xhr.response;
                blob.text().then(t => {
                    console.log(t);
                    if (type === "student") {
                        var txtName = document.createTextNode(t.split("&&")[1]);
                    }
                    if (type === "teacher") {
                        var txtName = document.createTextNode(t.split("&&")[0]);
                    }
                    if (type === "admin") {
                        var txtName = document.createTextNode(t.split("&&")[0] + " - " + t.split("&&")[1]);
                    }

                    let txtDate = document.createTextNode(t.split("&&")[2]);
                    let txtTime = document.createTextNode(t.split("&&")[3]);

                    var row = table.insertRow();

                    row.insertCell().appendChild(txtName);
                    row.insertCell().appendChild(txtDate);
                    row.insertCell().appendChild(txtTime);
                    row.onclick = function(){
                        sessionStorage.setItem("MEETING", t);
                        location.href = "meeting.html";
                    };
                })
            };
            xhr.open('GET', url);
            xhr.send();
        })
        .catch(function (error) {
            // Handle any errors
            console.log(error);
        });
}