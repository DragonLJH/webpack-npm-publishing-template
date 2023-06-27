<template>
    <div class="low-text" :data-display="data.props.display" :data-aline="data.props.aline">
        {{ data.props.textVal }}
    </div>
</template>
<script setup>
import { ref, defineProps } from 'vue'; 
const data = defineProps(["props"])

</script>
<style scoped>
.low-text {
    width: 100%;
    height: 100%;
}

.low-text[data-display=flex] {
    display: flex;
}

.low-text[data-display=flex][data-aline=all-center] {
    justify-content: center;
    align-items: center;
}

.low-text[data-display=flex][data-aline=left] {
    justify-content: start;
}

.low-text[data-aline=left] {
    text-align: left;
}

.low-text[data-display=flex][data-aline=center] {
    justify-content: center;
}

.low-text[data-aline=center] {
    text-align: center;
}

.low-text[data-display=flex][data-aline=right] {
    justify-content: end;
}

.low-text[data-aline=right] {
    text-align: right;
}</style>