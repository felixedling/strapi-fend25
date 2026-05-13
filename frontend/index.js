const heroContent = document.querySelector(".hero-section");
const featuredContent = document.querySelector(".featured-section");

heroContent.innerHTML = `
    <div class="hero-container">
        <h1>Välkommen till BookDucks</h1>
        <button class="heroBtn" onclick="window.location.href='products.html'">Våra böcker</button>
    </div>
`;

async function getFeaturedBooks() {
    const response = await fetch("http://localhost:1337/api/books?populate=*&pagination[limit]=3");
    const data = await response.json();
    const books = data.data;

    featuredContent.innerHTML = `
        <h2 class="chosenBooks">Utvalda böcker</h2>
        <div class="featured-container">
            ${books.map(book => `
                <div class="product-card" onclick="window.location.href='productsdetailed.html?id=${book.documentId}'">
                    <img class="book-cover" src="${book.image ? 'http://localhost:1337' + book.image.url : ''}" alt="${book.title}">
                    <div class="card-info">
                        <h2>${book.title}</h2>
                        <p>${book.author}</p>
                        <p>${book.pages} sidor</p>
                    </div>
                </div>
            `).join("")}
        </div>
    `;
}

getFeaturedBooks();