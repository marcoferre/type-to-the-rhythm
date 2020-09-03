var count = 0;
var bpm = 80 * 4;
var messageStack = [{
    from: "Renato Bresciani",

    text: "Good morning Boss, sorry I am Late!",
}]
var db
var message
var trackSteps, steps, bar = 0
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`˜!.@#$%^&*()-_=+;\\|{}[] \":/?><".split("")

const pitch = [-24, null, null, null, -17, null, -14, null, -13, -21, null, -19, -22, -6, -9, null, -7, -1, null, null, -3, null, null, null, -12, null, -24, null, null, null, -17, null, -15, null, -13, -21, null, -19, -22, -5, -9, null, -7, -1, null, null, -3, null, null, null, -12, null]

const triggerK = [1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0]
const triggerS = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1]
const triggerH = [0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1, 0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1]
const triggerF = [0, 55, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1, 0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1]
const triggerP = [0, 0, 1, 0, 2, 1, 3, 0, 0, 3, 0, 5, 4, 4, 0, 0, 1, 5, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 1, 0, 2, 1, 3, 0, 0, 3, 0, 5, 4, 4, 0, 0, 1, 5, 0, 0, 0, 2, 2, 0, 2, 0]

btnstart.onclick = function(){
    if(btnstart.innerText === "start the machine"){
        Start()
        btnstart.innerText = "stop"
    } else {
        Stop()
    }

}

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

function getScale(datetime) {
    let date = new Date(datetime);
    let time = date.toLocaleTimeString()
    console.log(time)
    if (time < '08:00:00') {
        return "locrian";
    } else if (time < '11:00:00') {
        return "dorian";
    } else if (time < '14:00:00') {
        return "ionian";
    } else if (time < '17:00:00') {
        return "mixolydian";
    } else if (time < '20:00:00') {
        return "lydian";
    } else if (time < '24:00:00') {
        return "phrygian";
    } else if (time < '04:00:00') {
        return "aeolian";
    }
}

function getMessages() {
    db.collection("messages").where("read", "==", "N").orderBy("datetime", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            messageStack.push(doc.data())
            //db.collection('messages').doc(doc.id).update({
            //    read: "Y"
            //});
        });
    });
    console.log(messageStack)
}

function nextMessage() {

    if (messageStack.length > 0) {
        nameMessage.innerText = messageStack[0].from
        textMessage.innerText = "\"" + messageStack[0].text + "\""

        message = messageStack[0].text.replace("  ", " ").split(" ");

        trackSteps = document.querySelectorAll(".track-step")
        trackSteps.forEach(e => e.innerText = "")

        steps = new Array(message.length).fill(0)

        messageStack.splice(0, 1);
    } else {
        console.log("no messages");
    }
    getMessages();
}

function Start() {
    startCtx()
    nextMessage();
    setInterval(function () {

        for (let i = 0; i < message.length; i++) {
            trackSteps[i].innerText = message[i][steps[i]];
            steps[i] = (steps[i] + 1) % message[i].length;
        }

        if (trackSteps[0].innerText !== "" && pitch[ALPHABET.indexOf(trackSteps[0].innerText)] != null) playBass(getFrequency(pitch[ALPHABET.indexOf(trackSteps[0].innerText)]) / 4, 1, (ALPHABET.indexOf(trackSteps[0].innerText) < 26) ? 2000 : 5000)
        if (trackSteps[4].innerText !== "" && pitch[ALPHABET.indexOf(trackSteps[4].innerText)] != null) playPad(getFrequency(pitch[ALPHABET.indexOf(trackSteps[4].innerText)]) / 2, 0.5, (ALPHABET.indexOf(trackSteps[4].innerText) < 26) ? 2500 : 4000)
        if (trackSteps[5].innerText !== "" && pitch[ALPHABET.indexOf(trackSteps[5].innerText)] != null) playLead(getFrequency(pitch[ALPHABET.indexOf(trackSteps[5].innerText)]), 0.5, (ALPHABET.indexOf(trackSteps[5].innerText) < 26) ? 1500 : 4000)
        if (triggerK[ALPHABET.indexOf(trackSteps[1].innerText)] === 1 && trackSteps[1].innerText !== "") playSample("short-kick")
        if (triggerS[ALPHABET.indexOf(trackSteps[2].innerText)] === 1 && trackSteps[2].innerText !== "") playSample("snare")
        if (triggerH[ALPHABET.indexOf(trackSteps[3].innerText)] === 1 && trackSteps[3].innerText !== "") playSample("close-hihat")
        if (triggerH[ALPHABET.indexOf(trackSteps[3].innerText)] === 2 && trackSteps[3].innerText !== "") playSample("open-hihat")
        if (triggerP[ALPHABET.indexOf(trackSteps[7].innerText)] === 1 && trackSteps[7].innerText !== "") playSample("clap")
        if (triggerP[ALPHABET.indexOf(trackSteps[7].innerText)] === 2 && trackSteps[7].innerText !== "") playSample("cow-bell")
        if (triggerP[ALPHABET.indexOf(trackSteps[7].innerText)] === 3 && trackSteps[7].innerText !== "") playSample("hi-tom")
        if (triggerP[ALPHABET.indexOf(trackSteps[7].innerText)] === 4 && trackSteps[7].innerText !== "") playSample("low-tom")
        if (triggerP[ALPHABET.indexOf(trackSteps[7].innerText)] === 5 && trackSteps[7].innerText !== "") playSample("crash")

        if (count++ % 16 === 15) bar++;
        console.log("bar " + bar)
        if (bar === 4) {
            nextMessage()
            bar = 0;
        }

    }, 60 / bpm * 1000)
}

function Stop(){
    Resume()
    location.reload();
}