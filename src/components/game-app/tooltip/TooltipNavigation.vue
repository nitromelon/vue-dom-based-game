<template>
    <div class="nav">
        <div class="top"></div>
        <div class="leftright">
            <div class="left"></div>
            <div class="right"></div>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.nav {
    position: absolute;
    bottom: 80px;
    left: 12px;
    height: 175px;
    width: 175px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
}

.top, .bottom {
    height: 58px;
    width: 29px;
    background: black;
    border: 1px white;
}

.leftright {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.left, .right {
    height: 29px;
    width: 58px;
    background-color: black;
    border: 1px white;
    }
</style>