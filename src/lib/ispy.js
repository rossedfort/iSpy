const $ = require('jquery')
/* global chrome */

class Ispy {
  constructor () {
    this.lsContainer = $('#ispy-localStorageItems')
    this.warnContainer = $('#ispy-warnContainer')
    this.header = $('#ispy-header')

    $('#ispy-refreshBtn').click(() => {
      this.queryTabs()
    })
  }

  queryTabs () {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      this.requestData(tabs)
    })
  }

  requestData (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'ISPY' }, (response) => {
      this.drawHeader(tabs[0])
      if (response && Object.keys(JSON.parse(response.data)).length > 0) {
        this.drawItems(JSON.parse(response.data))
      } else {
        this.drawError()
      }
    })
  }

  drawHeader (tab) {
    this.clearHeader()
    this.header.append(`
      <h4 class="headline title">${this.truncate(tab.title)} </h4>
      <img class="favicon" width="25px" height="25px" src="${tab.favIconUrl}" alt="favicon"/>
    `)
  }

  drawItems (ls) {
    this.clearLsContainer()
    let keys = Object.keys(ls)
    let values = keys.map((key) => ls[key])

    keys.forEach((key, index) => {
      let item = this.lsItem(key, values[index], index)
      this.lsContainer.append(item)
    })
  }

  drawError () {
    this.clearError()
    this.warnContainer.append(`<p id="ispy-warn">No items in localStorage</p>`)
  }

  lsItem (key, value, index) {
    return `
      <div class="item" name="item">
        <span class="headline key" id="key-${index}">${key}: </span>
        <span class="value" id="value-${index}">${value}</span>
      </div>
    `
  }

  truncate (string) {
    if (string.length < 28) {
      return string
    } else {
      return string.slice(0, 28).concat('...')
    }
  }

  clearError () {
    this.warnContainer.empty()
  }

  clearLsContainer () {
    this.lsContainer.empty()
  }

  clearHeader () {
    this.header.empty()
  }
}

module.exports = Ispy
