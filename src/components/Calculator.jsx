import "./Calculator.css";

function Calculator() {
  function theme1() {
    document.body.classList.remove("theme-2");
    document.body.classList.remove("theme-3");
    document.body.classList.add("theme-1");
    document.getElementById("indicator").style.left = "0";
  }

  function theme2() {
    document.body.classList.remove("theme-1");
    document.body.classList.remove("theme-3");
    document.body.classList.add("theme-2");
    document.getElementById("indicator").style.left = "35%";
  }

  function theme3() {
    document.body.classList.remove("theme-1");
    document.body.classList.remove("theme-2");
    document.body.classList.add("theme-3");
    document.getElementById("indicator").style.left = "70%";
  }

  return (
    <div className="calculator-container">
      <div className="claculator-header">
        <p>calc</p>
        <div class="theme-toggle-container">
          <span>THEME</span>
          <div className="theme-toggle">
            <div className="theme-number">
              <span onClick={theme1}>1</span>
              <span onClick={theme2}>2</span>
              <span onClick={theme3}>3</span>
            </div>
            <span className="indicator" id="indicator"></span>
          </div>
        </div>
      </div>

      <div className="input-box">123.456</div>
      <div className="keypad">
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button className="delete">DEL</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button>/</button>
        <button>x</button>
        <button className="sapn-two reset">RESET</button>
        <button className="sapn-two equal">=</button>
      </div>
    </div>
  );
}

export default Calculator;
