<template>
    <div v-if="!show">
        <div class="add-container" id="add-container">
            <input type="file" id="dropzone-file" class="dropzone-file" ref="dropzoneFile" @change="handleFiles"
                multiple accept="image/*">
            <div class="dropzone-wrapper" @dragenter.prevent="" @dragover.prevent="" @drop.prevent="handleFiles">
                <label for="dropzone-file" class="dropzone-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                        class="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
                        <path
                            d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z" />
                    </svg>
                    <div class="dropzone-label-text">
                        <p>
                            <strong>Drag and drop files to upload</strong>
                        </p>
                        <p>
                            <small class="secondary-text">Your files will be added automatically</small>
                        </p>
                        <p>or you can click too</p>
                    </div>
                </label>
            </div>
        </div>
        <upload-list @reupload="reuploadPicture" :items="files"></upload-list>
        <button-drop-images @click="uploadImagesInFirebase" id="upload-button"><i class="fas fa-check"></i></button-drop-images>
    </div>
</template>

<script>
import UploadList from './UploadList.vue';
import firebase from 'firebase';

export default {
    components: {
        UploadList
    },
    props: ['show'],
    data() {
        return {
            files: [],
            picture: null,
        }
    },
    methods: {
        handleFiles(value) {
            const inputValue = value.target.files || value.dataTransfer.files || this.$refs.dropzonFile.files
            for (let i = 0; i < inputValue.length; i++) {
                const fileItem = inputValue[i];
                this.files.push(fileItem);
            }
        },
        uploadImagesInFirebase() {
            const pathID = this.$route.params.id;
            for (let i = 0; i < this.files.length; i++) {
                firebase.storage().ref(`${pathID}/${this.files[i].name}`).put(this.files[i])
                console.log('Picture save', this.files[i].name)
            }
            setTimeout(() => {
                this.$emit('images-upload');
            }, 500);
        },
        reuploadPicture(value) {
            this.$emit('reupload-picture', value)
        }
    }
}
</script>

<style scoped>
.add-container {
    width: 90%;
    height: auto;
    min-height: 300px;
    margin: 0px 5%;
    border: 1px solid #939580;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
}

.add-container .import {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.dropzone-file {
    opacity: 0;
}



.dropzone-label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    color: #323232;
}

#upload-button {
    right: 90px;
    z-index: 999;
}

.bi-cloud-arrow-up-fill {
    color: #d4b0a5;
}
</style>