document.getElementById("formButton").addEventListener("click", switchToForm);

document.getElementById("nameSubmitText").addEventListener("keydown", changeInEmailMe);
document.getElementById("nameSubmitText").addEventListener("paste", changeInEmailMe);
document.getElementById("nameSubmitText").addEventListener("input", changeInEmailMe);

document.getElementById("emailSubmitText").addEventListener("keydown", changeInEmailMe);
document.getElementById("emailSubmitText").addEventListener("paste", changeInEmailMe);
document.getElementById("emailSubmitText").addEventListener("input", changeInEmailMe);

document.getElementById("messageSubmitText").addEventListener("keydown", changeInEmailMe);
document.getElementById("messageSubmitText").addEventListener("paste", changeInEmailMe);
document.getElementById("messageSubmitText").addEventListener("input", changeInEmailMe);

document.getElementById("formSubmitButton").addEventListener("click", clearFormReturn);

function switchToForm(){
    document.getElementById("popupWrapper").style.display = "none";
    document.getElementById("formWrapper").style.display = "block";
}

function changeInEmailMe(){
    document.getElementById("formSubmitButton").setAttribute("disabled", true);
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(document.getElementById("nameSubmitText").value.length < 1 || !re.test(document.getElementById("emailSubmitText").value) || document.getElementById("messageSubmitText").value.length < 5) return;
    document.getElementById("formSubmitButton").removeAttribute("disabled");
}

function clearFormReturn(){
    document.getElementById("userSubmissionForm").submit();
    document.getElementById("nameSubmitText").value = "";
    document.getElementById("emailSubmitText").value = "";
    document.getElementById("messageSubmitText").value = "";
    document.getElementById("formSubmitButton").setAttribute("disabled", true);
    document.getElementById("popupWrapper").style.display = "block";
    document.getElementById("formWrapper").style.display = "none";
}