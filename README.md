# Describo Crate Builder Component for react

This is a wrapper for the [Vue Crate Builder Component](https://github.com/describo/crate-builder-component) for applications using React.

# Installation

```
npm install --save @describo/crate-builder-component-react
```

or

```
yarn add @describo/crate-builder-component-react
```

# Usage

```tsx
import React, {useState} from 'react';
import {DescriboCrateBuilder} from "@describo/crate-builder-component-react";
import {JSONObject} from "@describo/crate-builder-component-react/lib/DescriboCrateBuilder";

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
      <DescriboCrateBuilder crate={exampleCrate} onSaveCrate={(updatedCrate) => setCrate(updatedCrate)} />
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
yarn
yarn storybook
```

# Caveats

The wrapper uses the web component build of [Vuejs Crate Builder Component](https://github.com/describo/crate-builder-component), which has a number of shortcomings. For example, web components only allow passing string, numeric and boolean parameters, which means you cannot pass an object or a callback functions. To work around this we save the configurations for the Vue component in a variable like `globalThis.DescriboCrateBuilderConfiguration_XXXX` (where XXXX is a random suffix) and notify the Vue component when contents of this object gets updated.

Vue's web component compiler also has its problems, like [this](https://github.com/vuejs/core/issues/4662) long-standing issue with inlining styles. We provide work arounds for this issue, but it comes with some (negligable) performance hit. 
