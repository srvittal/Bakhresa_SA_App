import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, onSnapshot, addDoc, where, query } from 'firebase/firestore';
import {
    apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId, appId, measurementId,
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


async function getEntryDetailsRT() {                      /**real time updates */
    const q = collection(db, "EntryDetails");
    const detailsCol = onSnapshot(q, (query) => {
        query.forEach((doc) => {
            console.log("Current data: ", doc.data());
        })
    })
    return detailsCol;
}

async function getEntryDetails() {                                  /**once of update */
    const detailsCol = collection(db, 'EntryDetails');
    const detailsSnapshot = await getDocs(detailsCol);
    detailsSnapshot.forEach((doc) => {
        console.log(
            "Date; ", doc.data()["Date"], "\n",
            "Time; ", doc.data()["Time"], "\n",
            "Name: ", doc.data()["Name"], "\n",
            "Contact No.: ", doc.data()["Contact_No"], "\n",
            "Vehicle Reg: ", doc.data()["Vehicle_Reg"], "\n"
        )
    });
    return detailsSnapshot
}

async function addEntryDetails(date, time, name, conNum, vehReg) {
    const detailsCol = collection(db, 'EntryDetails');
    await addDoc(detailsCol, {
        Date: date,
        Time: time,
        Name: name,
        Contact_No: conNum,
        Vehicle_Reg: vehReg,
    })
}

async function delEntryDetails() {
    const detailsCol = collection(db, 'EntryDetails');
    await addDoc(detailsCol, {
        Date: date,
        Time: time,
        Name: name,
        Contact_No: conNum,
        Vehicle_Reg: vehReg,
    })
}

async function authUser(username, password) {
    let authName = "";
    let authPass = "";
    let type = "";
    const userCol = collection(db, 'User');
    const usernameWhere = where("Username", "==", username);
    const q = query(userCol, usernameWhere);
    const userDoc = await getDocs(q);
    userDoc.forEach((doc) => {
        authName = doc.data()["Username"];
        authPass = doc.data()["Password"];
        type = doc.data()["UserType"];
    });
    if (username == authName) {
        if (password == authPass) {
            return true;
        } else {
            return false;
        }
    } else {
        return false
    };
}

export {
    getEntryDetails,
    getEntryDetailsRT,
    addEntryDetails,
    delEntryDetails,
    authUser
}