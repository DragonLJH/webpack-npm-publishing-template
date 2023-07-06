<template>
    <div class="low-imgs" ref="lowImgs">
        <el-carousel trigger="click" v-show="data.props.srcArr.length">
            <el-carousel-item v-for="(item, index) in data.props.srcArr" :key="item.url"
                :style="{ height: lowImgs?.getBoundingClientRect().height }">
                <div class="low-imgs-item">
                    <img :src="getImg(item.url)" alt="">
                    <div class="low-imgs-item-title" v-show="lowImgs?.getBoundingClientRect().height > 100">{{
                        item.name }}</div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script setup>
import { ref, defineProps, onMounted, computed } from 'vue';
import { useThis } from "../../../utils/index.js"
const { userName } = useThis()
const data = defineProps(["props"])
const lowImgs = ref()
const getImg = (val) => {
    return val ? "http://127.0.0.1:5500/img/" + userName + "/" + val : ""
}
onMounted(() => {

    console.log("lowImgs", lowImgs.value.getBoundingClientRect())

})
</script>
<style scoped> .low-imgs>>>.el-carousel--horizontal,
 .low-imgs>>>.el-carousel__container,
 .low-imgs,
 .low-imgs-item,
 img {
     position: relative;
     width: 100%;
     height: 100%;
 }

 img {
     pointer-events: none;

 }

 .low-imgs-item-title {
     position: absolute;
     bottom: 0px;
     height: 30px;
     line-height: 30px;
     width: 100%;
     background-color: rgba(0, 0, 0, 0.1);
     text-align: center;
     z-index: 2;
 }
</style>