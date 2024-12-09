const elements = document.querySelectorAll('.elements');
const inputs = document.querySelectorAll('.input');
const flowMeter = document.querySelector('.flow-meter-content');
const powerUnits = document.querySelector('.power-units-content');
const cylinderElements = document.querySelector('.cylinder-elements-content');
const pumps = document.querySelector('.pumps-content');
const previousValue = document.querySelector('.previous-value');
const flowResult = document.querySelector('.result');
const saveToFileButton = document.getElementById('save-button');
const loadFile = document.getElementById('load-button');

const date = document.querySelector('#date');
const time = document.querySelector('#time');

const flowMeterInput = document.querySelector('.flow-meter-input');

const powerUnit_1 = document.querySelector('.power-unit_1');
const powerUnit_2 = document.querySelector('.power-unit_2');
const powerUnit_3 = document.querySelector('.power-unit_3');

const cylinder_1 = document.querySelector('.cylinder_1');
const cylinder_2 = document.querySelector('.cylinder_2');
const cylinder_3 = document.querySelector('.cylinder_3');
const cylinder_4 = document.querySelector('.cylinder_4');

const pump_1 = document.querySelector('.pump_1');
const pump_2 = document.querySelector('.pump_2');
const pump_3 = document.querySelector('.pump_3');
const pump_4 = document.querySelector('.pump_4');
const pump_5 = document.querySelector('.pump_5');

loadFile.addEventListener('change', (event) => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result); // Розбираємо JSON
        console.log(data);
        
        // Встановлюємо значення в інпути
        previousValue.textContent = data.flow_meter;
        powerUnit_1.placeholder = data.power_unit_1;
        powerUnit_2.placeholder = data.power_unit_2;
        powerUnit_3.placeholder = data.power_unit_3;
        cylinder_1.placeholder = data.cylinder_1;
        cylinder_2.placeholder = data.cylinder_2;
        cylinder_3.placeholder = data.cylinder_3;
        cylinder_4.placeholder = data.cylinder_4;
        pump_1.placeholder = data.pump_1;
        pump_2.placeholder = data.pump_2;
        pump_5.placeholder = data.pump_5;
      } catch (error) {
        alert('Invalid JSON file!');
      }
    };

    reader.readAsText(file); // Читаємо файл як текст
  } else {
    alert('No file selected!');
  }
})

window.addEventListener('keyup', () => {
  isActive();
})

window.addEventListener('mousedown', () => {
  isActive();
})

const isActive = () => {
  inputs.forEach((el) => {
    
    el.value ? saveToFileButton.disabled = false : saveToFileButton.disabled = true;
    if (date.value === '' && time.value === '') {
      saveToFileButton.disabled = true;
    }
  })
}

saveToFileButton.addEventListener('click', () => {
  const data = {
    date: date.value,
    time: time.value,
    flow_meter: flowMeterInput.value,
    power_unit_1: powerUnit_1.value,
    power_unit_2: powerUnit_2.value,
    power_unit_3: powerUnit_3.value,
    cylinder_1: cylinder_1.value,
    cylinder_2: cylinder_2.value,
    cylinder_3: cylinder_3.value,
    cylinder_4: cylinder_4.value,
    pump_1: pump_1.value,
    pump_2: pump_2.value,
    pump_3: pump_3.value,
    pump_4: pump_4.value,
    pump_5: pump_5.value
  }

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${data.date}.json`;
  a.click();

  URL.revokeObjectURL(url); // Очищуємо пам'ять
})



flowMeter.addEventListener('keyup', (event) => {
  flowResult.textContent = Math.round(+(event.target.value) - +(previousValue.value)) / 1000 + ' mGd';
})


const selectedElement = () => {
  

  const saveBackgroundColor = () => {
    for(let element of elements) {
      element.style.backgroundColor = 'white';
    }
  }

  const showContent = (value) => {
    
    if (value === 'Flow Meter') {
      flowMeter.style.display = 'flex';
      powerUnits.style.display = 'none';
      cylinderElements.style.display = 'none';
      pumps.style.display = 'none';
    }

    if (value === 'Power Units') {
      flowMeter.style.display = 'none';
      powerUnits.style.display = 'flex';
      cylinderElements.style.display = 'none';
      pumps.style.display = 'none';
    }

    if (value === 'Cylinders') {
      flowMeter.style.display = 'none';
      powerUnits.style.display = 'none';
      cylinderElements.style.display = 'flex';
      pumps.style.display = 'none';
    }

    if (value === 'Pumps') {
      flowMeter.style.display = 'none';
      powerUnits.style.display = 'none';
      cylinderElements.style.display = 'none';
      pumps.style.display = 'flex';
    }
  }
  
  for (let element of elements) {
    element.addEventListener('click', (event) => {
      saveBackgroundColor();
      event.target.style.backgroundColor = 'red';
      showContent(event.target.textContent);
    })
  }
}

selectedElement();

isActive();
