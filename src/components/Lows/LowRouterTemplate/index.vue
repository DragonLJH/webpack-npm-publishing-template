<template>
    <div class="low-router-template"> 
        <template v-if="data.list.length">
            <Control v-for="(item, index) in data.list" :key="Math.random() * 1000" :style="toPx(item.style)"
                :target-index="-1" :index="index" > 
                <component :is="item.is" :props="item.props" />
            </Control>
        </template>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue"
import { getMergeUrl, useRouter,toPx } from '../../../utils/index';
import Control from '../../../view/LowView/Control.vue';
const { $route } = useRouter()
const queryUKReadFile = async (item) => {
    const url = getMergeUrl("/userFileStorage/queryUKReadFile/18022429170/" + item)
    let response = await fetch(url, {
        mode: "cors",
        credentials: "include",
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    });
    return response.json()
}
const data = reactive({
    list: []
})

onMounted(() => {
    if ($route.params.id) {
        queryUKReadFile($route.params.id).then((val) => {
            data.list = JSON.parse(val.data)
        })
    }

})
</script>
<style scoped>
.low-router-template {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>