let darkmode = false;
let darkmodeToggle = document.getElementById("darkmode-toggle");
let darkbuttons = document.getElementsByClassName("dark");
let one = document.querySelector(".one");
let two = document.querySelector(".two");
let three = document.querySelector(".three");
let four = document.querySelector(".four");
let five = document.querySelector(".five");
let six = document.querySelector(".six");
let seven = document.querySelector(".seven");
let eight = document.querySelector(".eight");
let nine = document.querySelector(".nine");
let zero = document.querySelector(".zero");

let plus = document.querySelector(".plus");
let minus = document.querySelector(".minus");
let multiply = document.querySelector(".multiple");
let divide = document.querySelector(".divide");
let equal = document.querySelector(".equal");
let deleteButton = document.querySelector(".delete");
let clearButton = document.querySelector(".C");
let percent = document.querySelector(".percent");
let dot = document.querySelector(".dot");
let C = document.querySelector(".C");
let CE = document.querySelector(".CE");
let result = document.querySelector(".num-output");
let history = document.querySelector(".num-input");

let historyScreen = document.getElementById("history-screen"); 
let historyContent = document.getElementById("history-content");
let historyArray = [];
let historyIndex = 0;

const buttons = document.querySelectorAll('.but');
const operators = ['+', '-', '*', '/'];
const maxFontSize = 36; // الحجم الأقصى للخط
const minFontSize = 24; // الحجم الأدنى للخط
const maxInputs = 20; // العدد الأقصى للمدخلات

buttons.forEach(button => {
  button.onclick = () => {
    const value = button.innerText;
    const currentValue = result.value;
    const inputLength = currentValue.length;

    if (inputLength < maxInputs || value === 'Del' || value === 'C' || value === 'CE' || value === '=' || value === '%') {
      if (!isNaN(value) || value === '.') {
        result.value += value;
      } else if (operators.includes(value)) {
        result.value += ` ${value} `;
      } else if (value === '=') {
        history.innerText = result.value;
        try {
          historyArray.push({
            calculation : result.value,
            result : eval(result.value)
          });
          localStorage.setItem(history, JSON.stringify(historyArray))
          result.value = eval(result.value);
          
        } catch {
          result.value = 'Error';
        }
      } else if (value === 'Del') {
        result.value = result.value.slice(0, -1);
      } else if (value === 'C') {
        result.value = '';
      } else if (value === '%') {
        result.value = result.value / 100;
      }

      // تعديل حجم الخط بناءً على طول المدخلات
      let fontSize = maxFontSize - Math.max(0, (inputLength - 6) * 2);
      result.style.fontSize = `${Math.max(minFontSize, fontSize)}px`;
    } else {
      alert("لقد وصلت للحد الأقصى للمدخلات.");
    }
  };
});

// تغيير النص في زر الـ CE إلى "()"
const ceButton = document.querySelector('.CE');
ceButton.innerText = '()';

ceButton.onclick = () => {
  const openCount = (result.value.match(/\(/g) || []).length;
  const closeCount = (result.value.match(/\)/g) || []).length;

  if (openCount > closeCount) {
    result.value += ')';
  } else {
    result.value += '(';
  }
};

darkmodeToggle.onclick = () => {
  darkmode = !darkmode;
  if (darkmode) {
    document.body.setAttribute("data-bs-theme", "dark");
    darkmodeToggle.checked = true;
    for (let i = 0; i < darkbuttons.length; i++) {
      darkbuttons[i].style.cssText = `background: #2E2F38;`;
    }
    historyScreen.style.background = "#555";
  } else {
    document.body.setAttribute("data-bs-theme", "light");
    darkmodeToggle.checked = false;
    for (let i = 0; i < darkbuttons.length; i++) {
      darkbuttons[i].style.cssText = `background: #D2D3DA; color:#111;`;
    }
    historyScreen.style.background = "#c9c9c9";
  }
};



// مثال على historyArray الذي يحتوي على الحسابات والنتائج


history.onclick = () => {
  if (historyScreen.classList.contains('show')) {
    historyScreen.classList.remove('show');
    historyScreen.classList.add('hiden');
  } else {
    historyContent.innerHTML = ""; // مسح المحتوى الحالي
    historyArray.forEach(item => {
      let calcDiv = document.createElement("div");
      calcDiv.className = "calculate";
      calcDiv.innerText = item.calculation;

      let resultDiv = document.createElement("div");
      resultDiv.className = "results";
      resultDiv.innerText = `= ${item.result}`;

      let breakLine = document.createElement("hr");
      breakLine.style.cssText = `color:black; height: 5px;`;
      historyContent.appendChild(breakLine);

      let deletedata = document.createElement("div");
      deletedata.innerText = "Delete";
      deletedata.onclick = () => {
        localStorage.clear()
        historyArray = [];
        historyContent.innerHTML = "";
        historyScreen.classList.remove('show');
        historyScreen.classList.add('hiden');
        
      }
      deletedata.style.cssText = `
      margin-top :15px;
      width : 100%;
      text-align: center;
      display:flex;
      align-items:center;
      justify-content:center;
      color : red;
      `
      historyScreen.appendChild(deletedata)
      historyContent.appendChild(calcDiv);
      historyContent.appendChild(resultDiv);
    });
    historyScreen.classList.remove('hiden');
    historyScreen.classList.add('show');
  }
};

// إخفاء شاشة التاريخ عند النقر خارجها
document.addEventListener('click', function(event) {
  if (!historyScreen.contains(event.target) && !history.contains(event.target)) {
    historyScreen.classList.add('hiden');
    historyScreen.classList.remove('show');
  }
});

window.onload = () =>{
  if(localStorage.getItem(history)){
    historyArray = JSON.parse(localStorage.getItem(history));
    history.innerText = historyArray[historyArray.length -1].calculation;
    result.value = historyArray[historyArray.length -1].result;
  }
}