<template>
    <h1 id="title">Suki weeding</h1>
    <div class="photo-container" id="photo-container">
        <div class="card">
            <img src="../../assets/back2.jpeg" alt="id">
            <button>Download</button>
        </div>
        <div class="card">
            <img src="../../assets/back2.jpeg" alt="id">
            <button>Download</button>
        </div>
        <div class="card">
            <img src="../../assets/back2.jpeg" alt="id">
            <button>Download</button>
        </div>
    </div>
</template>

<style scoped>
.photo-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.photo-container .card {
    width: 300px;
    height: 200px;
    display: flex;
    box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    position: relative;
}

.photo-container .card:hover button {
    display: block;
}

.photo-container .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.photo-container .card button {
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: auto;
    padding: 8px 0px;
    border: none;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 22px;
    cursor: pointer;
    display: none;
}
</style>