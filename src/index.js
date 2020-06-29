/* eslint-disable no-alert */

const mainBlock = document.querySelector('.main-block');
const cardsCount = 10;

// Hash-code generation
const generateCode = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwx'.split('');
  const now = new Date();
  const minutesByDigits = (now.getMinutes() + now.getHours() * 60).toString().split('');
  let hash = '';
  minutesByDigits.forEach((el) => { hash += `${el}${alphabet[el]}`; });

  return hash;
};

// Displaying generated hash-code instead of generate-button
const showCode = () => {
  document.querySelector('.generateCodeBtn').remove();

  const codeEl = document.createElement('span');
  codeEl.textContent = generateCode();
  document.querySelector('.main-block').prepend(codeEl);
};

// Verifying entered hash-code with valid
const checkCode = (currentCode) => parseInt(currentCode.replace(/\D+/g, ''), 10) >= parseInt(generateCode().replace(/\D+/g, ''), 10) - 5;

// Game start after correct hash-code enter
const startGame = () => {
  alert('Game started');

  const cardsArea = document.createElement('div');
  cardsArea.className = 'cardsArea';

  const cards = [];
  for (let i = 0; i < cardsCount; i += 1) {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = `Карта №${i + 1}`;
    cards.push(card);
  }

  cards[0].classList += 'catastrophe';

  mainBlock.append(cardsArea);
  cards.forEach((item) => cardsArea.append(item));
};

// Input code that is available
const codeAvailable = () => {
  document.querySelector('.applyCodeBtn').remove();
  // Add input
  const codeInputField = document.createElement('input');
  codeInputField.className = 'codeInputField';
  codeInputField.style.textAlign = 'center';
  document.querySelector('.main-block').append(codeInputField);
  // Add submit button
  const submitCode = document.createElement('button');
  submitCode.textContent = 'Запустить игру';
  submitCode.type = 'submit';
  submitCode.onclick = () => {
    if (checkCode(codeInputField.value)) {
      mainBlock.innerHTML = '';
      startGame();
    } else {
      alert('Incorrect code');
    }
  };
  mainBlock.append(submitCode);
};

// Creation of buttons
(() => {
  // Hash generation
  const generateCodeBtn = document.createElement('button');
  generateCodeBtn.className = 'generateCodeBtn';
  generateCodeBtn.textContent = 'Сгенерировать код';
  generateCodeBtn.onclick = showCode;
  // Hash is available
  const applyCodeBtn = document.createElement('button');
  applyCodeBtn.textContent = 'Уже есть код?';
  applyCodeBtn.className = 'applyCodeBtn';
  applyCodeBtn.onclick = codeAvailable;

  document.querySelector('.main-block').append(generateCodeBtn, applyCodeBtn);
})();
