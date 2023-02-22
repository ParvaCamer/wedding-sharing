<template>
    <button class="primary-button">
        <slot></slot>
    </button>
</template>

<style scoped>
.primary-button {
    width: auto;
    height: auto;
    padding: 15px 25px;
    margin-top: 10px;
    font-size: 20px;
    border: none;
    background-color: #d4b0a5;
    color: #fff;
    cursor: pointer;
    text-decoration: none;
}

.primary-button:hover {
    background-color: #c79889;
}
</style>