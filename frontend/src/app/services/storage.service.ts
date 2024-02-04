import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const firebaseConfig = {
  //   apiKey: 'API_KEY',
  //   authDomain: 'PROJECT_ID.firebaseapp.com',
  // The value of `databaseURL` depends on the location of the database
  //   databaseURL: 'https://DATABASE_NAME.firebaseio.com',
  projectId: 'outbrand-e10a3',
  storageBucket: 'gs://outbrand-e10a3.appspot.com',
  //   messagingSenderId: 'SENDER_ID',
  //   appId: 'APP_ID',
  // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
  //   measurementId: 'G-MEASUREMENT_ID',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();

export class StorageService {
  uploadBlob(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const timestamp = new Date().getTime();
      const fileName = `${timestamp}_${file.name}`;

      const metadata = {
        contentType: file.type,
      };
      const storageRef = ref(storage, 'blobs/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              resolve(downloadURL);
            })
            .catch((error) => {
              reject(error);
            });
        }
      );
    });
  }
}
