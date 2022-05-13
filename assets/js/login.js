window.addEventListener('load',function(){
    let elem=document.getElementById('error-box');
    if(elem){
        let butt=document.getElementById('retry-login');
        butt.addEventListener('click',function(){
            elem.classList.add('invisible');
        });
    }
});