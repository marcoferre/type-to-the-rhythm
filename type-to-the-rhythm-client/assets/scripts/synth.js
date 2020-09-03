var c;
var data = {};
var buffer = {};

function startCtx () {
    initializeEnvironment()
};

function initializeEnvironment() {
    c = new AudioContext()
    loadSamples("assets/media/samples/short-kick.wav", "short-kick");
    loadSamples("assets/media/samples/long-kick.wav", "long-kick");
    loadSamples("assets/media/samples/open-hihat.wav", "open-hihat");
    loadSamples("assets/media/samples/close-hihat.wav", "close-hihat");
    loadSamples("assets/media/samples/snare.wav", "snare");
    loadSamples("assets/media/samples/cow-bell.wav", "cow-bell");
    loadSamples("assets/media/samples/hi-tom.wav", "hi-tom");
    loadSamples("assets/media/samples/low-tom.wav", "low-tom");
    loadSamples("assets/media/samples/crash.wav", "crash");
    loadSamples("assets/media/samples/clap.wav", "clap");
}

function Resume() {
    c.resume();
}

function playBass(freq, duration, filter) {
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

    f1.frequency.value = filter;
    g1.gain.value = 0.1;
    g2.gain.value = 0.1;
    o1.type = "sawtooth"
    o2.type = "triangle"
    o1.frequency.value = freq;
    o2.frequency.value = 2 * freq;
    f1.frequency.exponentialRampToValueAtTime(100, startTime + duration / 2)


    g1.gain.setValueAtTime(0, startTime);
    g1.gain.linearRampToValueAtTime(0.1, startTime + duration / 32);
    g1.gain.linearRampToValueAtTime(0, startTime + duration)
    g2.gain.setValueAtTime(0, startTime);
    g2.gain.linearRampToValueAtTime(0.1, startTime + duration / 32);
    g2.gain.linearRampToValueAtTime(0, startTime + duration)

    o1.start();
    o2.start();

}

function playPad(freq, duration, filter) {
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
    g1.gain.value = 0.1;
    g2.gain.value = 0.1;
    o1.type = "sawtooth"
    o2.type = "sawtooth"
    o1.frequency.value = freq;
    o2.frequency.value = freq + 5;
    f1.frequency.exponentialRampToValueAtTime(filter, startTime + duration / 12)

    o1.start();
    o2.start();

    g1.gain.setValueAtTime(0, startTime);
    g1.gain.linearRampToValueAtTime(0.1, startTime + duration / 24);
    g1.gain.linearRampToValueAtTime(0, startTime + duration)
    g2.gain.setValueAtTime(0, startTime);
    g2.gain.linearRampToValueAtTime(0.1, startTime + duration / 24);
    g2.gain.linearRampToValueAtTime(0, startTime + duration)
}

function playLead(freq, duration, filter) {
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

    f1.frequency.value = filter;
    f1.q = 50;
    f1.type = "lowpass";
    g1.gain.value = 0.05;
    g2.gain.value = 0.1;
    o1.type = "sawtooth"
    o2.type = "triangle"
    o1.frequency.value = 2 * freq;
    o2.frequency.value = 4 * freq;

    o1.start();
    o2.start();

    g1.gain.setValueAtTime(0, startTime);
    g1.gain.linearRampToValueAtTime(0.05, startTime + duration / 64);
    g1.gain.linearRampToValueAtTime(0, startTime + duration)
    g2.gain.setValueAtTime(0, startTime);
    g2.gain.linearRampToValueAtTime(0.1, startTime + duration / 64);
    g2.gain.linearRampToValueAtTime(0, startTime + duration)
}


function loadSamples(filename, sample) {
    const request = new XMLHttpRequest();
    request.open("GET", filename);
    request.responseType = "arraybuffer";
    request.onload = function () {
        let undecodedAudio = request.response;
        c.decodeAudioData(undecodedAudio, (data) => buffer[sample] = data);
    };
    request.send();
}

function playSample(sample) {
    const g = c.createGain();
    g.gain.value=0.5;
    const source = c.createBufferSource();
    source.buffer = buffer[sample];
    source.connect(g);
    g.connect(c.destination);
    source.start();
}

