document
  .getElementById("blessingsButton")
  .addEventListener("click", function () {
    document.getElementById("second_section").scrollIntoView({
      behavior: "smooth",
    });
  });

const burstButton = document.getElementById("burstButton");
const burstGifs = document.querySelectorAll(".burst-gif");
const firstSection = document.getElementById("first_section"); // Select the first section for background change
const audioFiles = [
  document.getElementById("cracklingSound1"),
  document.getElementById("cracklingSound2"),
  document.getElementById("cracklingSound3"),
];

let currentGifIndex = 0;
let currentAudioIndex = 0; // Track the current audio index

// Function to play audio files sequentially
function playAudioSequentially(index) {
  if (index < audioFiles.length) {
    // Play the current audio
    audioFiles[index].currentTime = 0; // Reset audio to the beginning
    audioFiles[index].play(); // Play the current audio

    // After 5 seconds, play the next audio
    audioFiles[index].onended = function () {
      currentAudioIndex++; // Increment audio index
      setTimeout(() => {
        playAudioSequentially(currentAudioIndex); // Play next audio after current ends
      }, 0); // No delay before starting the next audio
    };
  }
}

// Event listener for the burst button
burstButton.addEventListener("click", function () {
  // Show the GIFs container
  const burstGifsContainer = document.querySelector(".burst-gifs");
  burstGifsContainer.style.display = "flex";

  // Hide all GIFs
  burstGifs.forEach((gif) => {
    gif.style.display = "none";
  });

  // Show the current GIF
  burstGifs[currentGifIndex].style.display = "block";

  // Add darker background class
  firstSection.classList.add("darker-background");

  // Play the first audio file
  playAudioSequentially(0);

  // Increment the index for the next GIF
  currentGifIndex++;

  // Loop back to the first GIF if we've reached the end
  if (currentGifIndex >= burstGifs.length) {
    currentGifIndex = 0; // Reset to the first GIF
  }

  // Remove the darker background class after a short delay (adjust the timeout as needed)
  setTimeout(() => {
    firstSection.classList.remove("darker-background");
  }, 1000); // Change duration as necessary (1000ms = 1 second)
});

// Function to get query parameters from the URL
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

// Get the friend's name from the URL parameter
const friendName = getQueryParameter("name");

// If a name is provided, display it
if (friendName) {
  document.getElementById("friendName").textContent = friendName;
}
