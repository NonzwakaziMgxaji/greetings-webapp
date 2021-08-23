document.addEventListener('DOMContentLoaded', function(){
    let errorElem = document.querySelector('.errorMsg');
    if (errorElem.innerHTML !== ''){
        setTimeout(function(){
            errorElem.innerHTML = '';
        }, 3000);
    }
});
