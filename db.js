const csv = require('csv-parser')
const fs = require('fs')
const firebase = require("firebase");
require("firebase/firestore");

import { FIRESTORE_API_KEY, FIRESTORE_AUTH_DOMAIN, FIRESTORE_PROJECT_ID } from 'react-native-dotenv'

firebase.initializeApp({
  apiKey: FIRESTORE_API_KEY,
  authDomain: FIRESTORE_AUTH_DOMAIN,
  projectId: FIRESTORE_PROJECT_ID
});

const db = firebase.firestore()
const flagsRef = db.collection('flags');

const seed = () => {
  let counter = 0
  fs.createReadStream('Country_Flags.csv')
    .pipe(csv(['Country', 'ImageURL']))
    .on('data', (d) => {
      flagsRef.doc(country).set({
        _id: counter++,
        country: country,
        url: url
      });
    })
    .on('end', () => {
      console.log(`Finished; Inserted ${counter} documents`)
    })
}

export default flagsRef;
