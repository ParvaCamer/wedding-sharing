<template>
    <div class="container">
        <h1>Wedding Sharing</h1>
        <input type="number" class="code" placeholder="Type your code" maxlength="4" v-model="inputCode" required>
        <div class="row">
            <label>I am a space owner</label>
        <input type="checkbox" value="meonly" class="create" v-model="userIsOwner">
        </div>
        <input type="text" class="code" placeholder="Type your password" v-model="inputPassword"
            :disabled="!userIsOwner" v-show="userIsOwner">
        <base-button @click="goToDashboard">Go to my space</base-button>
        <router-link to="/signup">New event? Create new space</router-link>
    </div>
</template>

<script>
import * as CryptoJS from 'crypto-js';
export default {
    data() {
        return {
            inputCode: null,
            userIsOwner: false,
            inputPassword: '',
            user: []
        }
    },
    methods: {
        async goToDashboard() {
            const response = await fetch(`https://wedding-app-14564-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
            const data = await response.json();
            for (let key in data) {
                this.user.push({ ...data[key], id: key })
            }
            this.inputCode = parseInt(this.inputCode)
            const getUser = this.user.find(user => user.code === this.inputCode)
            if (this.inputPassword === getUser.password) {
                getUser.admin = true;
            } else {
                getUser.admin = false;
            }
            const key = CryptoJS.enc.Utf8.parse(this.inputCode.toString());
            const iv = CryptoJS.enc.Utf8.parse(getUser.iv.toString());
            const encryptedMessage = this.encryptMessage(getUser.admin.toString(), key, iv).toString();
            this.$router.push(`/dashboard/${getUser.id}/${encryptedMessage}`);
        },
        encryptMessage(status, key, iv) {
            return CryptoJS.AES.encrypt(status, key, { iv: iv });
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

.container input {
    background-color: #f9f9f9;
}
.container .code {
    width: auto;
    height: auto;
    font-size: 25px;
    border: none;
    padding: 8px;
    text-align: center;
    outline: none;
}

.container .create {
    width: auto;
    height: auto;
    font-size: 22px;
    border: none;
    padding: 8px;
    outline: none;
}

.container .row {
    margin: 15px;
    color: #a4a4a4;
    display: flex;
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

#active {
    display: block;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>