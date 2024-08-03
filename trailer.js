// Function to extract the YouTube video ID from the URL
const extractYouTubeVideoId = (url) => {
  // Define a regular expression to match the video ID in YouTube URLs
  const videoIdRegex = /[?&]v=([^&#]+)/;
  // Use the regular expression to find the match in the URL
  const match = url.match(videoIdRegex);
  // Return the extracted video ID or null if not found
  return match ? match[1] : null;
};

// Function to generate YouTube iframe embed code
const generateYouTubeEmbedCode = (videoId) => {
  // If no video ID is provided, return an empty string
  if (!videoId) {
    return "";
  }

  // Create an iframe element and set its attributes for embedding the YouTube video
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}`;
  iframe.width = "550";
  iframe.height = "315";
  iframe.allowFullscreen = true;

  // Return the outer HTML of the iframe element
  return iframe.outerHTML;
};

// Open the trailer modal when the trailer link is clicked
document
  .getElementById("trailer-link")
  .addEventListener("click", function (event) {
    // Prevent the default behavior of the link (navigation)
    event.preventDefault();

    // Get the trailer link and extract the YouTube video ID
    const trailerLink = document.getElementById("trailer-link");
    const videoId = extractYouTubeVideoId(trailerLink.href);
    // Generate the YouTube iframe embed code based on the extracted video ID
    const embedCode = generateYouTubeEmbedCode(videoId);

    // Get the container element for the YouTube video and update its content
    const container = document.getElementById("youtube-video-container");
    container.innerHTML = embedCode;

    // Get the modal element and set its display property to "block" to show it
    const modal = document.getElementById("trailer-modal");
    modal.style.display = "block";
  });

// Close the modal when the close button is clicked
document
  .getElementsByClassName("close")[0]
  .addEventListener("click", function () {
    // Get the modal element and set its display property to "none" to hide it
    document.getElementById("trailer-modal").style.display = "none";
  });
