import { qs, qsa, domReady } from './utils';
import data from '../data/riddle.json';

const createGrid = () => {
  console.log('Hello str8ts', data)

  const playground = qs('.playground');


  const grid = data.reduce((rows, row) => {
    const rowHtml = row.reduce((columns, column) => {
      const input = column.value ?
        `<input type="text" autocomplete="off" autocorrect="off" inputmode="verbatim" spellcheck="false" disabled="true" value="${column.value}"/>` :
        `<input type="text" autocomplete="off" autocorrect="off" inputmode="verbatim" spellcheck="false" />`

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