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
var db = firebase.firestore();

const pageTitle = document.getElementById("pageTitle");
const title = document.getElementById("title");
const tableUpcoming = document.getElementById("tableUpcoming");
const tableDone = document.getElementById("tableDone");
const tableFinished = document.getElementById("tableFinished");

const name = sessionStorage.getItem("NAME");
const type = sessionStorage.getItem("TYPE");
const of = sessionStorage.getItem("OF");
const num = parseInt(sessionStorage.getItem("NUM"));
const className = sessionStorage.getItem("CLASS");

pageTitle.innerHTML = of;
title.innerHTML = of;

var email = "";
db.collection("users").where("name", "==", of).get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            email = doc.id;
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

if (type === "teacher" && num < 2) {
    var btn = document.createElement("button");
    btn.innerHTML = "קביעת פגישה";
    btn.onclick = function () {
        newMeeting(of, name, storageRef, btn, className, email);
    };
    setTimeout(() => { document.body.appendChild(btn) }, 2000);
}

storageRef.child("Meetings/Upcoming").listAll()
    .then(function (res) {
        res.prefixes.forEach(function (folderRef) {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });
        res.items.forEach(function (itemRef) {
            // All the items under listRef.
            if (itemRef.name.includes(of)) {
                txtName = document.createTextNode(itemRef.name.split(".")[0].replace("&", " - "));
                var row = tableUpcoming.insertRow();
                row.insertCell().appendChild(txtName);
                row.onclick = function () {
                    sessionStorage.setItem("MEETING", itemRef.name);
                    sessionStorage.setItem("U/D/F", "U");
                    location.href = "meeting.html";
                };
                if (itemRef.name.includes(name)) {
                    btn.style.display = "none";
                }
            }
        });
    })
    .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });

storageRef.child("Meetings/Done").listAll()
    .then(function (res) {
        res.prefixes.forEach(function (folderRef) {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });
        res.items.forEach(function (itemRef) {
            // All the items under listRef.
            if (itemRef.name.includes(of)) {
                txtName = document.createTextNode(itemRef.name.split(".")[0].replace("&", " - "));
                var row = tableDone.insertRow();
                row.insertCell().appendChild(txtName);
                row.onclick = function () {
                    sessionStorage.setItem("MEETING", itemRef.name);
                    sessionStorage.setItem("U/D/F", "D");
                    location.href = "meeting.html";
                };
                if (itemRef.name.includes(name)) {
                    btn.style.display = "none";
                }
            }
        });
    })
    .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });

storageRef.child("Meetings/Finished").listAll()
    .then(function (res) {
        res.prefixes.forEach(function (folderRef) {
            // All the prefixes under listRef.
            // You may call listAll() recursively on them.
        });
        res.items.forEach(function (itemRef) {
            // All the items under listRef.
            if (itemRef.name.includes(of)) {
                txtName = document.createTextNode(itemRef.name.split(".")[0].replace("&", " - "));
                var row = tableFinished.insertRow();
                row.insertCell().appendChild(txtName);
                row.onclick = function () {
                    sessionStorage.setItem("MEETING", itemRef.name);
                    sessionStorage.setItem("U/D/F", "F");
                    location.href = "meeting.html";
                };
                if (itemRef.name.includes(name)) {
                    btn.style.display = "none";
                }
            }
        });
    })
    .catch(function (error) {
        // Uh-oh, an error occurred!
        console.log(error);
    });

function newMeeting(student, teacher, storageRef, btn, className, email) {
    var inputTxt = document.createElement("h4");
    inputTxt.innerHTML = "זמן הפגישה:";
    document.body.appendChild(inputTxt);

    var input = document.createElement("input");
    input.type = "datetime-local";
    document.body.appendChild(input);

    document.body.appendChild(document.createElement("br"));
    document.body.appendChild(document.createElement("br"));

    var btnSub = document.createElement("button");
    btnSub.innerHTML = "קביעה";
    btnSub.onclick = function () {
        if (input.value) {
            var loadTxt = document.createElement("h4");
            loadTxt.innerHTML = "יוצר את הפגישה... נא לא לצאת מהמסך!";
            document.body.appendChild(loadTxt);

            var txt = student + "&&" + teacher + "&&" + input.value.split("T")[0].split("-")[2] +
                "/" + input.value.split("T")[0].split("-")[1] + "/" + input.value.split("T")[0].split("-")[0] +
                "&&" + input.value.split("T")[1] + "&&&&&&";
            var blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
            storageRef.child('Meetings/Upcoming/' + student + "&" + teacher + ".txt").put(blob)
                .then(function (snapshot) {
                    storageRef.child("Emails/" + email + ".txt").put(blob)
                        .then(function (snapshot) {
                            updateMeetings(storageRef, className, inputTxt, input, btnSub, btn, loadTxt);
                        });
                });
        }
        else {
            alert("לא בחרת זמן לפגישה!");
        }
    };
    document.body.appendChild(btnSub);
}

function updateMeetings(storageRef, className, inputTxt, input, btnSub, btn, loadTxt) {
    var n = 0;
    storageRef.child("Classes").listAll()
        .then(function (res) {
            res.items.forEach(function (classRef) {
                // All the items under listRef.
                if (classRef.name.includes("Teachers") || classRef.name.includes(className)) {
                    var classTxt = "";
                    classRef.getDownloadURL()
                        .then(function (url) {
                            var xhr = new XMLHttpRequest();
                            xhr.responseType = 'blob';
                            xhr.onload = function (event) {
                                var blob = xhr.response;
                                blob.text().then(t => {
                                    t.split("&&").forEach(function (txt) {
                                        if (txt.includes("==")) {
                                            const sName = txt.split("==")[0];
                                            var num = 0;

                                            storageRef.child("Meetings").listAll()
                                                .then(function (resF) {
                                                    resF.prefixes.forEach(function (folderRef) {
                                                        // All the prefixes under listRef.
                                                        // You may call listAll() recursively on them.
                                                        folderRef.listAll()
                                                            .then(function (res) {
                                                                res.items.forEach(function (itemRef) {
                                                                    // All the items under listRef.
                                                                    if (itemRef.name.includes(sName)) {
                                                                        num++;
                                                                    }
                                                                });
                                                                if (folderRef.name === resF.prefixes[2].name) {
                                                                    classTxt = classTxt.concat(sName + "==" + num + "&&");
                                                                    if (classTxt.split("&&").length === t.split("&&").length) {
                                                                        var blob = new Blob([classTxt], { type: "text/plain;charset=utf-8" });
                                                                        storageRef.child(classRef.fullPath).put(blob)
                                                                            .then(function (snapshot) {
                                                                                n++;
                                                                                if (n == 2) {
                                                                                    inputTxt.innerHTML = "הפגישה נקבעה בהצלחה!";
                                                                                    input.style.display = "none";
                                                                                    btnSub.style.display = "none";
                                                                                    btn.style.display = "none";
                                                                                    loadTxt.style.display = "none";
                                                                                }
                                                                            });
                                                                    }
                                                                }
                                                            })
                                                            .catch(function (error) {
                                                                // Uh-oh, an error occurred!
                                                                console.log(error);
                                                            });
                                                    });
                                                })
                                                .catch(function (error) {
                                                    // Uh-oh, an error occurred!
                                                    console.log(error);
                                                });
                                        }
                                    });
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
            });
        })
        .catch(function (error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
}