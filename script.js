// Get elements
const video = document.getElementById('video');
const snapButton = document.getElementById('snapButton');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const context = canvas.getContext('2d');
const countdownElement = document.createElement('div');
document.body.appendChild(countdownElement); // To show countdown text

// Access webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        video.srcObject = stream;
    })
    .catch(function(err) {
        console.log('Error accessing webcam: ' + err);
    });

// Function for countdown before snapping photo
function startCountdown() {
    let count = 3;
    countdownElement.style.position = "absolute";
    countdownElement.style.top = "50%";
    countdownElement.style.left = "50%";
    countdownElement.style.transform = "translate(-50%, -50%)";
    countdownElement.style.fontSize = "4rem";
    countdownElement.style.color = "red";
    
    const interval = setInterval(() => {
        countdownElement.innerText = count;
        count--;
        if (count < 0) {
            clearInterval(interval);
            countdownElement.innerText = "Smile!"; // Show "Smile" text before capturing
            capturePhoto();
        }
    }, 1000); // Countdown every second
}

// Capture the photo
function capturePhoto() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    photo.src = dataUrl;
}

// Start countdown on button click
snapButton.addEventListener('click', function() {
    startCountdown();
});
const downloadButton = document.getElementById('downloadButton');

// Allow users to download the photo
downloadButton.addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = photo.src;
    link.download = 'photobooth-photo.png'; // Name the photo file
    link.click();
});
