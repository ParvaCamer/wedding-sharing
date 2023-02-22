<template>
    <user-sign-in></user-sign-in>
    <user-sign-up></user-sign-up>
</template>

<script>
import UserSignIn from "./UserSignIn.vue";
import UserSignUp from "./UserSignUp.vue";

export default {
    components: {
        UserSignIn,
        UserSignUp
    }
}
</script>