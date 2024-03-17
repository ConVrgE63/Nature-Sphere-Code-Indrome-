
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth ,GoogleAuthProvider ,signInWithPopup } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCjjztVUdKenSQ57gqrqOp2IWv8fisJBEM",
  authDomain: "nature-sphere-authentic.firebaseapp.com",
  projectId: "nature-sphere-authentic",
  storageBucket: "nature-sphere-authentic.appspot.com",
  messagingSenderId: "895678789202",
  appId: "1:895678789202:web:579d4ba04e7a041e2d118b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin =document.getElementById("google-login-btn");
googleLogin.addEventListener("click" , function(){   
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
     console.log(user);
     window.location.href = "dash.html";
     
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });


})


