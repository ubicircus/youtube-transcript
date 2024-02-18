const express = require('express');
const bodyParser = require('body-parser');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/getTranscript', (req, res) => {
    const videoUrl = req.body.videoUrl; // Assuming the video URL comes in the body of the POST request
    if (!videoUrl) {
        return res.status(400).send({ error: 'No videoUrl provided' });
    }

    const videoId = extractId(videoUrl); // Helper function required to extract YouTube video ID from URL
    
    if (!videoId) {
        return res.status(400).send({ error: 'Invalid videoUrl provided' });
    }

    YoutubeTranscript.fetchTranscript(videoId)
      .then(transcript => {
          res.status(200).json({
              videoId: videoId,
              transcript: transcript
          });
      })
      .catch(error => {
          console.error('Error fetching transcript:', error);
          res.status(500).send({ error: 'Failed to fetch transcript' });
      });
});

// Utility function to extract the video ID from a URL. This needs to be adapted to match different URL formats.
function extractId(url) {
    // A simple way to extract the video ID might be looking for the "v" parameter in a standard YouTube URL, but more complex logic could be needed for different URL formats.
    try {
        const urlObj = new URL(url);
        return urlObj.searchParams.get('v');
    } catch (error) {
        console.error('Error extracting video ID:', error);
        return null;
    }
}

const PORT = 20388; // Port the server will listen on
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
