# Note

For the main Describo project visit: https://www.npmjs.com/package/@describo/crate-builder-component-react

This is a fork of the Crate Builder Component for React for use in the [ARP project](https://researchdata.hu/en). Contains additions and modifications necessary for the ARP project that are not present/required/supported by the original component. We, however, try to keep compatibilioty with the original project as much as possible and update to its new version.

The package version matches the latest version  of the original Crate Builder Component for React project (eg. 0.80.0) and an additional `-arp.X` marks the patch version for ARP. For example, `0.80.0-arp.12` is based on the `0.80.0` version of the Crate Builder Component for React and is the `12th` patched version of it for use in ARP.


# Describo Crate Builder Component for react

This is a wrapper for the [Vue Crate Builder Component](https://github.com/describo/crate-builder-component) for applications using React.

# Installation

```
npm install --save @arpproject/crate-builder-component-react
```

or

```
yarn add @arpproject/crate-builder-component-react
```

# Usage

```tsx
import React, {useState} from 'react';
import {DescriboCrateBuilder, JSONObject} from "@arpproject/crate-builder-component-react";
import "@arpproject/crate-builder-component-react/style.css";

const exampleCrate = {
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
      "identifier": "https://doi.org/10.4225/59/11111111",
      "@type": "Dataset",
      "datePublished": "2017",
      "name": "Dataset name",
      "description": "Dataset description",
    }
  ]
}

function App() {
  const [crate, setCrate] = useState<JSONObject>(exampleCrate)
  return (
    <>
      <DescriboCrateBuilder crate={exampleCrate} onSaveCrate={(crateValue) => setCrate(crateValue.crate)} />
      <pre>
        {JSON.stringify(crate, null, 2)}
      </pre>
    </>
  );
}

export default App;
```

_Note: in the example above we set the inital value of the crate from `exampleCrate` and not `crate` so that we don't update the Vue component's crate vaue whenever onSaveCrate() is called, which will cause reloading of teh component and will result in flickering._

# Testing

To try the component you can use the included storybook:

```
npm i
npm run storybook
```

# CSS customization of the crate builder

You can customize some aspects of the crate builder by overriding CSS of various elements. For example, to make the
layout tab texts smaller and green you can create a `styles.css`:

```css
.el-tabs__header * {
    font-size: 1rem;
    color: forestgreen;
}
```

and use it in `App.tsx` like this:

```tsx
import React, {useState} from 'react';
import {DescriboCrateBuilder, JSONObject} from "@arpproject/crate-builder-component-react";
import "@arpproject/crate-builder-component-react/style.css";
import "./styles.css";

...
```
