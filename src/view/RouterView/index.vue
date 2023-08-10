<template>
    <div class="router-view">
        <div class="router-view-link">
            <Children v-model:data="options.routes" />
        </div>
        <div class="router-view-link">
            <Abreast v-model:data="abreastData.data" />
        </div>
    </div>
</template>
<script setup>
import { watchEffect, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Children from "./children.vue"
import Abreast from "./abreast.vue"
const router = useRouter()
const route = useRoute()
const { options } = router
const routes = router.getRoutes()
console.log("routes", routes)
const abreastData = reactive({ data: [...routes] })

const MyChange = (data) => {
    console.log("MyChange", data)
}
</script>
<style scoped></style>