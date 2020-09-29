import { qs, qsa, domReady } from './utils';
import data from '../data/riddle.json';

const hasDuplicates = array => new Set(array).size !== array.length;
const validValue = value => Number.isInteger(value) && value > 0 && value <= 9;

const validateRow = (index) => {
  const columnValues = [];
  qsa(`[data-row-idx="${index}"] > [data-validate="true"]`).forEach(elem => columnValues.push(Number.parseInt(elem.value)));

  let validValues = true;
  columnValues.forEach(elem => validValues = validValues && validValue(elem));
  
  return validValues && !hasDuplicates(columnValues);
};

const validateColumn = (index) => {
  const columnValues = [];
  qsa(`[data-column-idx="${index}"] > [data-validate="true"]`).forEach(elem => columnValues.push(Number.parseInt(elem.value)));

  let validValues = true;
  columnValues.forEach(elem => validValues = validValues && validValue(elem));

  return validValues && !hasDuplicates(columnValues);
};


const validate = () => {
  for (let i = 0; i < 8; i++) {
    const result = validateColumn(i) && validateRow(i);

    if (!result) {
      qs('.error').classList.remove('hidden');
    } else {
      qs('.playground').classList.add('hidden');
      qs('.controls').classList.add('hidden');
      qs('.success').classList.remove('hidden');
    }
  }
};


const createGrid = () => {
  const playground = qs('.playground');


  const grid = data.reduce((rows, row, rowIndex) => {
    const rowHtml = row.reduce((columns, column, columnIndex) => {
      let input = '';

      if (column.value) {
        const cssClass = column.predefined ? 'cell-input bold' : 'cell-input';
        input = `<input class="${cssClass}" type="number" inputmode="verbatim" min="0" max="9" disabled="true" data-validate="true" value="${column.value}"/>`
      } else if (column.color === 'black') {
        input = `<input class="cell-input" type="number" inputmode="verbatim" min="0" max="9" disabled="true"/>`;
      } else {
        input = `<input class="cell-input" type="number" inputmode="verbatim" min="0" max="9" data-validate="true" />`
      }

      return `${columns}
        <li class="cell ${column.color}" data-row-idx="${rowIndex}" data-column-idx="${columnIndex}">
          ${input}
        </li>`
    }, '');
    return `${rows}<ul class="row">${rowHtml}</ul>`;
  }, '');


  playground.innerHTML = grid;
};

domReady(() => {
  createGrid();

  qs(`.validate-button`).addEventListener('click', () => {
    validate();
  });

  qsa('.cell-input').forEach(input => {
    input.addEventListener('keydown', () => {
      qs('.error').classList.add('hidden'); 
    })
  });

  qsa('.cell-input').forEach(input => {
    input.addEventListener('keyup', event => {
      const inputElement = event.currentTarget;

      if (inputElement && inputElement.value.length > 1) {
        inputElement.classList.add('unsure');
      } else {
        inputElement.classList.remove('unsure');
      }
    })
  });
});