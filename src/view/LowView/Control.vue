<template>
    <div class="control" :class="props.targetIndex == props.index ? 'active' : ''" :style="props.style"
        @mousedown.stop="(e) => emit('controldown', e, props.index)">
        <div class="main">
            <slot></slot>
        </div>
        <div class="icon close" @click="emit('closeItem', index)"></div>
        <div class="drop" :class="drop" v-for="drop in ['r', 'b', 'rb']" :key="Math.random() * 1000"
            @mousedown.stop="(e) => emit('controldown', e, props.index, drop)"></div>
    </div>
</template>
<script setup>
import { defineProps, defineEmits } from 'vue';
const props = defineProps({
    style: { type: Object },
    active: { type: String },
    index: { type: Number },
    targetIndex: { type: Number }
})
const emit = defineEmits(["controldown", "closeItem"])
console.log("targetIndex",props.targetIndex)
</script>
<style scoped>
.control {
    position: absolute;
    outline: solid 1px #000;
}

.control.active> .drop,
.control.active> .close {
    display: block;
}

.main {
    display: inline-block;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.drop {
    display: none;
    position: absolute;
    width: 0;
    height: 0;
    border: 3px solid #000;

}

.r {
    top: 0;
    right: -3px;
    bottom: 0;
    margin: auto 0;
    cursor: w-resize;
}

.b {
    left: 0;
    right: 0;
    bottom: -3px;
    margin: 0 auto;
    cursor: n-resize;
}

.rb {
    right: -3px;
    bottom: -3px;
    cursor: nw-resize;
}

.close {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
}

.close::after {
    content: "×";
    font-size: 16px;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    background: linear-gradient(to right top, rgba(255, 255, 255, 0) 50%, rgba(0, 0, 0, 0.3) 50%);
    color: #fff;
}
</style>