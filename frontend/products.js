const productsContent = document.querySelector(".products-content");

async function getBooks() {
    const response = await fetch("http://localhost:1337/api/books?populate=*");
    const data = await response.json();
    const books = data.data;

    productsContent.innerHTML = `
        <h1>Alla böcker</h1>
        <div class="products-container">
            ${books.map(book => `
                <div class="product-card" onclick="window.location.href='productsdetailed.html?id=${book.documentId}'">
                    <img class="book-cover" src="${book.image ? 'http://localhost:1337' + book.image.url : ''}" alt="${book.title}">
                    <div class="card-info">
                        <h2>${book.title}</h2>
                        <p>${book.author}</p>
                        <p>${book.pages} sidor</p>
                        <p>${book.release_date}</p>
                    </div>
                </div>
            `).join("")}
        </div>
        <div class="show-more">
            <button class="showBtn">Visa fler</button>
        </div>
    `;

    const showBtn = document.querySelector(".showBtn");

    showBtn.addEventListener("click", () => {
        if (showBtn.innerText === "Visa fler") {
            showBtn.innerText = "Visa färre";
        } else {
            showBtn.innerText = "Visa fler";
        }
    });
}

getBooks();