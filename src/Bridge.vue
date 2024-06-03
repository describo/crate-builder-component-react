<script setup lang="ts">
import {
    reactive,
} from "vue";
import {DescriboCrateBuilderProps} from "./types";

const props: DescriboCrateBuilderProps = reactive( {
    crate: {}, // an empty object, matching object | undefined
    profile: undefined, // or it could be an object
    entityId: undefined, // a string, matching string | undefined
    lookup:undefined, // an object, matching object | undefined
    readonly: false, // a boolean
    enableContextEditor: true, // a boolean
    enableCratePreview: true, // a boolean
    enableBrowseEntities: true, // a boolean
    enableTemplateSave: false, // a boolean
    enableInternalRouting: true, // a boolean
    enableReverseLinkBrowser: true, // a boolean
    purgeUnlinkedEntities: true, // a boolean
    tabLocation: "left", // one of "top", "bottom", "left", "right"
    showControls: true, // a boolean
    language: "en", // a string
    resetTabOnEntityChange: false,
    resetTabOnProfileChange: false,
    enableUrlMarkup: true,
    enableEntityTimestamps: false,
    //mode: "embedded", // either "embedded" or "online"
    // webComponent: false, // a boolean
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
        :lookup="props.lookup"
        :readonly="props.readonly"
        :enable-context-editor="props.enableContextEditor"
        :enable-crate-preview="props.enableCratePreview"
        :enable-browse-entities="props.enableBrowseEntities"
        :enable-template-save="props.enableTemplateSave"
        :enable-internal-routing="props.enableInternalRouting"
        :enable-reverse-link-browser="props.enableReverseLinkBrowser"
        :purge-unlinked-entities="props.purgeUnlinkedEntities"
        :language="props.language"
        :tab-location="props.tabLocation"
        :show-controls="props.showControls"
        :web-component="false"
        mode="embedded"
        :reset-tab-on-entity-change="props.resetTabOnEntityChange"
        :reset-tab-on-profile-change="props.resetTabOnProfileChange"
        :enable-url-markup="props.enableUrlMarkup"
        :enable-entity-timestamps="props.enableEntityTimestamps"
        @ready="props.onReady"
        @error="props.onError"
        @save:crate="props.onSaveCrate"
        @navigation="props.onNavigation"
        @save:crate:template="props.onSaveCrateAsTemplate"
        @save:entity:template="props.onSaveEntityAsTemplate"
    />
<!--    entityId: {{props.entityId}}-->
<!--    <hr/>-->
<!--    Props in vue:<div>{{ JSON.stringify(props) }}</div>XXX-->
</template>
