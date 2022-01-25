import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, onSnapshot, Setdoc } from 'firebase/firestore';

// const firebaseConfig = {
//     apiKey: process.env.apiKey,
//     authDomain: process.env.authDomain,
//     databaseURL: process.env.databaseURL,
//     projectId: process.env.projectId,
//     storageBucket: process.env.storageBucket,
//     messagingSenderId: process.env.messagingSenderId,
//     appId: process.env.appId,
//     measurementId: process.env.measurementId
// };

const firebaseConfig = {
    apiKey: "AIzaSyABSuGGwyoCtzhrRnC5mRZ6nRsQ0LlrNiU",
    authDomain: "bakhresa-sa.firebaseapp.com",
    databaseURL: "https://bakhresa-sa-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "bakhresa-sa",
    storageBucket: "bakhresa-sa.appspot.com",
    messagingSenderId: "498027227154",
    appId: "1:498027227154:web:40435415efb13ede5e10cb",
    measurementId: "G-L9X4F7KMP1"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


async function getEntryDetails() {                      /**real time updates */
    const q = collection(db, "EntryDetails");
    const detailsCol = onSnapshot(q,(query)=>{
        query.forEach((doc)=>{
        console.log("Current data: ", doc.data());
        })
    })
    return detailsCol;
}

async function getEntryDetailsRT(){                                  /**once of update */
    const detailsCol = collection(db, 'EntryDetails');
    const detailsSnapshot = await getDocs(detailsCol);
    detailsSnapshot.forEach((doc) => {
       console.log(
           "Name: ", doc.data()["Name"], "\n",
           "Contact No.: ",doc.data()["Contact No."],"\n",
           "Vehicle Reg: ",doc.data()["Vehicle Reg"],"\n"
           )
    });
    return detailsSnapshot
}

export {
    getEntryDetails,
    getEntryDetailsRT
}