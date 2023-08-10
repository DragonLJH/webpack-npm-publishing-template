<template>
    <form :action="data.props.action" method="post">
        <div class="low-form">
            <div class="low-form-main">
                <div class="low-form-main-item" v-for="(item, index) in inputArr" :key="index">
                    <div class="input-item-label">{{ item.label }}</div>
                    <div class="input-item-com">
                        <InputArr v-bind="item"></InputArr>
                    </div>
                </div>
            </div>
            <div class="low-form-footer">
                <div v-for="(item, index) in buttonForm" :key="index">{{ item.label }}</div>
            </div>
        </div>
    </form>
</template>
<script setup>
import { defineProps, onMounted, computed } from "vue"
import InputArr from '../../InputArr/index.vue'
const data = defineProps(["props"])
const inputArr = computed(() => {
    return data.props.inputArr.slice(0, -1)
})
const buttonForm = computed(() => {
    return data.props.inputArr.slice(-1)[0]
})

onMounted(() => {
})

</script>
<style scoped>
form{
    width: 100%;
    height: 100%;

}
.low-form {
    width: 100%;
    height: 100%;
}

.low-form-main {
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-wrap: wrap;
    gap: 5px 10px;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-y: auto;


}

.low-form-main-item {
    --i-h: 40px;
    display: flex;
    outline: solid 1px #ccc;
    margin-top: 5px;
    height: var(--i-h);
    align-items: center;
    float: left;
    width: calc(50% - 5px);

}

.input-item-label {
    background-color: #eee;
    width: 100px;
    height: var(--i-h);
    box-sizing: border-box;
    border-right: solid 1px #ccc;
    text-align: center;
    line-height: var(--i-h);
}

.input-item-com {
    width: calc(100% - 132px);
    overflow: hidden;
}

.input-item-com>>>.el-input {
    width: 100%;
}

.low-form-footer {
    position: relative;
    height: 50px;
    border-top: solid 1px #ccc;
    box-sizing: border-box;
    padding-right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    background-color: #fff;
}

.low-form-footer>div {
    padding: 5px 15px;
    border: solid 1px #ccc;
    box-shadow: 1px 1px 5px 1px #ccc;
    cursor: pointer;
    border-radius: 10px;
}

.low-form-footer>div:hover {
    background-color: #999;
    color: #fff;
}
</style>