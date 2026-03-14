// <![CDATA[

// chống bôi đen
document.onselectstart = () => false;

// chỉ cho phép trang chủ
if(location.pathname !== "/" && location.pathname !== "/index.html"){
document.body.innerHTML="";
}

// hash password
var passwordHash="dbffa3f32bf3223c0510df12c822d591848e03c1b9073cc74a3753155e017647";
var soLanSai=0;

// khi load trang
window.onload=function(){

var locker=document.getElementById("blog-locker");

if(sessionStorage.getItem("isAuth")==="true"){
if(locker) locker.style.display="none";
}else{
if(locker) locker.style.display="block";
}

var f=document.getElementById("pass-field");
if(f) f.value="";

}

// mở menu sidebar
function toggleMenu(id){
var menu=document.getElementById(id);
if(menu){
menu.style.display=(menu.style.display==="block")?"none":"block";
}
}

// kiểm tra password
async function checkPass(){

var field=document.getElementById("pass-field");
if(!field) return;

var entered=field.value;

const encoder=new TextEncoder();
const data=encoder.encode(entered);

const hashBuffer=await crypto.subtle.digest("SHA-256",data);
const hashArray=Array.from(new Uint8Array(hashBuffer));
const hashHex=hashArray.map(b=>b.toString(16).padStart(2,"0")).join("");

if(hashHex===passwordHash){

sessionStorage.setItem("isAuth","true");

var locker=document.getElementById("blog-locker");
if(locker) locker.style.display="none";

}else{

soLanSai++;

if(soLanSai>=2){

alert("BẠN ĐÃ NHẬP SAI 2 LẦN! Truy cập bị từ chối.");

window.location.href="https://blogger.googleusercontent.com/img/a/AVvXsEgyhBuunKnUwYTLOVo4AuW3qb3DY7oBvfgKsEUQhVAMXnC0lOoC9BL1rFFSmKXqF27OxOmuEtC0FeAtKoGTkrSgMP7G0saNhHAAaN6Qsxtetg-DJMA24frzEJPy1ciDNRK-ZjxGaHo4aB7VSjAMXgfLyFnQ1LtXlcuWpxgZ2cEehNFKyw-bvxdTTgiuOYME=w529-h588";

}else{

alert("Sai mã rồi! Bạn còn "+(2-soLanSai)+" lần thử lại.");

field.value="";
field.focus();

}
}
}

// bắt phím Enter trong ô password
var pf=document.getElementById("pass-field");

if(pf){
pf.addEventListener("keyup",function(e){
if(e.key==="Enter"){
checkPass();
}
});
}

// chặn chuột phải
document.addEventListener("contextmenu",function(e){
e.preventDefault();
});

// chặn F12 + devtool
document.addEventListener("keydown",function(e){

if(e.key==="F12"){
e.preventDefault();
}

if(e.ctrlKey && e.shiftKey && ["I","J","C"].includes(e.key)){
e.preventDefault();
}

if(e.ctrlKey && e.key==="u"){
e.preventDefault();
}

});

// spam console
setInterval(function(){

console.clear();

console.log("%cDỪNG LẠI!",
"color:red;font-size:40px;font-weight:bold");

console.log("%cKhu vực bảo mật của PQ TOOLS. Đừng cố soi code vô ích!",
"font-size:16px;color:#ff4d4d");

},1000);

// ]]>
