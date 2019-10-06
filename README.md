# iSpy - A localStorage manager for chrome <img src="https://raw.githubusercontent.com/rossedfort/iSpy/master/public/icon.png" width="20">

## iSpy aims to provide a user interface on top of the browser's native [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) API.

### In Google Chrome, it can take up to 5 or 6 clicks to access the interface to localStorage. _iSpy does it in 1_

#### Features

- [x] View all items in localStorage in _1 click_
- [x] Delete an item from localStorage
- [x] Edit an item in localStorage
- [ ] Reload all items from localStorage
- [ ] Delete all items from localStorage
- [ ] Add an item to localStorage

#### Want to help?
Thanks! Please see our [contributing guidelines](https://github.com/rossedfort/iSpy/blob/master/.github/CONTRIBUTING.md)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### To Run Locally
iSpy uses react-scripts for local development
```shell
npm install
npm start
```
* Visit the [chrome extensions page](chrome://extensions)
* Ensure `Developer Mode` is checked
* Select `Load Unpacked Extension`
* Choose the `iSpy/build` directory

<img src="https://i.imgur.com/guA0mjZ.gif" title="load unpacked extension" />

---

### Code
```
.
|-- LICENSE
|-- README.md
|-- package-lock.json
|-- package.json
|-- public
|   |-- content_script.js
|   |-- icon.png
|   |-- index.html
|   |-- manifest.json
|   `-- missing-favicon.png
|-- src
|   |-- App.css
|   |-- App.tsx
|   |-- LocalStorageEntry
|   |-- SettingsPanel
|   |-- TabInfo
|   |-- common
|   |-- constants
|   |-- contexts
|   |-- index.css
|   |-- index.tsx
|   |-- react-app-env.d.ts
|   |-- types
|   `-- utils
|-- tsconfig.json
`-- tslint.json
```
