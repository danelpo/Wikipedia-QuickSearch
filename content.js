const modalID = "myPopupModalID";

document.addEventListener('dblclick', function () {
    //need to verify that a STRING is selected (not pictures, documents...)
    if(document.getSelection().getRangeAt(0).toString().trim().length > 0){
        let searchWord = document.getSelection().getRangeAt(0).toString().trim();
        retriveSearch(searchWord);
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
            const articleExtract = myJSON[Object.keys(myJSON)[0]].extract;
            const articleTitle = myJSON[Object.keys(myJSON)[0]].title;

            if(articleExtract){
                if(articleExtract.length > 45){
                    if(articleExtract.length > 700) {
                        makePopup(articleExtract.substring(0, 700)+"...", articleTitle);
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
    modal.style.fontFamily = 'font-family: "Times New Roman", Times, serif';
    modal.style.fontSize = "14px";
    modal.style.padding = "25px";
    modal.style.borderRadius = "5%";
    modal.style.overflow = "auto";

    modal.addEventListener('click', function(ev){
        ev.stopPropagation();
    }, false);

    let title = document.createElement('h1');
    title.innerHTML = articleTitle;
    modal.appendChild(title);

    modal.appendChild(document.createElement('hr'));

    let article = document.createElement('p');
    article.innerHTML = articleExtract;
    modal.appendChild(article);

    document.body.appendChild(modal);
}