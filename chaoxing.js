// ==UserScript==
// @name         chaoxing download
// @version      0.4
// @description  超星课件下载
// @author       KUAI
// @match        *.edu.cn/knowledge/cards?*
// @match        *.edu.cn/coursedata/toPreview?*
// @grant        GPL
// ==/UserScript==

(function () {
  'use strict';
  const WPSExport = (objectid) => {
    $.getJSON('//' + location.host + '/ananas/wpsview?objectId=' + objectid, function (json) {
      window.open(json.data[0].originPlayUrl)
    })
  }
  const iframeList = document.getElementsByTagName("iframe")
  for (const e of iframeList) {
    const data = JSON.parse(e.attributes.data.value.replaceAll("'", "\""));
    const url = "//" + location.host + "/ananas/status/" + data.objectid;
    $.getJSON(url, function (json) {
      const filename = json.filename.substring(0, json.filename.indexOf(".")) + '.pdf'
      const save_link = document.createElement("div");
      save_link.innerHTML = `<input value="${filename}">
          <button onclick="window.open('${json.pdf}', '', 'location=no');">下载超星PDF：${filename}</button>
          <button onclick="(${WPSExport.toString()})('${data.objectid}')">WPS导出PDF</button>
          <button onclick="try{location.href='${json.download}'}catch(e){alert(e)}">尝试下载：${json.filename}</button>`
      e.parentNode.appendChild(save_link);
    })
  }
})();
