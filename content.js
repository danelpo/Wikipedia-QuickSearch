console.log("Wikipedia QuickSearch is running");

//chrome.webNavigation.onCommitted.addEventListener('dblclick', function (e) {alert()})
document.addEventListener('dblclick', function () {
    //need to verify that a STRING is selected (not pictures, documents...)
    if(document.getSelection().getRangeAt(0).toString().trim().length > 0){
        let searchWord = document.getSelection().getRangeAt(0).toString().trim();
        retriveSearch(searchWord);
    }
})

function retriveSearch(searchWord){
    console.log();
    let article = searchWord;

    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&titles=${article}`;
    const http = new XMLHttpRequest();

    try {
        if(window.location.hostname.slice(-13) != "wikipedia.org"){
            http.open("GET", (proxyURL + url));
        }else{
            http.open("GET", url);
        }
        http.setRequestHeader('Access-Control-Allow-Origin', '*');
        http.send();
    } catch (error) {
        console.log(error);
    }

    http.onreadystatechange=(e)=>{
        if (http.readyState == 4 && http.status == 200) {
            const myJSON = JSON.parse(http.responseText).query.pages;
            let articleExtract = myJSON[Object.keys(myJSON)[0]].extract;
            console.log(articleExtract);

        }
    }
}