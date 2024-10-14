const keys = document.querySelectorAll(".key"),
hints = document.querySelectorAll(".hints");

const sound = {65:"http://carolinegabriel.com/demo/js-keyboard/sounds/040.wav",
                87:"http://carolinegabriel.com/demo/js-keyboard/sounds/041.wav",
                83:"http://carolinegabriel.com/demo/js-keyboard/sounds/042.wav",
                69:"http://carolinegabriel.com/demo/js-keyboard/sounds/043.wav",
                68:"http://carolinegabriel.com/demo/js-keyboard/sounds/044.wav",
                70:"http://carolinegabriel.com/demo/js-keyboard/sounds/045.wav",
                84:"http://carolinegabriel.com/demo/js-keyboard/sounds/046.wav",
                71:"http://carolinegabriel.com/demo/js-keyboard/sounds/047.wav",
                89:"http://carolinegabriel.com/demo/js-keyboard/sounds/048.wav",
                72:"http://carolinegabriel.com/demo/js-keyboard/sounds/049.wav",
                85:"http://carolinegabriel.com/demo/js-keyboard/sounds/050.wav",
                74:"http://carolinegabriel.com/demo/js-keyboard/sounds/051.wav",
                75:"http://carolinegabriel.com/demo/js-keyboard/sounds/052.wav",
                79:"http://carolinegabriel.com/demo/js-keyboard/sounds/053.wav",
                76:"http://carolinegabriel.com/demo/js-keyboard/sounds/054.wav",
                80:"http://carolinegabriel.com/demo/js-keyboard/sounds/055.wav",
                186:"http://carolinegabriel.com/demo/js-keyboard/sounds/056.wav"};

let currentInput = '';
const secretCode = 'weseeyou';
let pianoActive = true;

function playNote(e) {
  if (!pianoActive) return;
  console.log("Key pressed: ", e.keyCode);

  const audioUrl = sound[e.keyCode],
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

  if (!key || !audioUrl) return;

  const audio = new Audio(audioUrl);
  const keyNote = key.getAttribute("data-note");

  key.classList.add("playing"); 
  audio.currentTime = 0;
  audio.play();

  currentInput += e.key.toLowerCase(); 
  checkSequence();
}

function checkSequence() {
  if (currentInput === secretCode) {
    awakenGreatOldOne();
  } else if (!secretCode.startsWith(currentInput)) {
    currentInput = '';
  }
}

function awakenGreatOldOne() {
  console.log("Awakening Great Old One!");
    pianoActive = false;
    const mainSection = document.getElementById('main-2');
    const greatOldOneImage = document.getElementById('great-old-one');
    const keysContainer = document.querySelector('.keys');
    const pianoHeader = document.querySelector('.piano-header');
    var text = document.getElementById("awoken-text");

    // Fade out the piano
    mainSection.style.transition = 'opacity 2s ease-out';
    mainSection.style.opacity = '0';

    // Wait for the fade-out to complete before showing the image
    setTimeout(() => {

        // Hide the keys
        keysContainer.style.display = 'none';
        pianoHeader.style.display = 'none';
        
        // Display image
        greatOldOneImage.style.display = 'block';

        mainSection.style.paddingLeft = '0';
        mainSection.style.paddingRight = '0';

        mainSection.style.opacity = '1';
        text.style.display = "block";

        // Play audio
        const creepyAudio = new Audio("https://orangefreesounds.com/wp-content/uploads/2020/09/Creepy-piano-sound-effect.mp3?_=1");
        creepyAudio.play();
    }, 2000);
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return; 
  this.classList.remove("playing"); 
}

// Add the event listener for transitionend to all keys
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

// Listen for keydown to play the note
window.addEventListener("keydown", playNote);

// Listen for keyup to remove the playing effect
window.addEventListener("keyup", function(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if (key) {
    key.classList.remove("playing"); // Remove the class on key release
  }
});

// Mouse over
document.addEventListener("DOMContentLoaded", function() {
  const keys = document.querySelectorAll('.key');
  const hints = document.querySelectorAll('.hints');
  
  keys.forEach(key => {
      key.addEventListener('mouseover', function() {
          hints.forEach(hint => {
              hint.style.opacity = 1;  // Show all hints when hovering over any key
          });
      });
      
      key.addEventListener('mouseout', function() {
          hints.forEach(hint => {
              hint.style.opacity = 0;  // Hide all hints when the mouse leaves any key
          });
      });
  });
});