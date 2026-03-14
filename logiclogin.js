if(location.pathname!="/"){
document.body.innerHTML="";
}

// <![CDATA[
  
if(location.pathname!="/"){
document.body.innerHTML="";
}

if (sessionStorage.getItem("isAuth") === "true") {
  document.getElementById("blog-locker").style.display = "none";
}


    // Hàm mở menu sidebar
    function toggleMenu(id){
      var menu = document.getElementById(id);
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    }

    // LOGIC KHÓA MÀN HÌNH
     var passwordHash = "dbffa3f32bf3223c0510df12c822d591848e03c1b9073cc74a3753155e017647";
	 var soLanSai = 0;

		window.onload = function() {

  if (sessionStorage.getItem("isAuth") === "true") {
    var locker = document.getElementById("blog-locker");
    if (locker) locker.style.display = "none";
  }

  var f = document.getElementById("pass-field");
  if (f) f.value = "";

}

async function checkPass() {

  var entered = document.getElementById("pass-field").value;

  const encoder = new TextEncoder();
  const data = encoder.encode(entered);

  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const hashHex = hashArray.map(b => b.toString(16).padStart(2,"0")).join("");

  console.log(hashHex);

  if (hashHex === passwordHash) {

    sessionStorage.setItem("isAuth","true");
    document.getElementById("blog-locker").style.display = "none";

  } else {

    soLanSai++;

    if (soLanSai >= 2) {

      alert("BẠN ĐÃ NHẬP SAI 2 LẦN! Truy cập bị từ chối.");
      window.location.href="https://blogger.googleusercontent.com/img/a/AVvXsEgyhBuunKnUwYTLOVo4AuW3qb3DY7oBvfgKsEUQhVAMXnC0lOoC9BL1rFFSmKXqF27OxOmuEtC0FeAtKoGTkrSgMP7G0saNhHAAaN6Qsxtetg-DJMA24frzEJPy1ciDNRK-ZjxGaHo4aB7VSjAMXgfLyFnQ1LtXlcuWpxgZ2cEehNFKyw-bvxdTTgiuOYME=w529-h588";

    } else {

      alert("Sai mã rồi! Bạn còn " + (2 - soLanSai) + " lần thử lại.");
      document.getElementById("pass-field").value="";
      document.getElementById("pass-field").focus();

    }
  }
}

    // Bắt phím Enter
    var pf=document.getElementById("pass-field");

if(pf){
var pf = document.getElementById("pass-field");

if(pf){
  pf.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
      checkPass();
    }
  });
}
    // Xử lý URL mobile ?m=1
    if (location.href.indexOf("?m=1") !== -1) {
      var clean = location.href.replace("?m=1","");
      window.history.replaceState(null, null, clean);
    }


  // block12rightclick
  document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
  
  document.onkeydown = function(e) {
    var isCtrlShift = e.ctrlKey && e.shiftKey;
    // F12
    if (e.keyCode == 123) return false;
    // Ctrl+Shift+I, J, C
    if (isCtrlShift && (e.keyCode == 73 || e.keyCode == 74 || e.keyCode == 67)) return false;
    // Ctrl+U (Xem source)
    if (e.ctrlKey && e.keyCode == 85) return false;
  };

  // 
  setInterval(function() {
    console.clear();
    console.log("%cDỪNG LẠI!", "color: red; font-size: 40px; font-weight: bold; -webkit-text-stroke: 1px black;");
    console.log("%cKhu vực bảo mật của PQ TOOLS. Đừng cố soi code vô ích!", "font-size: 16px; color: #ff4d4d;");
  }, 1000);

	//
	document.addEventListener("keydown", function(e) {

  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }

  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }

  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    e.preventDefault();
  }

  if (e.key === "F12") {
    e.preventDefault();
  }

});


// ]]>
