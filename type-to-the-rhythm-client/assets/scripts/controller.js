var count = 0;
var bpm = 60;
var messageStack = [{
    from: "Steven Wilson",
    text: "one of the wonder of the world",
}]
var db
var message
var trackSteps, steps, bar = 0
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`˜!.@#$%^&*()-_=+;\\|{}[] \":/?><".split("")
const pitch = ""
console.log(alphabet)

btnstart.onclick = start

dbConnection()
getMessages()

function dbConnection() {
// Initialize Cloud Firestore through Firebase
    var firebaseConfig = {
        apiKey: "AIzaSyBECI5dbr3ubloAtShFvTv45Mla8Cme9TM",
        authDomain: "type-to-the-rhythm.firebaseapp.com",
        databaseURL: "https://type-to-the-rhythm.firebaseio.com",
        projectId: "type-to-the-rhythm",
        storageBucket: "type-to-the-rhythm.appspot.com",
        messagingSenderId: "1037004375832",
        appId: "1:1037004375832:web:f3f3ba4f7e7e103161c06d",
        measurementId: "G-CPMNY90E2T"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    db = firebase.firestore();
}

function getMessages() {

    db.collection("messages").where("read", "==", "N").orderBy("datetime", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            messageStack.push(doc.data())
            db.collection('messages').doc(doc.id).update({
                read: "Y"
            });
        });
    });
    console.log(messageStack)
}

function nextMessage() {

    if (messageStack.length > 0) {
        nameMessage.innerText = messageStack[0].from
        textMessage.innerText = "\"" + messageStack[0].text + "\""

        message = messageStack[0].text.split(" ");

        trackSteps = document.querySelectorAll(".track-step")
        trackSteps.forEach(e => e.innerText = "")

        steps = new Array(message.length).fill(0)

        messageStack.splice(0, 1);
    } else {
        console.log("no messages");
    }
    getMessages();
}

function start() {
    nextMessage();
    setInterval(function () {

        for (let i = 0; i < message.length; i++) {
            trackSteps[i].innerText = message[i][steps[i]];
            steps[i] = (steps[i] + 1) % message[i].length;
        }

        if(message[2][steps[2] - 1] === "e") playSample("snare")


        if (count++ % 16 === 15) bar++;
        console.log("bar " + bar)
        if (bar === 2) {
            nextMessage()
            bar = 0;
        }

    }, 60 / bpm * 1000)
}