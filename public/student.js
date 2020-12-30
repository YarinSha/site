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
    const tableUpcoming = document.getElementById("tableUpcoming");
    const tableDone = document.getElementById("tableDone");

    const name = sessionStorage.getItem("NAME");
    const type = sessionStorage.getItem("TYPE");
    const of = sessionStorage.getItem("OF");
    console.log(name, type, of);

    title.innerHTML = of;

    // TODO if meetingNum = 2 or there is a meeting with this teacher
    if (type === "teacher") {
        var btn = document.createElement("button");
        btn.innerHTML = "קביעת פגישה";
        btn.onclick = function () {
            newMeeting(of, name, storageRef, btn);
        };
        document.body.appendChild(btn);
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
                    txtName = document.createTextNode(itemRef.name.split(".")[0]);
                    var row = tableUpcoming.insertRow();
                    row.insertCell().appendChild(txtName);
                    row.onclick = function () {
                        sessionStorage.setItem("MEETING", itemRef.name);
                        sessionStorage.setItem("U/D", "U");
                        location.href = "meeting.html";
                    };
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
                    txtName = document.createTextNode(itemRef.name.split(".")[0]);
                    var row = tableDone.insertRow();
                    row.insertCell().appendChild(txtName);
                    row.onclick = function () {
                        sessionStorage.setItem("MEETING", itemRef.name);
                        sessionStorage.setItem("U/D", "D");
                        location.href = "meeting.html";
                    };
                }
            });
        })
        .catch(function (error) {
            // Uh-oh, an error occurred!
            console.log(error);
        });
}());

function newMeeting (student, teacher, storageRef, btn) {
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
        if(input.value) {
            var txt = student + "&&" + teacher + "&&" + input.value.split("T")[0].split("-")[2] +
            "/" + input.value.split("T")[0].split("-")[1] + "/" + input.value.split("T")[0].split("-")[0] +
            "&&" + input.value.split("T")[1] + "&&&&&&";
            console.log(txt);
            var blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
            storageRef.child('Meetings/Upcoming/' + student + " - " + teacher + ".txt").put(blob);
            // TODO send an email
            inputTxt.innerHTML = "הפגישה נקבעה בהצלחה!";
            input.style.display = "none";
            btnSub.style.display = "none";
            btn.style.display = "none";
        }
        else {
            alert("לא בחרת זמן לפגישה!");
        }
    };
    document.body.appendChild(btnSub);
}