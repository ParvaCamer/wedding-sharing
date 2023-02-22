import { createApp } from 'vue';
import router from './router.js';
import App from './App.vue';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/storage';

// Base Components
import BaseButton from './components/ui/BaseButton.vue';
import ButtonDropImages from './components/ui/ButtonDropImages.vue';

const firebaseConfig = {
    apiKey: "AIzaSyDI3LfgVoTGG0lNkq5E763wLnKkTdjrRrI",
    authDomain: "wedding-app-14564.firebaseapp.com",
    databaseURL: "https://wedding-app-14564-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "wedding-app-14564",
    storageBucket: "wedding-app-14564.appspot.com",
    messagingSenderId: "482799881599",
    appId: "1:482799881599:web:22bf73f3594de110b31e4a",
    measurementId: "G-FR2GTTB4WF"
};

firebase.initializeApp(firebaseConfig);

const app = createApp(App);

app.component('base-button', BaseButton);
app.component('button-drop-images', ButtonDropImages)

app.use(router);
app.mount('#app');
