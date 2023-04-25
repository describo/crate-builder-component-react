import React from "react";
import {Meta, StoryFn} from "@storybook/react";
import CustomMDXDocumentation from './Documentation.mdx';
import DescriboCrateBuilder from "../DescriboCrateBuilder";
import crateTestData from "./examples/simple-ro-crate-metadata.json"
import crateFile1 from "./examples/item/empty/ro-crate-metadata.json";
import crateFile2 from "./examples/item/complex-collection/ro-crate-metadata.json";
import crateFile3 from "./examples/item/complex-item/ro-crate-metadata.json";
import crateFile4 from "./examples/item/large-crate/ro-crate-metadata.json";
import profile1 from "./examples/profile/test-profile-without-groups.json";
import profile2 from "./examples/profile/test-profile-with-groups.json";
import profile3 from "./examples/profile/test-profile-with-datapacks-and-without-groups.json";
import profile4 from "./examples/profile/nyingarn-item-profile.json";
import profile5 from "./examples/profile/citation.profile.json";

const emptyProfile = {}
const profiles = { emptyProfile, profile1, profile2, profile3, profile4, profile5 };

export default {
  title: "Describo Crate Builder",
  component: DescriboCrateBuilder,
  parameters: {
    docs: {
      page: CustomMDXDocumentation,
    },
  },
  argTypes: {
    crate: { control: 'object'  },
    profile: {
      options: Object.keys(profiles), // An array of serializable values
      mapping: profiles, // Maps serializable option values to complex arg values

      control: {
        type: 'select',
        labels : {
          emptyProfile: "Empty",
          profile1: "Profile without groups",
          profile2: "Profile with groups",
          profile3: "Profile with datapacks and without groups",
          profile4: "NYINGARN Profile",
          profile5: "Dataverse Citation Profile",
        }
      },
    }
  },
} as Meta<typeof DescriboCrateBuilder>;

// Create a master template for mapping args to render the Button component
const Template: StoryFn<typeof DescriboCrateBuilder> = (args) => <DescriboCrateBuilder {...args} />;

export const Simple = Template.bind({});
Simple.args = {
  crate: crateTestData,
  onReady: () => console.log('onReady called'),
  onSaveCrate: (crate) => console.log('onSaveCrate called', crate)
}

export const Blank = Template.bind({});
Blank.args = {
  crate: crateFile1,
  enableCratePreview: false,
  onReady: () => console.log('onReady called')
}

export const ComplexCollection = Template.bind({});
ComplexCollection.args = {
  crate: crateFile2,
  enableCratePreview: true,
}

export const ComplexItem = Template.bind({});
ComplexItem.args = {
  crate: crateFile3
}

export const LargeCrate = Template.bind({});
LargeCrate.args = {
  crate: crateFile4
}

export const Readonly = Template.bind({});
Readonly.args = {
  crate: crateFile2,
  readonly: true
}

