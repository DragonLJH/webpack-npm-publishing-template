<template>
    <div class="test">
        {{ name }}
    </div>
</template>
<script setup>
import { onMounted } from "vue"
const name = "test123"
onMounted(() => {
    console.log("Navigation-mounted")
})  
</script>