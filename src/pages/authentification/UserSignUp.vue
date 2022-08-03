<template>
    <div class="container">
        <h1>Create a weeding space</h1>
        <div class="row">
            <span>Weeding name</span>
            <input type="text" class="create">
        </div>
        <div class="row">
            <span>Email</span>
            <input type="email" class="create">
        </div>
        <div class="row">
            <span>Password (for you only)</span>
            <input type="password" class="create">
        </div>
        <div class="line">
            <input type="checkbox" value="meonly" class="create">
            <span>Only me can add photos</span>
        </div>
        <router-link to="/signup">I have a weeding space already</router-link>
    </div>
</template>

<style scoped>
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
    width: 300px;
    height: auto;
    font-size: 22px;
    border: none;
    padding: 8px;
    background-color: #f9f9f9;
    outline: none;
}

.container input[type=checkbox].create {
    width: auto;
    height: auto;
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
    margin-top: 50px;
    text-decoration: underline;
    color: #FFD3C9;
    font-size: 18px;
}
</style>