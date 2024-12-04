// Отримуємо всі сторінки
const pages = document.querySelectorAll('.page');
const dateInput = document.querySelector('.date');
const cyrcleMeterInput = document.querySelector('.cyrcle-meter');
const countFirstInput = document.querySelector('.count-1');
const countSecondInput = document.querySelector('.count-2');
const countThirdInput = document.querySelector('.count-3');
const countFourthInput = document.querySelector('.count-4');
const countFifthInput = document.querySelector('.count-5');
const cylinderFirstInput = document.querySelector('.cylinder-1');
const cylinderSecondInput = document.querySelector('.cylinder-2');
const cylinderThirdInput = document.querySelector('.cylinder-3');
const cylinderFourthInput = document.querySelector('.cylinder-4');
const pumpFirstInput = document.querySelector('.pump-1');
const pumpSecondInput = document.querySelector('.pump-2');
const pumpThirdInput = document.querySelector('.pump-3');
const pumpFourthInput = document.querySelector('.pump-4');
const pumpFifthInput = document.querySelector('.pump-5');
const saveButton = document.querySelector('.save-button');

// Функція для збирання даних з input-полів
function collectData() {
  const data = {
    date: dateInput.value,
    cyrcleMeter: cyrcleMeterInput.value,
    counts: {
      count1: countFirstInput.value,
      count2: countSecondInput.value,
      count3: countThirdInput.value,
      count4: countFourthInput.value,
      count5: countFifthInput.value,
    },
    cylinders: {
      cylinder1: cylinderFirstInput.value,
      cylinder2: cylinderSecondInput.value,
      cylinder3: cylinderThirdInput.value,
      cylinder4: cylinderFourthInput.value,
    },
    pumps: {
      pump1: pumpFirstInput.value,
      pump2: pumpSecondInput.value,
      pump3: pumpThirdInput.value,
      pump4: pumpFourthInput.value,
      pump5: pumpFifthInput.value,
    },
  };

  return data;
}

// Функція для збереження даних у файл JSON
function saveDataToFile(data) {
    const fileName = `${new Date().toISOString().split('T')[0]}.json`; // Назва файлу у форматі YYYY-MM-DD.json
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}

// Додаємо обробник подій для кнопки "save to file"
saveButton.addEventListener('click', (event) => {
  event.preventDefault();
  saveDataToFile();
});




// Ініціалізуємо індекс поточної сторінки
let currentPageIndex = 0;

// Функція для оновлення відображення сторінок
function updatePages() {
  pages.forEach((page, index) => {
    page.style.display = index === currentPageIndex ? 'flex' : 'none';
  });
}

// Ініціалізація - показати першу сторінку
updatePages();

// Делегування подій для "next" і "previous"
document.querySelector('#container').addEventListener('click', (event) => {
  if (event.target.classList.contains('link-next')) {
    event.preventDefault();
    if (currentPageIndex < pages.length - 1) {
      currentPageIndex++;
      updatePages();
    }
  }

  if (event.target.classList.contains('link-previous')) {
    event.preventDefault();
    if (currentPageIndex > 0) {
      currentPageIndex--;
      updatePages();
    }
  }
});

