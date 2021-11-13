import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/functions";


// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyAAOK_-ogfS6sfQoQNmqVDzDcaGNe3S0GA",
    authDomain: "jvn-tracking-f31d2.firebaseapp.com",
    databaseURL: "https://jvn-tracking-f31d2-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "jvn-tracking-f31d2",
    storageBucket: "jvn-tracking-f31d2.appspot.com",
    messagingSenderId: "446408221524",
    appId: "1:446408221524:web:b08aadde702d08b1371ec1",
    measurementId: "G-JEE27TN0X7"
};
firebase.initializeApp(firebaseConfig)

// utils
const db_firestore = firebase.firestore()
const firebases = firebase;
const auth = firebase.auth()
const db_firebase = firebase.database()
const db_storage = firebase.storage()
// const defaultDatabase = admin.database();

// collection references
const usersCollection = db_firestore.collection('users')
const permissionsCollection = db_firestore.collection('permissions') 
const genderCollection = db_firestore.collection('gender') 
const driversCollection = db_firestore.collection('drivers')
const vehiclesCollection = db_firestore.collection('vehicles')
const ticketsCollection = db_firestore.collection('ticket')
const locationsCollection = db_firestore.collection('locations')
const routesCollection = db_firestore.collection('routes')
const rolesCollection = db_firestore.collection('roles')
const passengerCollection = db_firestore.collection('passenger')
const tagCollection = db_firestore.collection('tag')
const companyCollection = db_firestore.collection('company')
// export utils/refs
export {
  db_storage,
  db_firestore,
  auth,
  usersCollection,
  routesCollection,
  rolesCollection,
  firebases,
  genderCollection,
  permissionsCollection,
  db_firebase,
  driversCollection,
  vehiclesCollection,
  ticketsCollection,
  locationsCollection,
  passengerCollection,
  tagCollection,
  companyCollection
}