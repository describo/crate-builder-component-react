import React from "react";
import {Meta, StoryFn} from "@storybook/react";
import CustomMDXDocumentation from './Custom-MDX-Documentation.mdx';
import DescriboCrateBuilder from "../DescriboCrateBuilder";
import crateTestData from "./ro-crate-metadata.json"
import crateFile1 from "./examples/item/empty/ro-crate-metadata.json";
import crateFile2 from "./examples/item/complex-collection/ro-crate-metadata.json";
import crateFile3 from "./examples/item/complex-item/ro-crate-metadata.json";
import crateFile4 from "./examples/item/large-crate/ro-crate-metadata.json";
import profile1 from "./examples/profile/test-profile-without-groups.json";
import profile2 from "./examples/profile/test-profile-with-groups.json";
import profile3 from "./examples/profile/test-profile-with-datapacks-and-without-groups.json";
import profile4 from "./examples/profile/nyingarn-item-profile.json";

const emptyProfile = {}
const profiles = { emptyProfile, profile1, profile2, profile3, profile4 };

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
          profile1: "Profile 1",
          profile2: "Profile 2",
          profile3: "Profile 3",
          profile4: "Profile 4",
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
}

export const Blank = Template.bind({});
Blank.args = {
  crate: crateFile1
}

export const ComplexCollection = Template.bind({});
ComplexCollection.args = {
  crate: crateFile2
}

export const ComplexItem = Template.bind({});
ComplexItem.args = {
  crate: crateFile3
}

export const LargeCrate = Template.bind({});
LargeCrate.args = {
  crate: crateFile4
}




// Reuse that template for creating different stories
// export const Primary = Template.bind({});
// Primary.args = { label: "Primary 😃", size: "large", type: "primary", onClick:(() => alert('primary clicked'))};
//
// export const Secondary = Template.bind({});
// Secondary.args = { ...Primary.args, type: "secondary", label: "Secondary 😇", onClick:(() => alert('secondary clicked')) };


const testCrate1 = {
  "@context": "https://w3id.org/ro/crate/1.1/context",
  "@graph": [
    {
      "@type": "CreativeWork",
      "@id": "ro-crate-metadata.json",
      "conformsTo": {"@id": "https://w3id.org/ro/crate/1.1"},
      "about": {"@id": "./"}
    },
    {
      "@id": "./",
      "identifier": "https://doi.org/10.4225/59/59672c09f4a4b",
      "@type": "Dataset",
      "datePublished": "2017",
      "name": "Data files associated with the manuscript:Effects of facilitated family case conferencing for ...",
      "description": "Palliative care planning for nursing home residents with advanced dementia ...",
      "license": {"@id": "https://creativecommons.org/licenses/by-nc-sa/3.0/au/"}
    },
    {
      "@id": "https://creativecommons.org/licenses/by-nc-sa/3.0/au/",
      "@type": "CreativeWork",
      "description": "This work is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Australia License. To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/3.0/au/ or send a letter to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.",
      "identifier": "https://creativecommons.org/licenses/by-nc-sa/3.0/au/",
      "name": "Attribution-NonCommercial-ShareAlike 3.0 Australia (CC BY-NC-SA 3.0 AU)"
    }
  ]
}
