const wav = require('node-wav');
const FFT = require('fft.js');
const fs = require('fs');
const plotlib = require('nodeplotlib');


let size = 1024; //fft size
let fft = new FFT(size); //create fft object
let realOutput = new Array(size); // to store final result
let complexOutput = fft.createComplexArray(); // to store fft output

let buffer = fs.readFileSync('file.wav'); // open a 1s wav file(mono 16bit pcm file at   32000hz) containing only a 750hz sinusoidal tone
let result = wav.decode(buffer); // read wav file data
let audioData = Array.prototype.slice.call( result.channelData[0]); // convert Float32Array to normal array
realInput = audioData.slice(0,size); // use only 4096 sample from the buffer.

fft.realTransform(complexOutput, realInput); // compute fft
// fft.completeSpectrum(complexOutput);
fft.fromComplexArray(complexOutput,realOutput); // get rid of the complex value and keep only real


let x =[];
for(let i=0;i<size;i++) x.push(i); //create a simple dumb x axis for the fft plot

console.log(realInput)
//
// plotlib.plot( // plotting the input data
//     [{
//         x: x,
//         y: realInput,
//         type: 'line',
//         name:'input'
//     }]
// );
//
//
// plotlib.plot( // plotting the fft output
//     [{
//         x: x,
//         y: realOutput,
//         type: 'line',
//         name:'output'
//     }]
// );
