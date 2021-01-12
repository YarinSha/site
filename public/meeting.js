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
const div = document.getElementById("div");

const name = sessionStorage.getItem("NAME");
const type = sessionStorage.getItem("TYPE");

const meetingName = sessionStorage.getItem("MEETING");
const UDF = sessionStorage.getItem("U/D/F");

title.innerHTML = meetingName.split(".")[0].replace("&", " - ");

if (UDF === "U") {
    storageRef.child("Meetings/Upcoming/" + meetingName).getDownloadURL()
        .then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function (event) {
                var blob = xhr.response;
                blob.text().then(t => {
                    if (type === "student" || type === "admin") {
                        let txt = document.createElement("h3");
                        txt.innerHTML = "הפגישה עוד לא נעשתה";

                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txt);
                    }
                    if (type === "teacher") {
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
                            loadTxt.innerHTML = "יוצר את הפגישה... נא לא לצאת מהמסך!";
                            document.body.appendChild(loadTxt);

                            var arr = t.split("&&");
                            var txt = arr[0] + "&&" + arr[1] + "&&" + arr[2] + "&&" + arr[3] + "&&"
                                + arr[4] + "&&" + input.value + "&&";
                            var blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
                            storageRef.child('Meetings/Done/' + meetingName).put(blob)
                                .then(function () {
                                    storageRef.child("Meetings/Upcoming/" + meetingName).delete()
                                        .then(function () {
                                            titleTxt.innerHTML = "המשוב הוזן בהצלחה!"
                                            input.style.display = "none";
                                            btn.style.display = "none";
                                            loadTxt.style.display = "none";
                                        });
                                });
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
                            loadTxt.innerHTML = "יוצר את הפגישה... נא לא לצאת מהמסך!";
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
                    if (type === "teacher") {
                        let txt = document.createElement("h3");
                        txt.innerHTML = "הפגישה נעשתה";

                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txt);
                    }
                    if (type === "admin") {
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
                    if (type === "student" || type === "teacher") {
                        let txt = document.createElement("h3");
                        txt.innerHTML = "הפגישה נעשתה";

                        div.appendChild(document.createTextNode(t.split("&&")[2] + " - " + t.split("&&")[3]));
                        div.appendChild(document.createElement("br"));
                        div.appendChild(txt);
                    }
                    if (type === "admin") {
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