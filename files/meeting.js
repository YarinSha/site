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

const title = document.getElementById("title");
const div = document.getElementById("div");

const name = sessionStorage.getItem("NAME");
const type = sessionStorage.getItem("TYPE");

const meetingName = sessionStorage.getItem("MEETING");
const UDF = sessionStorage.getItem("U/D/F");

const otherMeet = sessionStorage.getItem("otherMeet");

const student = meetingName.split(".")[0].split("&")[0];
const teacher = meetingName.split(".")[0].split("&")[1];

var email = "";
db.collection("users").where("name", "==", student).get()
    .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            email = doc.id;
        });
    })
    .catch(function (error) {
        console.log("Error getting documents: ", error);
    });

title.innerHTML = meetingName.split(".")[0].replace("&", " - ");

if (UDF === "U") {
    storageRef.child("Meetings/Upcoming/" + meetingName).getDownloadURL()
        .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                var blob = xhr.response;
                blob.text().then(t => {
                    if (type === "student" || ((type === "admin" || type === "teacher") && !meetingName.includes(name))) {
                        let txt = document.createElement("h3");
                        txt.innerHTML = "הפגישה עוד לא נעשתה";

                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txt);
                    }
                    if ((type === "admin" || type === "teacher") && meetingName.includes(name)) {
                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));

                        div.appendChild(document.createElement("br"));

                        let titleTxt = document.createElement("h3");
                        titleTxt.innerHTML = "אנא שלח כשהפגישה בוצעה וצרף משוב:";
                        div.appendChild(titleTxt);

                        var input = document.createElement("textarea");
                        input.cols = 40;
                        input.rows = 10;
                        div.appendChild(input);

                        div.appendChild(document.createElement("br"));
                        div.appendChild(document.createElement("br"));

                        var btn = document.createElement("button");
                        btn.innerHTML = "שליחה";
                        div.appendChild(btn);

                        btn.onclick = function () {
                            var loadTxt = document.createElement("h4");
                            loadTxt.innerHTML = "מזין את המשוב... נא לא לצאת מהמסך!";
                            document.body.appendChild(loadTxt);

                            var arr = t.split("&&");
                            var txt = arr[0] + "&&" + arr[1] + "&&" + arr[2] + "&&" + arr[3] + "&&"
                                + arr[4] + "&&" + input.value + "&&";
                            var blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
                            storageRef.child('Meetings/Done/' + meetingName).put(blob)
                                .then(function () {
                                    storageRef.child("Meetings/Upcoming/" + meetingName).delete()
                                        .then(function () {
                                            if (email.includes("@")) {
                                                storageRef.child('Emails/' + email + ".txt").put(blob)
                                                    .then(function () {
                                                        titleTxt.innerHTML = "המשוב הוזן בהצלחה!"
                                                        input.style.display = "none";
                                                        btn.style.display = "none";
                                                        loadTxt.style.display = "none";
                                                        btnEdit.style.display = "none";
                                                    });
                                            } else {
                                                titleTxt.innerHTML = "המשוב הוזן בהצלחה!"
                                                input.style.display = "none";
                                                btn.style.display = "none";
                                                loadTxt.style.display = "none";
                                                btnEdit.style.display = "none";
                                            }
                                        });
                                });
                        }

                        var btnEdit = document.createElement("button");
                        btnEdit.innerHTML = "שינוי זמן הפגישה";
                        div.appendChild(btnEdit);

                        btnEdit.onclick = function () {
                            var date;
                            if (otherMeet && (otherMeet.split("&")[0] === meetingName.split("&")[0])) {
                                var ref = storageRef.child("Meetings/Upcoming/" + otherMeet);

                                ref.getDownloadURL()
                                    .then(function (url) {
                                        var xhr = new XMLHttpRequest();
                                        xhr.responseType = 'blob';
                                        xhr.onload = function (event) {
                                            var blob = xhr.response;
                                            blob.text().then(t => {
                                                var d = t.split("&&")[2];
                                                var ti = t.split("&&")[3];
                                                date = new Date(d.split("/")[2] + "-" + d.split("/")[1] + "-" + d.split("/")[0] + "T" + ti);
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

                            var inputTxt = document.createElement("h4");
                            inputTxt.innerHTML = "זמן חדש לפגישה:";
                            document.body.appendChild(inputTxt);

                            var input = document.createElement("input");
                            input.type = "datetime-local";
                            document.body.appendChild(input);

                            document.body.appendChild(document.createElement("br"));
                            document.body.appendChild(document.createElement("br"));

                            var btnSub = document.createElement("button");
                            btnSub.innerHTML = "שינוי";
                            btnSub.onclick = function () {
                                if (input.value) {
                                    var loadTxt = document.createElement("h4");
                                    loadTxt.innerHTML = "משנה את הפגישה... נא לא לצאת מהמסך!";
                                    document.body.appendChild(loadTxt);

                                    if (otherMeet && (otherMeet.split("&")[0] === meetingName.split("&")[0])) {
                                        var newDate = new Date(input.value);
                                        var diff = Math.abs(date - newDate) / (1000 * 60);
                                        console.log(diff);
                                        if (diff < 30) {
                                            alert("זמן זה תפוס, אנא בחר/י זמן אחר");
                                        } else {
                                            var txt = student + "&&" + teacher + "&&" + input.value.split("T")[0].split("-")[2] +
                                                "/" + input.value.split("T")[0].split("-")[1] + "/" + input.value.split("T")[0].split("-")[0] +
                                                "&&" + input.value.split("T")[1] + "&&&&&&";
                                            var blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
                                            storageRef.child('Meetings/Upcoming/' + student + "&" + teacher + ".txt").put(blob)
                                                .then(function (snapshot) {
                                                    if (email.includes("@")) {
                                                        storageRef.child("Emails/" + email + ".txt").put(blob)
                                                            .then(function (snapshot) {
                                                                inputTxt.innerHTML = "הפגישה שונתה בהצלחה!";
                                                                input.style.display = "none";
                                                                btnSub.style.display = "none";
                                                                loadTxt.style.display = "none";
                                                            });
                                                    } else {
                                                        inputTxt.innerHTML = "הפגישה שונתה בהצלחה!";
                                                        input.style.display = "none";
                                                        btnSub.style.display = "none";
                                                        loadTxt.style.display = "none";
                                                    }
                                                });
                                        }
                                    } else {
                                        var txt = student + "&&" + teacher + "&&" + input.value.split("T")[0].split("-")[2] +
                                            "/" + input.value.split("T")[0].split("-")[1] + "/" + input.value.split("T")[0].split("-")[0] +
                                            "&&" + input.value.split("T")[1] + "&&&&&&";
                                        var blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
                                        storageRef.child('Meetings/Upcoming/' + student + "&" + teacher + ".txt").put(blob)
                                            .then(function (snapshot) {
                                                if (email.includes("@")) {
                                                    storageRef.child("Emails/" + email + ".txt").put(blob)
                                                        .then(function (snapshot) {
                                                            inputTxt.innerHTML = "הפגישה שונתה בהצלחה!";
                                                            input.style.display = "none";
                                                            btnSub.style.display = "none";
                                                            loadTxt.style.display = "none";
                                                        });
                                                } else {
                                                    inputTxt.innerHTML = "הפגישה שונתה בהצלחה!";
                                                    input.style.display = "none";
                                                    btnSub.style.display = "none";
                                                    loadTxt.style.display = "none";
                                                }
                                            });
                                    }
                                } else {
                                    alert("לא בחרת זמן לפגישה!");
                                }
                            };
                            document.body.appendChild(btnSub);
                        }
                    }
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
if (UDF === "D") {
    storageRef.child("Meetings/Done/" + meetingName).getDownloadURL()
        .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                var blob = xhr.response;
                blob.text().then(t => {
                    if (type === "student") {
                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));

                        div.appendChild(document.createElement("br"));

                        let titleTxt = document.createElement("h3");
                        titleTxt.innerHTML = "אנא מלא משוב על הפגישה:";
                        let subTxt = document.createElement("p");
                        subTxt.innerHTML = "במידה ואתה לא מעוניין נא לשלוח ריק.";
                        div.appendChild(titleTxt);
                        div.appendChild(subTxt);

                        var input = document.createElement("textarea");
                        input.cols = 40;
                        input.rows = 10;
                        div.appendChild(input);

                        div.appendChild(document.createElement("br"));
                        div.appendChild(document.createElement("br"));

                        var btn = document.createElement("button");
                        btn.innerHTML = "שליחה";
                        div.appendChild(btn);

                        btn.onclick = function () {
                            var loadTxt = document.createElement("h4");
                            loadTxt.innerHTML = "מזין את המשוב... נא לא לצאת מהמסך!";
                            document.body.appendChild(loadTxt);

                            var arr = t.split("&&");
                            var txt = arr[0] + "&&" + arr[1] + "&&" + arr[2] + "&&" + arr[3] + "&&"
                                + input.value + "&&" + arr[5] + "&&";
                            var blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
                            storageRef.child('Meetings/Finished/' + meetingName).put(blob)
                                .then(function () {
                                    storageRef.child("Meetings/Done/" + meetingName).delete()
                                        .then(function () {
                                            titleTxt.innerHTML = "המשוב הוזן בהצלחה!"
                                            subTxt.style.display = "none";
                                            input.style.display = "none";
                                            btn.style.display = "none";
                                            loadTxt.style.display = "none";
                                        });
                                });
                        }
                    }
                    if (type === "teacher" || (type === "admin" && meetingName.includes(name))) {
                        let txt = document.createElement("h3");
                        txt.innerHTML = "הפגישה נעשתה";

                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txt);
                    }
                    if (type === "admin" && !meetingName.includes(name)) {
                        let txtS = document.createElement("h3");
                        txtS.innerHTML = "משוב תלמיד";
                        txtS.style.margin = 0;

                        let txtT = document.createElement("h3");
                        txtT.innerHTML = "משוב מורה";
                        txtT.style.margin = 0;

                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txtS);
                        div.appendChild(document.createTextNode("עוד לא הוזן משוב תלמיד."));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txtT);
                        div.appendChild(document.createTextNode(t.split("&&")[5]));
                    }
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
if (UDF === "F") {
    storageRef.child("Meetings/Finished/" + meetingName).getDownloadURL()
        .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                var blob = xhr.response;
                blob.text().then(t => {
                    if (type === "student" || type === "teacher" || (type === "admin" && meetingName.includes(name))) {
                        let txt = document.createElement("h3");
                        txt.innerHTML = "הפגישה נעשתה";

                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txt);
                    }
                    if (type === "admin" && !meetingName.includes(name)) {
                        let txtS = document.createElement("h3");
                        txtS.innerHTML = "משוב תלמיד";
                        txtS.style.margin = 0;

                        let txtT = document.createElement("h3");
                        txtT.innerHTML = "משוב מורה";
                        txtT.style.margin = 0;

                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txtS);
                        div.appendChild(document.createTextNode(t.split("&&")[4]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txtT);
                        div.appendChild(document.createTextNode(t.split("&&")[5]));
                    }
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

window.addEventListener('storage', function (e) {
    if (e.storageArea === sessionStorage) {
        alert("האתר זיהה ניסיון חשוד לשינוי פרטים!");
        sessionStorage.clear();
        location.href = "index.html"
    }
});