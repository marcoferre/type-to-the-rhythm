var c;
var data = {};
var buffer = {};

btnStartActx.onclick = function () {
    initializeEnvironment()
};

function initializeEnvironment() {
    c = new AudioContext()
    loadSamples("assets/media/samples/long-kick.wav", "kick");
    loadSamples("assets/media/samples/close-hihat.wav", "hihat");
    loadSamples("assets/media/samples/snare.wav", "snare");
    loadSamples("assets/media/samples/cow-bell.wav", "perc");
}

function resume() {
    c.resume();
}

btnBass.onclick = function () {
    playBass(55 * Math.pow(2, 2 / 12), 1);
}

btnPad.onclick = function () {
    playPad(110 * Math.pow(2, 2 / 12), 1);
}

btnLead.onclick = function () {
    playLead(440 * Math.pow(2, 2 / 12), 1);
}

btnKick.onclick = function () {
    playSample("kick");
}

btnSnare.onclick = function () {
    playSample("snare");
}

btnHats.onclick = function () {
    playSample("hihat");
}

btnPerc.onclick = function () {
    playSample("perc");
}

function playBass(f, duration) {
    let startTime = c.currentTime;

    const o1 = c.createOscillator();
    const o2 = c.createOscillator();
    const g1 = c.createGain();
    const g2 = c.createGain();
    const f1 = c.createBiquadFilter();
    o1.connect(g1);
    o2.connect(g2);
    g1.connect(f1);
    g2.connect(f1);
    f1.connect(c.destination)

    f1.frequency.value = 5000;
    g1.gain.value = 0.5;
    g2.gain.value = 0.5;
    o1.type = "sawtooth"
    o2.type = "triangle"
    o1.frequency.value = f;
    o2.frequency.value = 2 * f;
    f1.frequency.exponentialRampToValueAtTime(100, startTime + duration / 2)

    o1.start();
    o2.start();

    g1.gain.setValueAtTime(0, startTime);
    g1.gain.linearRampToValueAtTime(0.5, startTime + duration / 24);
    g1.gain.linearRampToValueAtTime(0, startTime + duration)
    g2.gain.setValueAtTime(0, startTime);
    g2.gain.linearRampToValueAtTime(0.5, startTime + duration / 24);
    g2.gain.linearRampToValueAtTime(0, startTime + duration)
}

function playPad(f, duration) {
    let startTime = c.currentTime;

    const o1 = c.createOscillator();
    const o2 = c.createOscillator();
    const g1 = c.createGain();
    const g2 = c.createGain();
    const f1 = c.createBiquadFilter();
    o1.connect(g1);
    o2.connect(g2);
    g1.connect(f1);
    g2.connect(f1);
    f1.connect(c.destination)

    f1.frequency.value = 100;
    g1.gain.value = 0.5;
    g2.gain.value = 0.5;
    o1.type = "sawtooth"
    o2.type = "sawtooth"
    o1.frequency.value = f;
    o2.frequency.value = f + 5;
    f1.frequency.exponentialRampToValueAtTime(2500, startTime + duration / 12)

    o1.start();
    o2.start();

    g1.gain.setValueAtTime(0, startTime);
    g1.gain.linearRampToValueAtTime(0.5, startTime + duration / 24);
    g1.gain.linearRampToValueAtTime(0, startTime + duration)
    g2.gain.setValueAtTime(0, startTime);
    g2.gain.linearRampToValueAtTime(0.5, startTime + duration / 24);
    g2.gain.linearRampToValueAtTime(0, startTime + duration)
}

function playLead(f, duration) {
    let startTime = c.currentTime;

    const o1 = c.createOscillator();
    const o2 = c.createOscillator();
    const g1 = c.createGain();
    const g2 = c.createGain();
    const f1 = c.createBiquadFilter();
    o1.connect(g1);
    o2.connect(g2);
    g1.connect(f1);
    g2.connect(f1);
    f1.connect(c.destination)

    f1.frequency.value = 1500;
    f1.q = 50;
    f1.type = "lowpass";
    g1.gain.value = 0.1;
    g2.gain.value = 0.5;
    o1.type = "sawtooth"
    o2.type = "triangle"
    o1.frequency.value = 2 * f;
    o2.frequency.value = 4 * f;
    //f1.frequency.exponentialRampToValueAtTime(2500, startTime + duration / 12)

    o1.start();
    o2.start();

    g1.gain.setValueAtTime(0, startTime);
    g1.gain.linearRampToValueAtTime(0.3, startTime + duration / 64);
    g1.gain.linearRampToValueAtTime(0, startTime + duration)
    g2.gain.setValueAtTime(0, startTime);
    g2.gain.linearRampToValueAtTime(0.5, startTime + duration / 64);
    g2.gain.linearRampToValueAtTime(0, startTime + duration)
}


function loadSamples(filename, sample) {
    console.log("loading")
    const request = new XMLHttpRequest();
    request.open("GET", filename);
    request.responseType = "arraybuffer";
    request.onload = function () {
        let undecodedAudio = request.response;
        c.decodeAudioData(undecodedAudio, (data) => buffer[sample] = data);
        console.log(buffer);
    };
    request.send();
}

function playSample(sample) {
    const source = c.createBufferSource();
    source.buffer = buffer[sample];
    source.connect(c.destination);
    source.start();
}

