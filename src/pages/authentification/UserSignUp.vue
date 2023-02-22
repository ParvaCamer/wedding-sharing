<template>
    <div class="container">
        <h1>Create a wedding space</h1>
        <div class="row">
            <span>Event name</span>
            <input type="text" class="create" v-model="user.eventName" required>
        </div>
        <div class="row">
            <span>Email</span>
            <input type="email" class="create" v-model="user.email" required>
        </div>
        <div class="row">
            <span>Password (for you only)</span>
            <input type="password" class="create" autocomplete="on" v-model="user.password" required>
        </div>
        <div class="line">
            <input type="checkbox" value="meonly" class="create" v-model="user.onlyMeCanAddPhotos">
            <label for="checkbox">Only me can add photos</label>
        </div>
        <p v-if="errorDisplay">{{ errorMessage }}</p>
        <base-button @click="createCode">Create a new sharing</base-button>
        <router-link to="/signin">I already have a space event</router-link>
    </div>
    <sharing-code :show="showCode" :user="user"></sharing-code>
</template>

<script>
import SharingCode from './SharingCode.vue';
export default {
    components: {
        SharingCode
    },
    data() {
        return {
            user: {
                eventName: "",
                email: "",
                password: "",
                onlyMeCanAddPhotos: false,
                admin: true,
                code: 0
            },
            showCode: false,
            errorMessage: '',
            errorDisplay: false
        }
    },
    methods: {
        createCode() {
            if (this.user.eventName.trim() === "" || this.user.email.trim() === "" || this.user.password.trim() === "") {
                this.errorDisplay = true;
                this.errorMessage = 'Please enter correct informations.'
                return
            } else {
                if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.user.email)) {
                    this.showCode = true;
                    return true
                } else {
                    this.errorDisplay = true;
                    this.errorMessage = 'Please enter a valid email address.'
                    return false
                }
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 90%;
    height: auto;
    margin: 6% 5% 0px 5%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container input[type=text].code {
    width: 300px;
    height: auto;
    font-size: 25px;
    border: none;
    padding: 8px;
    background-color: transparent;
    text-align: center;
    outline: none;
}

.container input.create {
    width: auto;
    height: auto;
    font-size: 22px;
    border: none;
    padding: 8px;
    background-color: #f9f9f9;
    outline: none;
}


.container .row {
    margin: 5px;
    color: #a4a4a4;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
}

.container .line {
    width: 300px;
    margin-top: 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #a4a4a4;
}

.container a {
    margin-top: 20px;
    color: #a4a4a4;
}

.container a:hover {
    color: #cfaca5;
}
</style>