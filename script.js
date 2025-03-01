// Get elements
const video = document.getElementById('video');
const snapButton = document.getElementById('snapButton');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const context = canvas.getContext('2d');
const countdownElement = document.getElementById('countdownDisplay');

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
    countdownElement.style.display = 'block';

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

// Allow users to download the photo
const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = photo.src;
    link.download = 'photobooth-photo.png'; // Name the photo file
    link.click();
});

// Filter Buttons
const bwFilterButton = document.getElementById('bwFilter');
const sepiaFilterButton = document.getElementById('sepiaFilter');
const resetFilterButton = document.getElementById('resetFilter');

// Apply black and white filter
bwFilterButton.addEventListener('click', function() {
    photo.style.filter = "grayscale(100%)";  // Apply grayscale filter
});

// Apply sepia filter
sepiaFilterButton.addEventListener('click', function() {
    photo.style.filter = "sepia(100%)";  // Apply sepia filter
});

// Reset to no filter
resetFilterButton.addEventListener('click', function() {
    photo.style.filter = "none";  // Reset filter
});

// Social Media Share Buttons
const shareTwitterButton = document.getElementById('shareTwitter');
const shareFacebookButton = document.getElementById('shareFacebook');

// Share on Twitter
shareTwitterButton.addEventListener('click', function() {
    const tweetText = "Check out this fun photobooth pic!";
    const photoUrl = photo.src;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}&url=${encodeURIComponent(photoUrl)}`;
    window.open(twitterUrl, "_blank");
});

// Share on Facebook
shareFacebookButton.addEventListener('click', function() {
    const photoUrl = photo.src;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(photoUrl)}`;
    window.open(facebookUrl, "_blank");
});
