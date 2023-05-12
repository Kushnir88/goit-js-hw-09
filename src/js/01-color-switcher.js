function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  let intervalId;

  function startColorChange() {
    const startButton = document.querySelector('[data-start]');
    const stopButton = document.querySelector('[data-stop]');
    startButton.disabled = true;
    intervalId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    stopButton.addEventListener('click', stopColorChange);
  }

  function stopColorChange() {
    const startButton = document.querySelector('[data-start]');
    const stopButton = document.querySelector('[data-stop]');
    startButton.disabled = false;
    clearInterval(intervalId);
    document.body.style.backgroundColor = '';
    stopButton.removeEventListener('click', stopColorChange);
  }

  const startButton = document.querySelector('[data-start]');
  startButton.addEventListener('click', startColorChange);