import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, onSnapshot, Setdoc } from 'firebase/firestore';
import { apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId,
} from '@env';

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function getEntryDetails() {                      /**real time updates */
    const q = collection(db, "EntryDetails");
    const detailsCol = onSnapshot(q, (query) => {
        query.forEach((doc) => {
            console.log("Current data: ", doc.data());
        })
    })
    return detailsCol;
}

async function getEntryDetailsRT() {                                  /**once of update */
    const detailsCol = collection(db, 'EntryDetails');
    const detailsSnapshot = await getDocs(detailsCol);
    detailsSnapshot.forEach((doc) => {
        console.log(
            "Name: ", doc.data()["Name"], "\n",
            "Contact No.: ", doc.data()["Contact No."], "\n",
            "Vehicle Reg: ", doc.data()["Vehicle Reg"], "\n"
        )
    });
    return detailsSnapshot
}

export {
    getEntryDetails,
    getEntryDetailsRT
}