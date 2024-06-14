/**
 * for documentation and more demos,
 * visit https://audiomotion.dev
 */

// load module from Skypack CDN

// global variable to save microphone stream
let micStream;

// instantiate analyzer
const audioMotion = new AudioMotionAnalyzer(
    document.getElementById('container'),
    {
        gradient: 'prism',
        height: window.innerHeight - 40,
        showScaleY: true,
        mode: 8,
        smoothing: 0.7,
        ledBars: true,
        // useCanvas: false,
        onCanvasDraw: (instance)=>{
            console.log(instance.getBars())
        }
    }
);

audioMotion.setLedParams({
    maxLeds: 7,
    spaceV: 2,    // > 0
    spaceH: 2    // >= 0
})

// display module version
document.getElementById('version').innerText = `v${AudioMotionAnalyzer.version}`;

// toggle microphone on/off
const micButton = document.getElementById('mic');

micButton.addEventListener( 'change', () => {
    if ( micButton.checked ) {
        if ( navigator.mediaDevices ) {
            navigator.mediaDevices.getUserMedia( { audio: true, video: false } )
                .then( stream => {
                    // create stream using audioMotion audio context
                    micStream = audioMotion.audioCtx.createMediaStreamSource( stream );
                    // connect microphone stream to analyzer
                    audioMotion.connectInput( micStream );
                    // mute output to prevent feedback loops from the speakers
                    audioMotion.volume = 0;
                })
                .catch( err => {
                    alert('Microphone access denied by user');
                });
        }
        else {
            alert('User mediaDevices not available');
        }
    }
    else {
        // disconnect and release microphone stream
        audioMotion.disconnectInput( micStream, true );
    }
});
