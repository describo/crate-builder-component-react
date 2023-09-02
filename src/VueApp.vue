<template>
    <describo-crate-builder :crate="data.currentCrate" />
    <div>{{JSON.stringify(data.currentCrate)}}</div>
</template>

<script setup>
import {
    reactive,
    ref
} from "vue";
import {theCrate} from "./globals";

const props = defineProps({
    crateProp: {
        type: Object,
        required: true
    }
})

const data = reactive({
    currentCrate: theCrate
})

function setCurrentCrate(newCrate) {
    console.log("VueApp setCurrentCrate", this, newCrate)
    debugger
    data.currentCrate = newCrate;
}

defineExpose({
    setCurrentCrate
})

</script>

<!-- This is practically the same-->

<!--<script>-->
<!--import {reactive} from "vue";-->
<!--import {theCrate} from "./globals";-->

<!--export default {-->
<!--    setup() {-->
<!--        debugger;-->
<!--        const data = reactive({-->
<!--            currentCrate: theCrate-->
<!--        })-->

<!--        const setCurrentCrate = (newCrate) => {-->
<!--            console.log("VueApp setCurrentCrate", this, newCrate)-->
<!--            debugger-->
<!--            data.currentCrate = newCrate;-->
<!--        }-->


<!--        return {-->
<!--            data,-->
<!--            setCurrentCrate-->
<!--        }-->
<!--    },-->
<!--}-->
<!--</script>-->
