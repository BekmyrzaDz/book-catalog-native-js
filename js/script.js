window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("BtnSearch").addEventListener("click", (event) => {
    event.preventDefault();

    const search = document
      .getElementById("search")
      .value.split(" ")
      .join("+")
      .trim()
      .toLowerCase();

    const url = `https://www.googleapis.com/books/v1/volumes?q=${search}+intitle`;

    getData(url);
  });

  async function getData(url) {
    try {
      const resp = await fetch(url);
      const result = await resp.json();
      render(result.items);
      favorite();
      getFavoriteData(result);
    } catch (error) {
      console.log(error);
    }
  }

  function render(data) {
    const booksInner = document.querySelector(".books__inner");

    document.querySelector(".books__inner").innerHTML = "";

    data.forEach((book) => {
      document.getElementById("search").value = "";

      const bookEl = document.createElement("div");
      bookEl.classList.add("book");

      const button = (
        JSON.parse(localStorage.getItem("favorites")) || []
      ).includes(book.id)
        ? `<div class="book__btn btn danger__btn" data-id="${book.id}">Delete</div>`
        : `<div class="book__btn save__btn btn" data-id="${book.id}">Save</div>`;

      let addBooks = "";

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
              <a class="more__link" href="${
                book.volumeInfo.canonicalVolumeLink
              }" target="_blank">
                <div class="book__btn more__btn btn">
                  More
                </div>
              </a>
              ${button}
            </div>
          </div>
        </div>
      `;

      bookEl.innerHTML = addBooks;

      booksInner.appendChild(bookEl);
    });
  }

  function favorite() {
    this.addEventListener("click", (event) => {
      const $el = event.target;
      const id = $el.dataset.id;

      if (id) {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.includes(id)) {
          // удалить элемент
          $el.textContent = "Save";
          $el.classList.remove("danger__btn");
          favorites = favorites.filter((fId) => fId !== id);
        } else {
          // добавить элемент
          $el.textContent = "Delete";
          $el.classList.add("danger__btn");
          favorites.push(id);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    });
  }

  function getFavoriteData(data) {
    document.querySelector(".favorite").addEventListener("click", (event) => {
      event.preventDefault();
      showFavorite(data);
    });
  }

  function showFavorite(data) {
    const favorites = JSON.parse(localStorage.getItem("favorites"));
    renderList(favorites, data);
  }

  function renderList(list = [], data) {
    if (list) {
      const result = data.items.filter((item, i) => item.id === list[i]);
      return render(result);
    }
  }
});
