const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');

exports.imgConvert = functions.storage.object().onFinalize( async object => {
  const fileBucket = object.bucket;
  const filePath = object.name;
  const fileName = path.basename(filePath);
  const contentType = object.contentType;

  if(!contentType.startsWith('image/')){
    return 'This is not an image'
  }

  if (fileName.startsWith('500x500_')) {
    return console.log('Already a Copy.');
  }

  const bucket = admin.storage().bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType
  };
  await bucket.file(filePath).download({ destination: tempFilePath })
  await spawn('convert', [tempFilePath, '-thumbnail', '500x500>', tempFilePath]);

  let newFileName = `500x500_${fileName}`;
  const newFilePath = path.join(path.dirname(filePath), newFileName);

  await bucket.upload(tempFilePath, {
    destination: newFilePath,
    metadata: metadata
  });

  return fs.unlinkSync(tempFilePath);
})
