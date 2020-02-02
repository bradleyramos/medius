const firebaseConfig = {
    apiKey: "AIzaSyCGIBCDQvrEx3B1rvgi_DNSc1IZ1wcM85U",
    authDomain: "mediusv1.firebaseapp.com",
    databaseURL: "https://mediusv1.firebaseio.com",
    projectId: "mediusv1",
    storageBucket: "mediusv1.appspot.com",
    messagingSenderId: "105529295822",
    appId: "1:105529295822:web:ae5b6b0156d69540e0e19f",
    measurementId: "G-LQ06PL9KK1"
  };

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

export default db;