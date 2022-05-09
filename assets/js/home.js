const elem=document.getElementById('delete-acct');
const elem0=document.getElementById('log-out');
const elem2=document.getElementById('confirm-box');
const elem3=document.getElementById('confirm-box-2');
const opt_no=document.getElementById('no-1');
const opt_no2=document.getElementById('no-2');
opt_no.addEventListener('click',function(){
    elem2.classList.remove('visible');
});
opt_no2.addEventListener('click',function(){
    elem3.classList.remove('visible');
});
elem.addEventListener('click',function(event){
    event.preventDefault();
    elem2.classList.toggle('visible');
});
elem0.addEventListener('click',function(event){
    event.preventDefault();
    elem3.classList.toggle('visible');
});