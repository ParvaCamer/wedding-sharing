<template>
    <h1 id="title">{{ user.eventName }}</h1>
    <base-button v-if="showContainer" @click="downloadAllImages()">Download all images</base-button>
    <div class="photo-container" id="photo-container" v-if="showContainer">
        <div v-if="URLsFirebase.length > 0">
            <div class="card" v-for="(url, index) in URLsFirebase" :key="index">
                <img @click="downloadImage(index)" :src="url">
                    <div class="options">
                        <button><i class="fa-solid fa-download"></i></button>
                    <button><i class="fa-solid fa-trash"></i></button>
                    </div>
            </div>
        </div>
        <div v-else>
            <h1 v-if="decryptedMessage === 'true' || user.onlyMeCanAddPhotos === false">Click on the button to add new
                pictures
            </h1>
            <h1 v-else>No picture available</h1>
        </div>
    </div>
    <button-drop-images v-if="decryptedMessage === 'true' || user.onlyMeCanAddPhotos === false" id="add"
        :class="rotation" @click="showAddContainer">
        <i class="fas fa-plus"></i>
    </button-drop-images>
    <drop-image :key="componentKey" @reupload-picture="reupload" :show="showContainer"
        @images-upload="newPictures"></drop-image>
</template>

<script>
import DropImage from '@/pages/dashboard/DropImage.vue';
import firebase from 'firebase';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import * as CryptoJS from 'crypto-js';

export default {
    components: {
        DropImage
    },
    provide() {
        return {
            loadPicture: this.loadPictureFirebase
        }
    },
    data() {
        return {
            showContainer: true,
            rotation: null,
            URLsFirebase: [],
            URLsName: [],
            user: {},
            pathID: this.$route.params.id,
            pathAdmin: this.$route.params.userstatus,
            decryptedMessage: null,
            componentKey: 0
        }
    },
    async mounted() {
        const response = await fetch(`https://wedding-app-14564-default-rtdb.europe-west1.firebasedatabase.app/users.json?id=${this.pathID}`);
        const data = await response.json();
        this.user = data[this.pathID];
        const key = CryptoJS.enc.Utf8.parse(this.user.code.toString());
        const iv = CryptoJS.enc.Utf8.parse(this.user.iv.toString());
        this.decryptedMessage = this.decryptData(this.pathAdmin, key, iv).toString(CryptoJS.enc.Utf8);
        this.loadPictureFirebase(this.URLsFirebase, this.URLsName);
        console.log(this.URLsFirebase)
    },
    methods: {
        showAddContainer() {
            this.showContainer = !this.showContainer;
            if (!this.showContainer) {
                this.rotation = 'rotate';
            } else {
                this.rotation = null;
            }
        },
        newPictures() {
            this.rotation = null;
            this.showContainer = true;
            this.URLsFirebase = [];
            this.URLsName = [];
            this.loadPictureFirebase(this.URLsFirebase, this.URLsName);
            this.componentKey++
        },
        loadPictureFirebase(links, names) {
            let storageRef = firebase.storage().ref(this.pathID);
            storageRef.listAll().then(function (result) {
                let getURLsPromises = [];
                result.items.forEach(function (imgRef) {
                    getURLsPromises.push(imgRef.getDownloadURL());
                    names.push(imgRef.name);
                })
                return Promise.all(getURLsPromises)
            }).then((urls) => {
                urls.forEach(url => links.push(url))
            }).catch(function (error) {
                console.log(error);
            })
        },
        reupload(value) {
            this.URLsFirebase.splice(value, 1);
        },
        downloadImage(id) {
            fetch(this.URLsFirebase[id])
                .then(response => response.blob())
                .then(blob => {
                    saveAs(blob, this.URLsName[id]);
                });
        },
        async downloadAllImages() {
            const zip = new JSZip();
            for (let id = 0; id < this.URLsFirebase.length; id++) {
                try {
                    const response = await fetch(`/proxy?url=${encodeURIComponent(this.URLsFirebase[id])}`);
                    console.log(response)
                    const blob = await response.blob();
                    console.log(blob)
                    zip.file(this.URLsName[id], blob);
                } catch (error) {
                    console.error(error);
                }
            }
            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, `${this.user.eventName}.zip`);
            });
        },
        decryptData(crypted, key, iv) {
            return CryptoJS.AES.decrypt(crypted, key, { iv: iv })
        }
    }
}
</script>

<style scoped>
/* Container */

.photo-container {
    width: 94%;
    margin-left: 3%;
    margin-top: 20px;
    padding-bottom: 50px;
}

.photo-container div {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.photo-container .card:hover .options {
    display: flex;
}

.photo-container div .card {
    width: 230px;
    height: auto;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    block-size: fit-content;
    background-color: #d4b0a5;
    position: relative;
}

.photo-container .card img {
    width: 100%;
    height: auto;
    min-height: auto;
    object-fit: cover;
}

.photo-container .card .options {
    display: none;
    justify-content: center;
    position: absolute;
    background-color: #d4b0a5;
    bottom: 0;
}
.photo-container .card button {
    position: relative;
    width: 40px;
    height: 40px;
    padding: 8px;
    border: none;
    color: #fff;
    background-color: transparent;
    font-size: 22px;
    cursor: pointer;
    display: block;
}
</style>