window.addEventListener('DOMContentLoaded', () => {
  const d = window.localStorage.getItem('data');
  const dataLoc = JSON.parse(d);
  console.log(dataLoc);

  addCard(dataLoc);

  function addCard(data) {
    data.forEach((book) => {
      const booksInner = document.querySelector('.books__inner');

      let bookEl = document.createElement('div');
      bookEl.classList.add('book');

      let addBooks = '';

      addBooks = `
        <div class="book__inner">
          <img class="book__img" src="${book.volumeInfo.imageLinks.thumbnail}
          alt="">
          <div class="book__descr">
            <h3 class="title book__descr_title">${book.volumeInfo.title}</h3>
            <p class="autors">
              <span>Autors</span>: ${book.volumeInfo.authors.map(
                (author) => `${author}`
              )}
            </p>
            <p class="published__date">
              <span>Published Date</span>: ${book.volumeInfo.publishedDate}
            </p>
            <p class="publisher">
              <span>Publisher</span>: ${book.volumeInfo.publisher}
            </p>
            <div class="book__buttons">
              <a class="more__link" href="${book.volumeInfo.canonicalVolumeLink}" target="_blank">
                <div class="more__btn">
                  <p>More</p>
                </div>
              </a>
              <div class="favorites" data-id="${book.id}">
                <img class="favorite__img" src="icons/star-regular.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      `;

      bookEl.innerHTML = addBooks;

      booksInner.appendChild(bookEl);
    });
  }
});