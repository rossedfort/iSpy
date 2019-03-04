# Contributor Guidelines

### Style Guide

iSpy follows the standard 'react-app' JavaScript styleguide that ships with create-react-app. You'll see lint warnings in the console while developing. Please fix them 🙌

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
* Make sure you follow the Pull Request Template

That's it! Thank you for your contribution!

---

### To Run Locally
iSpy uses react-scripts for local development
```shell
git clone https://github.com/rossedfort/iSpy.git
cd iSpy
yarn install
yarn start
```
* Visit the [chrome extensions page](chrome://extensions)
* Ensure `Developer Mode` is checked
* Select `Load Unpacked Extension`
* Chose the `iSPy/build` directory

![load unpacked extension](https://i.imgur.com/guA0mjZ.gif)

---

### Code
```
ispy
|-- LICENSE
|-- README.md
|-- .github
|-- build
|   |-- asset-manifest.json
|   |-- content_script.js
|   |-- icon.png
|   |-- index.html
|   |-- manifest.json
|   |-- missing-favicon.png
|   `-- static
|-- package.json
|-- public
|   |-- content_script.js
|   |-- icon.png
|   |-- index.html
|   |-- manifest.json
|   `-- missing-favicon.png
|-- src
|   |-- App.css
|   |-- App.js
|   |-- index.css
|   |-- index.js
|   `-- utils
`-- yarn.lock
```
