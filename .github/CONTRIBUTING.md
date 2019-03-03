# Contributor Guidelines

### Versioning

iSpy attempts to follow Semantic Versioning. If you submit a pull request, please make sure you run the
`npm command` to build a release that corresponds to the work you've done. If you fix a bug, run `npm run release.patch`, etc.

### Style Guide

iSpy follows the 'Standard' JavaScript styleguide found [here](https://standardjs.com/index.html). iSpy comes with eslint installed,
so please make sure you lint your code before submitting a pull request

### Pull Requests

Before you submit your Pull Request consider the following guidelines:

* Search [GitHub](https://github.com/rossedfort/iSpy/pulls) for an open or closed PR that relates to your submission. You don't want to duplicate effort.
* Fork the repo
* Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

* Create your patch.
* Commit your changes using a descriptive commit message that follows standard commit message conventions.

     ```shell
     git commit -a
     ```
  Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

* Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

* In GitHub, send a pull request to `iSpy:master`.

That's it! Thank you for your contribution!

---

### To Run Locally
```shell
git clone https://github.com/rossedfort/iSpy.git
cd iSpy
npm install
npm run build.dev
```
* Visit the chrome extensions page
* Ensure `Developer Mode` is checked
* Select `Load Unpacked Extension`
* Chose the `iSPy/dist` directory

<img src="http://i.imgur.com/yAQuYqP.gif" width="640" />

---

### Create your patch

`npm run build` will output the usage statement for the build script

What it does:
  - Bumps the appropriate version numbers in both the manifest.json and package.json files (if it's not a dev build)
  - Builds a webpack bundle of the source code in /dist
  - Moves the necessary static files from /src into /dist

Options:

  * `--dev` Builds a development version without bumping version numbers

  * `--patch` Builds & Bumps the patch version number `(1.0.0 -> 1.0.1)`

  * `--minor` Builds & Bumps the minor version number `(1.0.0 -> 1.1.0)`

  * `--major` Builds & Bumps the major version number `(1.0.0 -> 2.0.0)`


Note: It is recommended that you don't interface with the build.js directly, rather run the
corresponding npm scripts:
* `npm run build.dev`
* `npm run release.patch`
* `npm run release.minor`
* `npm run release.major`

---

### Code
```
ispy/
├── LICENSE
├── README.md
├── bin                               <- scripts to build the app into an extension
│   └── build.js
├── dist                              <- the app gets compiled here DO NOT EDIT THIS CODE!
│   ├── content_script.js
│   ├── icon.png
│   ├── index.html
│   ├── index.js
│   ├── main.bundle.js
│   ├── manifest.json
│   ├── master.css
│   └── missing-favicon.png
├── package.json
├── src                                <- the source code
│   ├── content_script.js
│   ├── icon.png
│   ├── index.html
│   ├── index.js
│   ├── lib
│   │   └── ispy.js
│   ├── manifest.json
│   ├── master.css
│   └── missing-favicon.png
└── webpack.config.js
```
