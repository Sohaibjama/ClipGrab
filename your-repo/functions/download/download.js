const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { url } = JSON.parse(event.body);
    
    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL parameter is required' })
      };
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid URL format' })
      };
    }

    // Determine platform and extract video info
    const platform = getPlatform(url);
    
    if (!platform) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Unsupported platform' })
      };
    }

    // For demonstration purposes - in a real implementation,
    // you would use appropriate APIs or libraries for each platform
    const videoInfo = await extractVideoInfo(url, platform);

    return {
      statusCode: 200,
      body: JSON.stringify(videoInfo)
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process the video' })
    };
  }
};

function getPlatform(url) {
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  } else if (url.includes('youtube.com/shorts')) {
    return 'shorts';
  } else if (url.includes('tiktok.com')) {
    return 'tiktok';
  } else if (url.includes('instagram.com')) {
    return 'instagram';
  }
  return null;
}

async function extractVideoInfo(url, platform) {
  // This is a simplified example - in a real implementation,
  // you would use appropriate APIs or libraries for each platform
  
  try {
    // For demonstration, we'll return mock data
    // In a real implementation, you would fetch actual video data
    
    const mockData = {
      title: `Video from ${platform}`,
      thumbnail: 'https://via.placeholder.com/300x200.png?text=Video+Thumbnail',
      duration: '2:45',
      qualities: [
        { quality: '720p', url: '#download-720p' },
        { quality: '480p', url: '#download-480p' },
        { quality: '360p', url: '#download-360p' }
      ],
      url: url // In a real implementation, this would be the download URL
    };
    
    return mockData;
  } catch (error) {
    console.error(`Error extracting video info from ${platform}:`, error);
    throw new Error(`Failed to extract video information from ${platform}`);
  }
}