# React Toolkit

[![npm version](https://img.shields.io/npm/v/@tonydinh/react-toolkit.svg?)](https://www.npmjs.com/package/@tonydinh/react-toolkit)
[![npm downloads](https://img.shields.io/npm/dt/@tonydinh/react-toolkit.svg)](https://www.npmjs.com/package/@tonydinh/react-toolkit)
[![npm downloads](https://img.shields.io/npm/dm/@tonydinh/react-toolkit.svg)](https://www.npmjs.com/package/@tonydinh/react-toolkit)

React Toolkit is a collection of re-useable [React](https://facebook.github.io/react/) components. See the documentation [here](https://tony-dinh.github.io/react-toolkit/).

The guide below explains how one might integrate this module using [webpack](https://webpack.github.io/) as a module bundler.

## Installation
```
$ npm install --save @tonydinh/react-toolkit
```

## Prerequisites
It might be useful to configure webpack with an alias for resolving the components in this module.

```js
// webpack.config.js
const config = {
...
    resolve: {
        alias: {
            "react-toolkit": 'node_modules/@tonydinh/react-toolkit/dist/components'
        }
    }
}
```

## Importing
With the configuration above, we can import components from the module with:

```jsx
import Button from 'react-toolkit/button'
```

## Developing
### Requirements
The module supports the latest [Node LTS](https://github.com/nodejs/LTS).

### Getting Started
Once you have cloned the [repository](https://github.com/tony-dinh/react-toolkit), run the following at the `$PROJECT_ROOT` to start the development server.

```
$ npm i && npm start
```
