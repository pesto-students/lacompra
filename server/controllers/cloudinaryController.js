const cloudinary = require('cloudinary');
const catchAysnc = require('../utils/catchAsync');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImages = catchAysnc(async (req, res) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now}`,
    resource_type: "auto"
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url
  })
});

exports.removeImage = (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (result) => {
    return res.json({
      status: result,
    });
  });
}