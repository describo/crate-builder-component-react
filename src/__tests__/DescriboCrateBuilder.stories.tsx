import {Meta, StoryFn} from "@storybook/react";
import CustomMDXDocumentation from './Documentation.mdx';
import DescriboCrateBuilder from "../DescriboCrateBuilder";
import crateSimple from "./examples/simple-ro-crate-metadata.json"
import crateEmpty from "./examples/item/empty/ro-crate-metadata.json";
import crateComplexCollection from "./examples/item/complex-collection/ro-crate-metadata.json";
import crateComplexItem from "./examples/item/complex-item/ro-crate-metadata.json";
import crateLarge from "./examples/item/large-crate/ro-crate-metadata.json";
import profileMultipleTypes from "./examples/profile/profile-to-test-multiple-types.json";
import profileAllPrimitives from "./examples/profile/profile-with-all-primitives.json";
import profileAllPrimitivesNoGroups from "./examples/profile/profile-with-all-primitives-and-groups.json";
import profileNyingarn from "./examples/profile/nyingarn-item-profile.json";
import profileCitation from "./examples/profile/citation.profile.json";
import profileAroma from "./examples/profile/aroma.profile.json";
import {DescriboCrateBuilderProps} from "../types";


// Create a master template for mapping args to render the DescriboCrateBuilder component
const Template: StoryFn<typeof DescriboCrateBuilder> = (args) => {
  return <>
    <DescriboCrateBuilder {...args} />
  </>
}

const emptyProfile = {}
const profiles = { emptyProfile, profileMultipleTypes, profileAllPrimitives, profileAllPrimitivesNoGroups, profileNyingarn, profileCitation, profileAroma};
const crates = { crateEmpty, crateSimple, crateComplexCollection, crateComplexItem, crateLarge};


export default {
  title: "Describo Crate Builder",
  component: DescriboCrateBuilder,
  parameters: {
    docs: {
      page: CustomMDXDocumentation,
    },
  },
  argTypes: {
    crate: {
      options: Object.keys(crates), // An array of serializable values
      mapping: crates, // Maps serializable option values to complex arg values
      control: {
        type: 'select',
        labels : {
          crateEmpty: "Empty",
          crateSimple: "Simple",
          crateComplexCollection: "Complex collection",
          crateComplexItem: "Complex item",
          crateLarge: "Large",
        },
      },
      table: {
        type: { summary: 'select' },
        defaultValue: { summary: 'Simple' },
      },

    },
    profile: {
      options: Object.keys(profiles), // An array of serializable values
      mapping: profiles, // Maps serializable option values to complex arg values

      control: {
        type: 'select',
        labels : {
          emptyProfile: "Empty",
          profileMultipleTypes: profileMultipleTypes.metadata.name,
          profileAllPrimitives: profileAllPrimitives.metadata.name,
          profileAllPrimitivesNoGroups: profileAllPrimitivesNoGroups.metadata.name,
          profileNyingarn: profileNyingarn.metadata.name,
          profileCitation: profileCitation.metadata.name,
          profileAroma: profileAroma.metadata.name
        }
      },
    },
    tabLocation: {
      options: ['left', 'top', 'right', 'bottom'],
      control: { type: 'select' },
    },
    language: {
      options: ['en', 'hu'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof DescriboCrateBuilder>;


export const CompleteExample = Template.bind({});
CompleteExample.args = {
  crate: crateSimple,
  profile: emptyProfile,
  showControls: true,
  enableReverseLinkBrowser: true,
  enableContextEditor: true,
  enableCratePreview: true,
  enableBrowseEntities: true,
  entityId: "", // Setting to "./" would not allow changing the crate now https://github.com/describo/crate-builder-component/issues/68
  enableInternalRouting: true,
  readonly: false,
  language: "en",
  tabLocation: "left",
  onReady: () => console.log("onReady called"),
  onSaveCrate: (crateData) => console.log("onSaveCrate called: ", crateData),
  onNavigation: (navData) => console.log("onNavigation called: ", navData),
  onError: (error) => console.log("onError called: ", error),
} as DescriboCrateBuilderProps

