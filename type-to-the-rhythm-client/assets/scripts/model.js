var count = 0;
var bpm = 80 * 4;
var messageStack = [{
    from: "Steven Wilson",
    datetime: "04-09-2020 19:49:00",
    text: "one of the wonder of the world",
}]

var db
var message, datetime
var trackSteps, steps, bar = 0
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`˜!.@#$%^&*()-_=+;\\|{}[] \":/?><".split("")

const grades = [6, null, null, null, 3, null, 4, null, 5, 1, null, 2, 7, 3, 1, null, 2, 5, null, null, 4, null, null, null, 6, null, 6, null, null, null, 3, null, 4, null, 5, 1, null, 2, 7, 3, 1, null, 2, 5, null, null, 4, null, null, null, 6, null]
//const pitch = [-24, null, null, null, -17, null, -14, null, -13, -21, null, -19, -22, -6, -9, null, -7, -1, null, null, -3, null, null, null, -12, null, -24, null, null, null, -17, null, -15, null, -13, -21, null, -19, -22, -5, -9, null, -7, -1, null, null, -3, null, null, null, -12, null]

const triggerK = [1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0]
const triggerS = [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1]
const triggerH = [0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1, 0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1]
const triggerF = [0, 55, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1, 0, 1, 2, 1, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 1, 1, 0, 2, 1, 0, 0, 2, 2, 0, 1]
const triggerP = [0, 0, 1, 0, 2, 1, 3, 0, 0, 3, 0, 5, 4, 4, 0, 0, 1, 5, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 1, 0, 2, 1, 3, 0, 0, 3, 0, 5, 4, 4, 0, 0, 1, 5, 0, 0, 0, 2, 2, 0, 2, 0]
