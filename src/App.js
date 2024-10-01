let btns = document.querySelectorAll(".btn");
let clear = document.querySelector(".clear");
let breaks = document.querySelector(".breaks");
let percentage = document.querySelector(".percentage");
let divide = document.querySelector(".divide");
let times = document.querySelector(".times");
let minus = document.querySelector(".minus");
let plus = document.querySelector(".plus");
let equal = document.querySelector(".equal");
let seven = document.querySelector(".seven");
let eight = document.querySelector(".eight");
let nine = document.querySelector(".nine");
let four = document.querySelector(".four");
let five = document.querySelector(".five");
let six = document.querySelector(".six");
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let zero = document.querySelector(".zero");
let dot = document.querySelector(".dot");
let del = document.querySelector(".del");
let num = document.querySelectorAll(".num");
let modeBtn = document.querySelector(".mode-btn");

// 1 ===> left 
// 2 ===> right
let breakPos = 2;
window.onload = () => {
  num[0].innerHTML = "";
  num[1].innerHTML = "";
  openFullscreen()
  fullScreen()
}
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.style.cssText = `
    border-radius : 15px;
    transition-duration : 0.5s;
    `;
    setTimeout(() => {
      btn.style.cssText = `
      border-radius : 50px;
      transition-duration : 0.5s;
      `;
    }, 500)
  })
})
clear.addEventListener("click", () => {
  num[0].innerHTML = "";
  num[1].innerHTML = "";
  breakPos = 2;
})
function openFullscreen() {
  let elem = document.getElementById("root");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { // Chrome, Safari, and Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { // IE/Edge
    elem.msRequestFullscreen();
  }
}
function fullScreen() {
  window.scrollBy({
    top: 200,
    behavior: 'smooth'
  });
};
one.addEventListener("click", () => {
  num[1].innerHTML += "1";
  changeValue()
})
two.addEventListener("click", () => {
  num[1].innerHTML += "2";
  changeValue()
})
three.addEventListener("click", () => {
  num[1].innerHTML += "3";
  changeValue()
})
four.addEventListener("click", () => {
  num[1].innerHTML += "4";
  changeValue()

})
five.addEventListener("click", () => {
  num[1].innerHTML += "5";
  changeValue()

})
six.addEventListener("click", () => {
  num[1].innerHTML += "6";
  changeValue()

})
seven.addEventListener("click", () => {
  num[1].innerHTML += "7";
  changeValue()

})
eight.addEventListener("click", () => {
  num[1].innerHTML += "8";
  changeValue()

})
nine.addEventListener("click", () => {
  num[1].innerHTML += "9";
  changeValue()

})
zero.addEventListener("click", () => {
  num[1].innerHTML += "0";
  changeValue()

})
dot.addEventListener("click", () => {
  if (
    num[1].innerHTML.slice(-1) === " " ||
    num[1].innerHTML === ""
  ) {
    num[1].innerHTML += "0."; // لو آخر قيمة عملية حسابية، نضيف 0.
  } else {
    num[1].innerHTML += ".";  // لو مش عملية حسابية، نضيف نقطة فقط.
  }
})
plus.addEventListener("click", () => {
  if (num[1].innerHTML === "" ||
    num[1].innerHTML.slice(-1) === " "
  ) {

  } else {
    num[1].innerHTML += " + ";
  }
})
minus.addEventListener("click", () => {
  if (num[1].innerHTML === "" ||
    num[1].innerHTML.slice(-1) === " "
  ) {

  } else {
    num[1].innerHTML += " - ";
  }
})
times.addEventListener("click", () => {
  if (num[1].innerHTML === "" ||
    num[1].innerHTML.slice(-1) === " "
  ) {

  } else {
    num[1].innerHTML += " × ";
  }
})
divide.addEventListener("click", () => {
  if (num[1].innerHTML === "" ||
    num[1].innerHTML.slice(-1) === " "
  ) {

  } else {
    num[1].innerHTML += " ÷ ";
  }
})
/*percentage.addEventListener("click", () => {
  if (num[1].innerHTML === "" || num[1].innerHTML.slice(-1) === " ") { } else { num[1].innerHTML += " % "; }})*/
del.addEventListener("click", () => {
  if (num[1].innerHTML.slice(-1) === " ") {
    num[1].innerHTML = num[1].innerHTML.slice(0, -3);
  } else {
    if (num[1].innerHTML.slice(-1)) {
      breakPos = 1;
    }
    num[1].innerHTML = num[1].innerHTML.slice(0, -1);
  }
})
breaks.addEventListener("click", () => {
  if (breakPos === 1) {
    num[1].innerHTML += ")";
    breakPos = 2;
  } else {
    num[1].innerHTML += "(";
    breakPos = 1;
  }
})
equal.addEventListener("click", ()=>{
  equation()
})
function equation() {
  // استبدال الرموز مباشرة بدلاً من التكرار
  let operationStr = num[1].innerHTML.replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "/100");

  console.log(operationStr);

  // استخدام eval لحساب النتيجة
  let result = eval(operationStr);

  // تحديث الشاشة بالعملية السابقة والنتيجة
  num[0].innerHTML = num[1].innerHTML;
  num[1].innerHTML = result;
}
function changeValue(){
  try{
    let operationStr = num[1].innerHTML.replace(/×/g, "*").replace(/÷/g, "/").replace(/%/g, "/100");
    let result = eval(operationStr);
    num[0].innerHTML = result;
  }catch{}
}