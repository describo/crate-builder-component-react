import {Meta, StoryFn} from "@storybook/react";
import CustomMDXDocumentation from './Documentation.mdx';
import DescriboCrateBuilder from "../DescriboCrateBuilder";
import crateTestData from "./examples/simple-ro-crate-metadata.json"
import crateFile1 from "./examples/item/empty/ro-crate-metadata.json";
import crateFile2 from "./examples/item/complex-collection/ro-crate-metadata.json";
import crateFile3 from "./examples/item/complex-item/ro-crate-metadata.json";
import crateFile4 from "./examples/item/large-crate/ro-crate-metadata.json";
import profile1 from "./examples/profile/profile-to-test-multiple-types.json";
import profile2 from "./examples/profile/profile-with-all-primitives.json";
import profile3 from "./examples/profile/profile-with-all-primitives-and-groups.json";
import profile4 from "./examples/profile/nyingarn-item-profile.json";
import profile5 from "./examples/profile/citation.profile.json";
import profile6 from "./examples/profile/dv.json";
import {DescriboCrateBuilderProps} from "../types";

const emptyProfile = {}
const profiles = { emptyProfile, profile1, profile2, profile3, profile4, profile5, profile6};

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
          profile1: profile1.metadata.name,
          profile2: profile2.metadata.name,
          profile3: profile3.metadata.name,
          profile4: profile4.metadata.name,
          profile5: profile5.metadata.name,
          profile6: profile6.metadata.name,
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

// Create a master template for mapping args to render the DescriboCrateBuilder component
const Template: StoryFn<typeof DescriboCrateBuilder> = (args) => <>

  <DescriboCrateBuilder {...args} />
  </>

export const Simple = Template.bind({});
Simple.args = {
  crate: crateTestData,
}

export const Blank = Template.bind({});
Blank.args = {
  crate: crateFile1,
  enableCratePreview: false,
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

export const NoLinkBrowser = Template.bind({});
NoLinkBrowser.args = {
  crate: crateFile2,
  enableReverseLinkBrowser: false,
  enableContextEditor: false,
  enableCratePreview: false,
  enableBrowseEntities: false,
}

export const EveryProp = Template.bind({});
EveryProp.args = {
  crate: crateFile2,
  profile: emptyProfile,
  showControls: true,
  enableReverseLinkBrowser: true,
  enableContextEditor: true,
  enableCratePreview: true,
  enableBrowseEntities: true,
  entityId: "./",
  enableInternalRouting: true,
  readonly: false,
  language: "en",
  tabLocation: "left"
} as DescriboCrateBuilderProps

