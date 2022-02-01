import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, onSnapshot, doc, setDoc, where, query, deleteDoc } from 'firebase/firestore';
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
        })
    })
    return detailsCol;
}

async function getEntryDetails() {                                  /**once of update */
    try {
        let entries = []
        const detailsCol = collection(db, 'EntryDetails');
        const detailsSnapshot = await getDocs(detailsCol);
        detailsSnapshot.forEach((doc) => {
            let e = [doc.data()["Date"], doc.data()["Time"], doc.data()["Vehicle_Reg"], doc.data()["Name"]];
            entries.push(e);
        });
        return entries
    } catch (e) {
        console.error(e);
    }
}

async function delEntryDetails(vehReg) {
    const detailsCol = doc(db, 'EntryDetails', vehReg);
    await deleteDoc(detailsCol);
}

async function addEntryDetails(date, time, name, conNum, vehReg) {
    const detailsCol = doc(db, 'EntryDetails', vehReg);
    await setDoc(detailsCol, {
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
    if (username == '' || password == '') {
        return false
    } else {
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

}

export {
    getEntryDetails,
    getEntryDetailsRT,
    addEntryDetails,
    delEntryDetails,
    authUser,
    db
}