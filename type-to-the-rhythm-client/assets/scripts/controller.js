var count = 0;
var bpm = 80 * 4;
var messageStack = [{
    from: "Steven Wilson",
    text: "one of the wonder of the world going",
}]
var db
var message
var trackSteps, steps, bar = 0
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`˜!.@#$%^&*()-_=+;\\|{}[] \":/?><".split("")
const pitch = [-24, null, null, null, -17, null, -15, null, -13, -21, null, -19, -22, -5, -9, null, -7, -1, null, null, -3, null, null, null, -12, -24, null, null, null, -17, null, -15, null, -13, -21, null, -19, -22, -5, -9, null, -7, -1, null, null, -3, null, null, null, -12]
//                a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z
const triggerK = [1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0]
const triggerS = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1]
const triggerH = [0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1, 0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1]
const triggerP = [0, 0, 1, 0, 2, 1, 3, 0, 0, 3, 0, 5, 4, 4, 0, 0, 1, 5, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 1, 0, 2, 1, 3, 0, 0, 3, 0, 5, 4, 4, 0, 0, 1, 5, 0, 0, 0, 2, 2, 0, 2, 0]

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

function getFrequency(semitones){
    return 440 * Math.pow(2, semitones/12);
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

        if (trackSteps[0].innerText !== "" && pitch[alphabet.indexOf(trackSteps[0].innerText)] != null) playBass(getFrequency(pitch[alphabet.indexOf(trackSteps[0].innerText)])/4, 1)
        if (trackSteps[4].innerText !== "" && pitch[alphabet.indexOf(trackSteps[4].innerText)] != null) playPad(getFrequency(pitch[alphabet.indexOf(trackSteps[4].innerText)])/2, 0.5)
        if (trackSteps[5].innerText !== "" && pitch[alphabet.indexOf(trackSteps[5].innerText)] != null) playLead(getFrequency(pitch[alphabet.indexOf(trackSteps[5].innerText)]), 0.5)
        if (triggerK[alphabet.indexOf(trackSteps[1].innerText)] === 1 && trackSteps[1].innerText !== "") playSample("short-kick")
        if (triggerS[alphabet.indexOf(trackSteps[2].innerText)] === 1 && trackSteps[2].innerText !== "") playSample("snare")
        if (triggerH[alphabet.indexOf(trackSteps[3].innerText)] === 1 && trackSteps[3].innerText !== "") playSample("close-hihat")
        if (triggerH[alphabet.indexOf(trackSteps[3].innerText)] === 2 && trackSteps[3].innerText !== "") playSample("open-hihat")
        if (triggerP[alphabet.indexOf(trackSteps[7].innerText)] !== 0 && trackSteps[7].innerText !== "") playSample("perc")

        if (count++ % 16 === 15) bar++;
        console.log("bar " + bar)
        if (bar === 4) {
            nextMessage()
            bar = 0;
        }

    }, 60 / bpm * 1000)
}