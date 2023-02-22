<template>
    <div class="items-container">
        <div class="card" v-for="(url, index) in URLsFirebase" :key="index">
            <div class="card-figure">
                <img :src="url">
                <div class="options">
                    <button @click="removeFromFirebase(index)" class="remove"><i class="fas fa-times-circle"></i></button>
                </div>
            </div>
        </div>
        <div class="card" v-for="(file, index) in files" :key="index">
            <div class="card-figure">
                <img :src="getFileImage(file)" />
                <div class="options">
                    <button @click="removeImage(index)" class="remove"><i class="fas fa-times-circle"></i></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';
export default {
    props: ['items'],
    inject: ['loadPicture'],
    data() {
        return {
            pathID: this.$route.params.id,
            URLsFirebase: [],
            URLsName: [],
        }
    },
    mounted() {
        this.loadPicture(this.URLsFirebase, this.URLsName);
    },
    computed: {
        files() {
            return this.items
        }
    },
    methods: {
        getFileImage(image) {
            const url = URL.createObjectURL(image);
            return url
        },
        removeImage(index) {
            this.items.splice(index, 1);
        },
        removeFromFirebase(index) {
            firebase.storage().ref().child(`${this.pathID}/${this.URLsName[index]}`).delete()
                .then(() => {
                    console.log('Picture deleted !', this.URLsName[index])
                })
                .then(() => {
                    return this.URLsName.splice(index, 1);
                })
                .then(() => {
                    return this.URLsFirebase.splice(index, 1);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
</script>


<style>
.items-container {
    width: 94%;
    height: auto;
    margin-left: 3%;
    margin-top: 20px;
    padding-bottom: 30px;
    display: flex;
    flex-direction: row;
    justify-content:space-around;
    flex-wrap: wrap;
    gap: auto;
}

.card {
    width: 12%;
    height: auto;
    block-size: fit-content;
}

.card-figure {
    width: auto;
    height: auto;
    position: relative;
}

.card-figure:hover .options {
    display: flex;
}

.card-figure img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

.card-figure button {
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

.card-figure .options {
    width: 100%;
    display: none;
    justify-content: center;
    position: absolute;
    background-color: #d4b0a5;
    bottom: 0;
}
</style>