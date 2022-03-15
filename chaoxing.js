// ==UserScript==
// @name         chaoxing download
// @version      0.1
// @description  超星课件下载
// @author       KUAI
// @match        *.edu.cn/knowledge/cards?*
// @grant        GPL
// ==/UserScript==

(function () {
  'use strict';
  const data = JSON.parse(document.getElementsByTagName("iframe")[0].attributes.data.value);
  const url = "//" + location.host + "/ananas/status/" + data.objectid;
  let req = new XMLHttpRequest();
  req.open("GET", url, true);
  req.onload = function () {
    if (this.status === 200) {
      const json = JSON.parse(this.response)
      const filename = json.filename.substring(0, json.filename.indexOf(".")) + '.pdf'
      let save_link = document.createElement("div");
      save_link.innerHTML = `
      <button onclick="window.open('${json.pdf}', '', 'location=no');">下载文件：${filename}</button>
      <input value="${filename}">`
      save_link.style = "margin-top:-50px;"
      document.body.appendChild(save_link);
    }
  };
  req.send();
})();
