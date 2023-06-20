<template>
    <div class="low-view">
        <div class="header">

        </div>
        <div class="center">
            <div class="drag" @dragstart="dragstart">
                <div class="drag-item" v-for="(item, index) in list" :key="Math.random() * 1000" draggable="true"
                    :data-index="index">
                    {{ item.lable }}
                </div>
            </div>
            <div class="canvas" ref="canvas" @drop="drop" @dragover.prevent="() => { }" @mousedown=" targetIndex = -1">
                <Control v-for="(item, index) in canvasItems.data" :key="Math.random() * 1000" :style="toPx(item.style)"
                    :target-index="targetIndex" @controldown="mousedown" :index="index" @closeItem="closeItem">
                </Control>
                <!-- <div class="canvas-control" :class="targetIndex == index ? 'active' : ''"
                    v-for="(item, index) in canvasItems.data" :key="Math.random() * 1000" :style="toPx(item.style)"
                    @mousedown.stop="(e) => mousedown(e, index)">
                    <div class="icon close" @click="closeItem(index)"></div>
                    <div class="drop" :class="drop" @mousedown.stop="(e) => mousedown(e, index, drop)"
                        v-for=" drop in ['r', 'b', 'rb']" :key="Math.random() * 1000"></div>
                </div> -->
            </div>
            <div class="config"></div>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script setup>
import { reactive, ref, computed } from 'vue';
import { toPx } from '../../utils/index';
import Control from "./Control.vue"

const canvas = ref()
const targetIndex = ref(-1)

const list = [{
    is: "low-text",
    lable: "文本",
    id: 0,
    style: {
        width: 100,
        height: 50,
    }
}]


const canvasItems = reactive({
    data: []
})

const dragstart = (e) => {
    e.dataTransfer.setData("index", e.target.dataset.index);
}

const drop = (e) => {
    const index = e.dataTransfer.getData("index")
    const item = { ...list[index] }
    const { x: eX, y: eY } = e
    const { x: cX, y: cY, width: cW, height: cH } = canvas.value.getBoundingClientRect()
    let left = eX - cX
    let top = eY - cY
    item.style = { ...item.style, top, left }
    canvasItems.data.push(item)
    console.log("drop", canvasItems.data)
}
const mousedown = (dE, index, flag) => {
    targetIndex.value = index
    const { x: eX, y: eY } = dE
    const { top: sY, left: sX, width: sW, height: sH } = canvasItems.data[index].style
    // getBoundingClientRect()获取 canvas 元素的左，上，右和下分别相对浏览器视窗的位置  
    const { x: cX, y: cY, width: cW, height: cH } = canvas.value.getBoundingClientRect()
    const move = (mE) => {
        const { x: mX, y: mY } = mE

        let width = sW, height = sH, left = sX, top = sY
        if (flag) {
            if (flag.indexOf("r") !== -1) width += (mX - eX)
            if (flag.indexOf("b") !== -1) height += (mY - eY)
            if (width < 5) width = 5
            if (width > cW - sX) width = (cW - sX)
            if (height < 5) height = 5
            if (height > cH - sY) height = (cH - sY)

        } else {
            left += (mX - eX)
            top += (mY - eY)
            if (left < 0) left = 0
            if (left > cW - sW) left = (cW - sW)
            if (top < 0) top = 0
            if (top > cH - sH) top = (cH - sH)
        }
        canvasItems.data[index].style = { ...canvasItems.data[index].style, width, height, top, left }
    }
    const up = () => {
        document.removeEventListener("mousemove", move)
        document.removeEventListener("mouseup", up)
    }
    document.addEventListener("mousemove", move)
    document.addEventListener("mouseup", up)

}

const closeItem = (index) => {
    targetIndex.value = -1
    canvasItems.data.splice(index, 1)
    console.log("closeItem", index)
}
</script>
<style scoped>
.low-view {
    width: 100%;
    height: 100%;
    --h-hf: 50px;
}

.header,
.footer {
    height: var(--h-hf);
    box-sizing: border-box;
}

.header {
    border-bottom: solid 1px #ccc;
}

.footer {
    border-top: solid 1px #ccc;
}

.center {
    height: calc(100% - var(--h-hf)*2);
    display: flex;
}

.center>div {
    height: 100%;
}

.drag,
.config {
    width: 200px;
    padding: 10px;
    box-sizing: border-box;
}

.drag {
    border-right: solid 1px #ccc;
    display: flex;
    flex-wrap: wrap;
}

.drag-item {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0px 10px;
    border: solid 1px #ccc;
    box-sizing: border-box;
}

.config {
    border-left: solid 1px #ccc;
}

.canvas {
    width: calc(100% - 400px);
    position: relative;
}
</style>


