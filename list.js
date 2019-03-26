var port = chrome.runtime.connect({name: "list"});
port.postMessage({head: "ok"});
port.onMessage.addListener(function(msg) {
  if (msg.answer == "4"){
	  document.querySelector("#panel > tbody > tr:nth-child(5) > td:nth-child(8) > a").click();
  }
});