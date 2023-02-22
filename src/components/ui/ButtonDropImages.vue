<template>
    <button class="add">
        <slot></slot>
    </button>
</template>

<style scoped>
.add {
    width: 70px;
    height: 70px;
    border: none;
    border-radius: 50%;
    background-color: #d4b0a5;
    color: #fff;
    position: fixed;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 30px;
    transition: transform .3s linear;
    -webkit-transition: -webkit-transform .3s linear;
    z-index: 999;
}

.add:hover {
    background-color: #c79889;
}
</style>