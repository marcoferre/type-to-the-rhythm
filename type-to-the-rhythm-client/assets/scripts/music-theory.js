const ROOT = "E"

const SCALES = {
        "ionian": [0, 2, 4, 5, 7, 9, 11], //semitones distance from root
        "dorian": [0, 2, 3, 5, 7, 9, 10],
      "phrygian": [0, 1, 3, 5, 7, 8, 10],
        "lydian": [0, 2, 4, 6, 7, 9, 11],
    "mixolydian": [0, 2, 4, 5, 7, 9, 10],
       "aeolian": [0, 2, 3, 5, 7, 8, 10],
       "locrian": [0, 1, 3, 5, 6, 8, 10],
}

const FREQS = {
    "A": 440.0,
    "A#": 466.16,
    "B": 493.88,
    "C": 523.25,
    "C#": 554.37,
    "D": 587.33,
    "D#": 622.25,
    "E": 659.25,
    "F": 698.46,
    "F#": 739.99,
    "G": 783.99,
    "G#": 830.61,
}

function getFrequency(root, grade, scale, transpose) {
    return FREQS[root] * Math.pow(2, (transpose * 12 + SCALES[scale][grade-1]) / 12);
}
