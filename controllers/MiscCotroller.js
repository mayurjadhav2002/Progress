const axios = require('axios');
const FormData = require('form-data');

const ImageUploader = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({ success: false, msg: 'No image provided' });
    }

    const apiUrl = `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`;

    const formData = new FormData();
    formData.append('image', image.buffer, { filename: image.originalname });

    const response = await axios.post(apiUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    const imageUrl = response.data.data.url;

    res.status(200).json({ success: true, imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: 'Failed to upload image' });
  }
};

module.exports = { ImageUploader };
