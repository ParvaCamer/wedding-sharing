<template>
    <teleport to="body">
        <div v-if="show" class="background"></div>
        <dialog open v-if="show">
            <h1>Your code : {{ code }}</h1>
            <base-button @click="goToDashboard()">Go to the dashboard</base-button>
        </dialog>
    </teleport>
    <!-- fais ce que tu veux, c'est pour afficher le code de la personne. le code qui donne accès aux photos-->
</template>

<script>
import * as CryptoJS from 'crypto-js';
export default {
    props: {
        show: {
            type: Boolean
        },
        user: {
            type: Object
        }
    },
    data() {
        return {
            getUser: [],
            code: null
        }
    },
    mounted() {
        this.code = this.generateNumber(this.code, 1000, 9999)
        this.user.code = this.code;
        this.user.iv = this.generateNumber(this.user.iv, 10000000000000000, 99999999999999999)
    },
    methods: {
        generateNumber(value, min, max) {
            value = Math.floor(Math.random() * (max - min) + min);
            return value
        },
        async goToDashboard() {
            await fetch(`https://wedding-app-14564-default-rtdb.europe-west1.firebasedatabase.app/users/.json`, {
                method: 'POST',
                body: JSON.stringify(this.user)
            });

            const response = await fetch(`https://wedding-app-14564-default-rtdb.europe-west1.firebasedatabase.app/users.json`)
            const data = await response.json();
            for (let key in data) {
                this.getUser.push({ ...data[key], id: key })
            }
            const oneUser = this.getUser.find(user => user.code === this.user.code);
            const key = CryptoJS.enc.Utf8.parse(oneUser.code.toString());
            const iv = CryptoJS.enc.Utf8.parse(oneUser.iv.toString());
            const encryptedMessage = (this.encryptMessage(oneUser.admin.toString(), key, iv).toString()).replace(/\//g, "-");
            this.$router.push(`/dashboard/${oneUser.id}/${encryptedMessage}`);
        },
        encryptMessage(status, key, iv) {
            return CryptoJS.AES.encrypt(status, key, { iv: iv });
        }
    },

}
</script>

<style scoped>
.background {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    background-color: #1a1a1a41;
    z-index: 10;
}

dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50vw;
    z-index: 100;
    border-radius: 12px;
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 40px 0;
    margin: 0;
    background-color: white;
    text-align: center;
}

h1 {
    margin: 40px 0;
}
</style>>