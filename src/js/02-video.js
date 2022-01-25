import {throttle} from "lodash.throttle";
import {_} from 'lodash';

const iframe = document.querySelector("#vimeo-player");
const player = new Vimeo.Player(iframe);

// check if video have been watched before
// assign current time of watching video
currentPlayTime();

// listener on player event 'timeupdate'
// add  _.throttle() to change listener frequency
player.on('timeupdate',  _.throttle((event) => {
    localStorage.setItem("videoplayer-current-time",JSON.stringify(event));
//    console.log(event.seconds);
  }, 1000)
);

// currentPlayTime procedure
// do:
//  check if video have been watched before:
//      no - return undefine;
//      yes - copy current watching time value from Web Storage
//              and set the value to player.
function currentPlayTime() {
    const isVideoStartedView = localStorage.getItem("videoplayer-current-time"); 
    if (!isVideoStartedView) {
        return;
    }
    const {seconds:currentTime} = JSON.parse(isVideoStartedView);
    player.setCurrentTime(currentTime).then().catch(function(error) {
        switch (error.name) {
            case 'RangeError':
                console.log("Uncorrect value of time" );
                break;
            default:
                console.log("Some another problem" );
                break;
        }
    });
    return 1;   
}


