const modalID = "myPopupModalID";

document.addEventListener('dblclick', function () {
    if(document.getSelection().type == "Range"){//something is selected
        if(typeof document.getSelection().focusNode.nodeValue == "string"){//a string is selected
            if(document.getSelection().getRangeAt(0).toString().trim().length > 0){//the string is not empty or whitespace
                let searchWord = document.getSelection().getRangeAt(0).toString().trim();
                retriveSearch(searchWord);
            }
        }
    }
});

document.addEventListener('click', function(e){
    if(document.getElementById(modalID)){
        document.getElementById(modalID).remove();
    }
}, false);

function retriveSearch(searchWord){
    console.log();
    let article = searchWord;

    const proxyURL = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&exintro=&explaintext=&titles=${article}`;
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
            const articleExtract = myJSON[Object.keys(myJSON)[0]].extract;
            const articleTitle = myJSON[Object.keys(myJSON)[0]].title;

            if(articleExtract){
                if(articleExtract.length > 45){
                    if(articleExtract.length > 650) {
                        makePopup(articleExtract.substring(0, 650)+"...", articleTitle);
                    }else{
                        makePopup(articleExtract, articleTitle);
                    }
                }
            }
        }
    }
}

function makePopup(articleExtract, articleTitle){
    let modal = document.createElement('div');
    modal.style.position = "fixed";
    modal.style.bottom = "2%";
    modal.style.right = "2%";
    modal.style.width = "25%";
    modal.style.height = "auto";
    modal.style.zIndex = "99";
    modal.style.backgroundColor = "white";
    modal.style.border = "2px solid rgba(0,0,0,0.1)";
    modal.id = modalID;
    modal.className = modalID;
    modal.style.padding = "25px";
    modal.style.borderRadius = "5%";
    modal.style.overflow = "auto";

    modal.addEventListener('click', function(ev){
        ev.stopPropagation();
    }, false);

        let title = document.createElement('h1');
        title.innerHTML = articleTitle;
        title.style = "font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji; color: black; " +
                    "font-weight: 600; font-size: 32px; padding: 0px; margin: 0px";
        modal.appendChild(title);

        let imageLink = document.createElement('a');
        imageLink.href = "https://en.wikipedia.org";
        imageLink.target = "_blank";

            let image = document.createElement('img');
            
            image.src = chrome.runtime.getURL("images/wikipedia-logo.png");
            image.style.position = "absolute";
            image.style.top = "35px";
            image.style.right = "25px";
            image.style.width = "30px";
            image.style.height = "30px";

            imageLink.appendChild(image);

        modal.appendChild(imageLink);
        
        if(window.location.hostname.slice(-13) != "wikipedia.org"){
            let lineBreak = document.createElement('hr')
            lineBreak.style = "color: rgba(0,0,0,0.2); border: 0.1px solid rgba(0,0,0,0.2); border-radius: 20%; padding: 0px; margin: 0px; margin-top:20px; margin-bottom: 10px;";
            modal.appendChild(lineBreak);
        }

        let article = document.createElement('p');
        
        article.innerHTML = articleExtract;
        article.style = "font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji; " + 
                        "line-height: 26px; font-size: 16px; color: black; padding: 0px; margin: 0px;";

        modal.appendChild(article);

        const link = `https://en.wikipedia.org/wiki/${articleTitle}`;
        
        let articleLink = document.createElement('a');
        articleLink.innerHTML = "Read more";
        articleLink.href = link;
        articleLink.title = link;
        articleLink.target = "_blank";
        articleLink.style = "color: gray; float: right; font-size: 12px";

        modal.appendChild(articleLink);

    document.body.appendChild(modal);
}