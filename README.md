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


# Testing

To try the component you can use the included storybook:

```
yarn
yarn storybook
```

# Caveats

The wrapper uses the web component build of [Vuejs Crate Builder Component](https://github.com/describo/crate-builder-component), which has a number of shortcomings. For example, web components only allow passing string, numeric and boolean parameters, which means you cannot pass an object or a callback functions. To work around this we save the configurations for the Vue component in a variable like `globalThis.DescriboCrateBuilderConfiguration_XXXX` (where XXXX is a random suffix) and notify the Vue component when contents of this object gets updated.

Vue's web component compiler also has its problems, like [this](https://github.com/vuejs/core/issues/4662) long-standing issue with inlining styles. We provide work arounds for this issue, but it comes with some (negligable) performance hit. 
