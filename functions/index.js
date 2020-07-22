const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.createPost = functions.firestore
  .document('posts/{documentId}')
  .onCreate((snap, context) => {
    console.log(snap);
    console.log(1);
  })
