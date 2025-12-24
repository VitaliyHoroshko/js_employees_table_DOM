'use strict';

const tHead = document.querySelector('thead');
const tBody = document.querySelector('tbody');

tHead.addEventListener('click', (evt) => {
  const target = evt.target;

  if (target.tagName !== 'TH') {
    return;
  }

  const previousIndex = tHead.querySelector('.active')?.cellIndex;
  const currentIndex = target.cellIndex;

  if (previousIndex === currentIndex) {
    target.classList.toggle('asc');
    target.classList.toggle('desc');
  } else {
    if (previousIndex !== undefined) {
      const previousHeader = tHead.rows[0].cells[previousIndex];

      previousHeader.classList.remove('active', 'asc', 'desc');
    }

    target.classList.add('active', 'asc');
    target.classList.remove('desc');
  }

  const isAscending = target.classList.contains('asc');

  const rowsArray = Array.from(tBody.rows);

  rowsArray.sort((rowA, rowB) => {
    const cellA = rowA.cells[currentIndex].textContent.trim();
    const cellB = rowB.cells[currentIndex].textContent.trim();

    const valueA = isNaN(cellA) ? cellA.toLowerCase() : parseFloat(cellA);
    const valueB = isNaN(cellB) ? cellB.toLowerCase() : parseFloat(cellB);

    if (valueA < valueB) {
      return isAscending ? -1 : 1;
    }

    if (valueA > valueB) {
      return isAscending ? 1 : -1;
    }

    return 0;
  });

  tBody.innerHTML = '';
  rowsArray.forEach((row) => tBody.appendChild(row));
});
