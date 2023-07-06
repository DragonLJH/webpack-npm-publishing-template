<template>
    <div class="low-router-template">
        <template v-if="data.list.length">
            <div class="control" v-for="(item, index) in data.list" :key="Math.random() * 1000" :style="toPx(item.style)"
                :target-index="-1" :index="index">
                <component :is="item.is" :props="item.props" />
            </div>
        </template>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue"
import { useRouter, toPx, useThis } from '../../../utils/index';
const { $route } = useRouter()
const { api, userName } = useThis()
const queryUKReadFile = (item) => { 
    return api.GETAPI(api.montage("/userFileStorage/queryUKReadFile", { userName, path: item }))
}
const data = reactive({
    list: []
})

onMounted(() => {
    if ($route.params.id) {
        queryUKReadFile($route.params.id).then((val) => {
            if (val.data) data.list = JSON.parse(val.data)
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

.low-router-template>.control {
    position: absolute;
    outline: solid 1px #000;
    overflow: hidden;
}
</style>