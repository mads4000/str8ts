import { qs, qsa, domReady } from './utils';
import data from '../data/riddle.json';

const createGrid = () => {
  console.log('Hello str8ts', data)

  const playground = qs('.playground');


  const grid = data.reduce((rows, row) => {
    const rowHtml = row.reduce((columns, column) => {
      const input = column.value ?
        `<input class="cell-input" type="number" inputmode="verbatim" min="0" max="9" disabled="true" value="${column.value}"/>` :
        `<input class="cell-input" type="number" inputmode="verbatim" min="0" max="9" />`

      return `${columns}
        <li class="cell ${column.color}">
          ${input}
        </li>`
    }, '');
    return `${rows}<ul class="row">${rowHtml}</ul>`;
  }, '');


  playground.innerHTML = grid;

};

domReady(() => {
  createGrid();
});