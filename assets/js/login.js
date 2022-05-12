window.addEventListener('load',function(){
    let elem=document.getElementById('error-box');
    console.log('elem=',elem);
    setTimeout(function(){
        elem.classList.add('invisible');
    },3000);
});