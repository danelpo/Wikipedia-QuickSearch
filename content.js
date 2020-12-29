console.log("Wikipedia QuickSearch is running");

//chrome.webNavigation.onCommitted.addEventListener('dblclick', function (e) {alert()})
document.addEventListener('dblclick', function () {
    alert(document.getSelection().getRangeAt(0).toString().trim());
})