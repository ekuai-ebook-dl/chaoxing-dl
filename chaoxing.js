// ==UserScript==
// @name         chaoxing download
// @version      0.2
// @description  超星课件下载
// @author       KUAI
// @match        *.edu.cn/knowledge/cards?*
// @grant        GPL
// ==/UserScript==

(function () {
  'use strict';
  const iframeList = document.getElementsByTagName("iframe")
  for (const e of iframeList) {
    const data = JSON.parse(e.attributes.data.value);
    const url = "//" + location.host + "/ananas/status/" + data.objectid;
    const req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = function () {
      if (this.status === 200) {
        const json = JSON.parse(this.response)
        if (json.pdf) {
          const filename = json.filename.substring(0, json.filename.indexOf(".")) + '.pdf'
          const save_link = document.createElement("div");
          save_link.innerHTML = `<input value="${filename}">
            <button onclick="window.open('${json.pdf}', '', 'location=no');">下载文件：${filename}</button>`
          e.parentNode.appendChild(save_link);
        }
      }
    };
    req.send();
  }
})();
