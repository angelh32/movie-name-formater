import * as $ from 'jquery';
import { getMediaData } from './operations';
import { getNames, getSerie, updateNames } from './helpers/chrome';
import { parseInside, buildComposedName } from './helpers/helpers';

$(function() {
  const queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    $('#url').text(tabs[0].url);
  });

  // chrome.browserAction.setBadgeText({text: count.toString()});
  function updateList() {
    return updateNames()
      .then(() => getNames())
      .then(names => {
        $("#list").empty()
        return names.forEach(element => {
          const key = parseInside(element, "=","]");
          $("#list").append(`<div class="row my-auto">
          <p class="col-8 my-auto">${element}<span></p>
          <button id="${key}-copy" class="btn btn-dark chapter col-2">Copy</button>
          <button id="${key}-show" class="btn btn-dark chapter col-2">Show</button>
          </div>`);
          addShowEvent(key)
          return addCopyEvent(key)
        });
      })
  }

  updateList()
  function addCopyEvent(name: string) {
    const buttonId = `#${name}-copy`
    $(buttonId).click(() => {
      $(buttonId).text("Copying")
      return getSerie(name).then(serie => {
        const text: string = buildComposedName(serie)
        $(buttonId).text("Copied")
        return copyToClipboard(text)
      })
    })
  }

  function addShowEvent(name: string) {
    const buttonId = `#${name}-show`
    $(buttonId).click(() => {
      return getSerie(name).then(serie => {
        chrome.tabs.create({ url: serie.url });
      })
    })
  }

  $('#processpage').click(() => {
    processPage();
  });
  function processPage(): void {
    $('#processpage').text("Wait")
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      function parseData(result) {
        return getMediaData(tab.url, result[0])
          .then(() => updateList())
          .then(() => $('#processpage').text("Ready"))
      }
      const code = { code: 'document.body.innerHTML' };
      return chrome.tabs.executeScript(tab.id, code, parseData);
    });
  }
  $('#clear').click(() => {
    chrome.storage.local.clear(() => {
      updateList()
    });
  });
  processPage();
});

function copyToClipboard(str, mimeType="text/plain") {
  document.oncopy = function(event) {
    event.clipboardData.setData(mimeType, str);
    event.preventDefault();
  };
  document.execCommand("copy", false, null);
}
