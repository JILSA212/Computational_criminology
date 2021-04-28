document.querySelector('.toggler').onclick = () => {
    document.querySelector('.nav').classList.toggle('open');
  }
  if ($(window).width() < 1200) {
  
    $(".nav-link").click(function(){
        console.log("demo");
        $("#cl_btn").click();      
});
  }
 else {
    console.log("ssdemo");
 }

$(window).resize(function() {
  if ($(window).width() < 1200) {
    $(".nav-link").click(function(){
        console.log("demo");
        $("#cl_btn").click();
      
});
  }
 else {
    console.log("ssdemo");
 }
});
  