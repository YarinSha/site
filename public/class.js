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

    const pageTitle = document.getElementById("pageTitle");
    const title = document.getElementById("title");
    const table = document.getElementById("table");

    const name = sessionStorage.getItem("NAME");
    const type = sessionStorage.getItem("TYPE");
    const className = sessionStorage.getItem("CLASS");
    console.log(name, type, className);

    pageTitle.innerHTML = className;
    title.innerHTML = className;

    storageRef.child("Classes").listAll()
        .then(function (res) {
            res.prefixes.forEach(function (folderRef) {
                // All the prefixes under listRef.
                // You may call listAll() recursively on them.
            });
            res.items.forEach(function (itemRef) {
                // All the items under listRef.
                if (itemRef.name.includes(className)) {
                    downloadFile(itemRef, table);
                }
            });
        })
        .catch(function (error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
}());

function downloadFile(file, table) {
    file.getDownloadURL()
        .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                var blob = xhr.response;
                blob.text().then(t => {
                    console.log(t);
                    
                    for (i = 0; i < t.split("&&").length - 1; i++) {
                        let txtName = document.createTextNode(t.split("&&")[i].split("==")[0]);
                        let txtMeetings = document.createTextNode(t.split("&&")[i].split("==")[1] + "/2");
                        var row = table.insertRow();
                        row.insertCell().appendChild(txtName);
                        row.insertCell().appendChild(txtMeetings);
                        row.onclick = function () {
                            sessionStorage.setItem("OF", txtName.nodeValue);
                            sessionStorage.setItem("NUM", txtMeetings.nodeValue);
                            location.href = "student.html";
                        };
                    }
                });
            };
            xhr.open('GET', url);
            xhr.send();
        })
        .catch(function (error) {
            // Handle any errors
            console.log(error);
        });
}