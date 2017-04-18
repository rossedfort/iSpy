#!/usr/bin/env node

const exec = require('child_process').exec
const fs = require('fs')
const path = require('path')
const Promise = require('rsvp').Promise

class Build {
  constructor () {
    this.filesToMove = ['index.html', 'index.js', 'icon.png', 'content_script.js', 'master.css', 'manifest.json']
  }

  start (type) {
    let versions
    switch (type) {
      case '--help':
        this.help()
        break
      case '--patch':
        this.lint()
        versions = this.bump('patch')
        this.build(versions)
        break
      case '--minor':
        this.lint()
        versions = this.bump('minor')
        this.build(versions)
        break
      case '--major':
        this.lint()
        versions = this.bump('major')
        this.build(versions)
        break
      case '--dev':
        this.lint()
        this.build()
        break
      default:
        console.log('Unidentified option: ' + type)
    }
  }

  lint () {
    exec('npm run lint', (err, stdout, stderr) => {
      if (err) {
        console.log('You have some lint errors, please resolve them before completing a build')
        console.log(stdout)
      }
    })
  }

  bump (type) {
    let oldVersion = this.version
    let vArray = oldVersion.split('.')
    let newVersion
    switch (type) {
      case 'patch':
        vArray[2] = parseInt(vArray[2]) + 1
        newVersion = vArray.join('.')
        break
      case 'minor':
        vArray[1] = parseInt(vArray[1]) + 1
        newVersion = vArray.join('.')
        break
      case 'major':
        vArray[0] = parseInt(vArray[0]) + 1
        newVersion = vArray.join('.')
        break
      default:
        newVersion = oldVersion
    }
    return { old: oldVersion, new: newVersion }
  }

  build (versions) {
    if (versions) {
      this.updateVersions(versions).then(this.moveFiles)
    } else {
      this.moveFiles()
    }
    this.bundle()
  }

  moveFiles () {
    this.filesToMove.forEach((file) => {
      let source = path.join(__dirname, '../src', file)
      let target = path.join(__dirname, '../dist', file)
      this.copyFile(source, target)
    })
  }

  updateVersions (versions) {
    let packageJson = path.join(__dirname, '../', 'package.json')
    let manifestJson = path.join(__dirname, '../src', 'manifest.json')
    let files = [packageJson, manifestJson]
    let complete = []

    return new Promise((resolve, reject) => {
      files.forEach((file) => {
        this.updateFile(file, versions.new, () => {
          complete.push(file)
          console.log(`bumped version in ${file} from ${versions.old} to ~${versions.new}~\n`)
          if (complete.length === files.length) resolve()
        })
      })
    })
  }

  updateFile (file, newVersion, callback) {
    this.readFile(file).then((content) => {
      let newContent = JSON.parse(content)
      newContent.version = newVersion
      this.writeFile(file, newContent, callback)
    })
  }

  readFile (fullPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(fullPath, 'utf8', function (error, content) {
        if (error) {
          return reject(error)
        } else {
          return resolve(content)
        }
      })
    })
  }

  writeFile (fullPath, content, callback) {
    this.truncate(fullPath).then(() => {
      fs.writeFile(fullPath, JSON.stringify(content, null, 2), callback)
    })
  }

  copyFile (source, target) {
    fs.createReadStream(source).pipe(fs.createWriteStream(target))
  }

  truncate (fullPath) {
    return new Promise((resolve, reject) => {
      fs.truncate(fullPath, 0, (error) => {
        if (error) {
          return reject(error)
        } else {
          return resolve()
        }
      })
    })
  }

  handleError (error) {
    if (error) throw error
  }

  bundle () {
    exec('npm run bundle', (err, stdout, stderr) => {
      if (err) {
        console.log(stderr)
      } else {
        console.log(stdout)
      }
    })
  }

  get version () {
    return require(path.join(__dirname, '../package.json')).version
  }

  help () {
    console.log(
      `Current version: ${this.version}

        What it does:
          - Bumps the appropriate version numbers in both the manifest.json and package.json files
          - Builds a webpack bundle of the source code in /dist
          - Moves the necessary static files from /src into /dist

        Options:
          --help:
            Output this usage statement.

          --dev
            Build a development version without bumping version numbers

          --patch
            Build & Bump the patch version number (1.0.0 -> 1.0.1)

          --minor
            Build & Bump the minor version number (1.0.0 -> 1.1.0)

          --major
            Build & Bump the major version number (1.0.0 -> 2.0.0)


        Note: It is recommended that you don't interface with this script directly, rather run the
        corresponding npm scripts:

          npm run build.dev
          npm run release.patch
          npm run release.minor
          npm run release.major
      `
    )
  }
}

let build = new Build()
build.start(process.argv[process.argv.length - 1])
