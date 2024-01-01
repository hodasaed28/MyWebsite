// Dummy video data
const videos = [
    { title: 'Video 1', src: 'video1.mp4' },
    { title: 'Video 2', src: 'video1.mp4' },
    { title: 'Video 3', src: 'video1.mp4' },
];
function downloadPDF(id) {
            // Replace 'example.pdf' with the actual filename and path of your PDF
            if(id == 0)
                var pdfUrl = 'tarteb 4th by gpa.pdf';
            else
                var pdfUrl = 'tarteb 4th by id.pdf';
            // Create an anchor element
            const link = document.createElement('a');

            // Set the href attribute to the PDF file URL
            link.href = pdfUrl;

            // Specify the download attribute with the desired file name
             if(id == 0)
                link.download = 'tarteb 4th by gpa.pdf';
            else
                link.download = 'tarteb 4th by id.pdf';
            

            // Trigger a click on the anchor element to initiate the download
            link.click();
        }
// Function to add videos to the gallery
function addVideosToGallery() {
    const videoGallery = document.getElementById('videoGallery');

    videos.forEach((video,index) => {
        const videoElement = document.createElement('div');
        videoElement.classList.add('video');

        
        

        const videoTitle = document.createElement('h2');
        videoTitle.textContent = video.title;

        const videoPlayer = document.createElement('video');
        videoPlayer.controls = true;
        videoPlayer.src = video.src;

        videoElement.appendChild(videoTitle);
        videoElement.appendChild(videoPlayer);
        videoGallery.appendChild(videoElement);
        

    });
}

// Call the function to populate the video gallery
document.addEventListener('DOMContentLoaded', addVideosToGallery);
