<script setup lang="ts">
import {
    reactive,
    ref
} from "vue";
import {DescriboCrateBuilderProps} from "./types";
/**
 * This is the component, which rpovides the bridge to the describo-crate-builder for react.
 */


const props: DescriboCrateBuilderProps = reactive( {
    crate: {}, // an empty object, matching object | undefined
    profile: undefined, // or it could be an object
    entityId: undefined, // a string, matching string | undefined
    //mode: "embedded", // either "embedded" or "online"
    lookup:undefined, // an object, matching object | undefined
    readonly: false, // a boolean
    enableContextEditor: true, // a boolean
    enableCratePreview: true, // a boolean
    enableBrowseEntities: true, // a boolean
    enableTemplateSave: false, // a boolean
    enableInternalRouting: true, // a boolean
    enableReverseLinkBrowser: true, // a boolean
    purgeUnlinkedEntities: true, // a boolean
    // webComponent: false, // a boolean
    tabLocation: "left", // one of "top", "bottom", "left", "right"
    showControls: true, // a boolean
    language: "en", // a string
})

function updateProps(newProps: DescriboCrateBuilderProps) {
    for (const key in newProps) {
        if (Object.prototype.hasOwnProperty.call(newProps, key)) {
            (props[key as keyof DescriboCrateBuilderProps] as any) = newProps[key as keyof DescriboCrateBuilderProps];
        }
    }
}

defineExpose({
    updateProps,
    props
})

</script>

<template>
    <describo-crate-builder
        :crate="props.crate"
        :profile="props.profile"
        :entity-id="props.entityId"
        :mode="embedded"
        :lookup="props.lookup"
        :readonly="props.readonly"
        :enable-context-editor="props.enableContextEditor"
        :enable-crate-preview="props.enableCratePreview"
        :enable-browse-entities="props.enableBrowseEntities"
        :enable-template-save="props.enableTemplateSave"
        :enable-internal-routing="props.enableInternalRouting"
        :enable-reverse-link-browser="props.enableReverseLinkBrowser"
        :purge-unlinked-entities="props.purgeUnlinkedEntities"
        :web-component="false"
        :language="props.language"
        :tab-location="props.tabLocation"
        :show-controls="props.showControls"
        @ready="props.onReady"
        @error="props.onError"
        @save:crate="props.onSaveCrate"
        @navigation="props.onNavigation"
        @save:crate:template="props.onSaveCrateAsTemmplate"
        @save:entity:template="props.onSaveEntityAsTemplate"
    />
<!--    entityId: {{props.entityId}}-->
<!--    <hr/>-->
<!--    Props in vue:<div>{{ JSON.stringify(props) }}</div>XXX-->
</template>


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
