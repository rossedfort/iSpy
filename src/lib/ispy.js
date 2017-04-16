const $ = require('jquery')
/* global chrome */

class Ispy {
  constructor () {
    this.lsContainer = $('#ispy-localStorageItems')
    this.warnContainer = $('#ispy-warnContainer')

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
      if (response && Object.keys(JSON.parse(response.data)).length > 0) {
        this.drawItems(JSON.parse(response.data))
      } else {
        this.drawError()
      }
    })
  }

  drawItems (ls) {
    this.clearLsContainer()
    let keys = Object.keys(ls)
    let values = keys.map((key) => ls[key])

    return keys.map((key, index) => {
      let item = this.lsItem(key, values[index], index)
      this.lsContainer.append(item)
    })
  }

  lsItem (key, value, index) {
    return `
      <div class="item" name="item">
        <span class="headline key" id="key-${index}">${key}: </span>
        <span class="value" id="value-${index}">${value}</span>
      </div>
    `
  }

  drawError () {
    this.clearError()
    $('#ispy-warnContainer').append(`<p id="ispy-warn">No items in localStorage</p>`)
  }

  clearError () {
    this.warnContainer.empty()
  }

  clearLsContainer () {
    this.lsContainer.empty()
  }
}

module.exports = Ispy
