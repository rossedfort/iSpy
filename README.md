# iSpy - A localStorage manager for chrome

### To Run Locally
```bash
git clone https://github.com/rossedfort/ispy.git
cd ispy
npm install
npm run build
```
* Visit the chrome extensions page
* Ensure `Developer Mode` is checked
* Select `Load Unpacked Extension`
* Chose the `build` directory inside of iSpy

![Imgur](http://i.imgur.com/8xH5TIT.gif)

---

### Code
```
ispy/
├── LICENSE
├── README.md
├── build
│   ├── content_script.js
│   ├── icon.png
│   ├── index.html
│   ├── index.js
│   ├── main.bundle.js
│   ├── manifest.json
│   └── master.css
├── package.json
├── scripts
│   ├── build.js
│   └── help.js
├── src
│   ├── content_script.js
│   ├── icon.png
│   ├── index.html
│   ├── index.js
│   ├── lib
│   │   ├── ispy.js
│   │   └── localStorageItem.js
│   ├── manifest.json
│   └── master.css
└── webpack.config.js
```
