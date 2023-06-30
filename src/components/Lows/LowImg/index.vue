<template>
    <div class="low-img">
        <img :src="getImg(data.props.src)" alt="">
    </div>
</template>
<script setup>
import { ref, defineProps } from 'vue';
import { useThis } from "../../../utils/index.js"
const {userName} = useThis()
const data = defineProps(["props"])

const getImg = (val) => {
    return "http://127.0.0.1:5500/img/" + userName + "/" + val
}
</script>
<style scoped>
.low-img {
    width: 100%;
    height: 100%;
}

.low-img>img {
    width: 100%;
    height: 100%;

}
</style>