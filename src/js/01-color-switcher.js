    const startButton = document.querySelector("button[data-start]");
    const stopButton = document.querySelector("button[data-stop]");
  let intervalId = null;
  stopButton.disabled = true;

  function startColorChange() {
    startButton.disabled = true;
    stopButton.disabled = false;
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    stopButton.addEventListener('click', stopColorChange);
  }

  function stopColorChange() {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(intervalId);
    stopButton.removeEventListener('click', stopColorChange);
  }
  startButton.addEventListener('click', startColorChange);
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }