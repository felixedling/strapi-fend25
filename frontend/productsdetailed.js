const detailedContent = document.querySelector(".detailed-products");

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

async function getBook() {
    const response = await fetch(`http://localhost:1337/api/books/${bookId}?populate=*`);
    const data = await response.json();
    const book = data.data;
    console.log(data);

    detailedContent.innerHTML = `
        <div class="detailed-container">
            <button class="backBtn" onclick="history.back()">
                <i class="fa-solid fa-arrow-left"></i> Tillbaka
            </button>
            <div class="book-cover-detailed">
                <img src="${book.image ? 'http://localhost:1337' + book.image.url : ''}" alt="${book.title}">
            </div>
            <div class="card-info-detailed">
                <h2>${book.title}</h2>
                <h2>${book.author}</h2>
                <h2>Antal sidor: ${book.pages}</h2>
                <h2>Utgivningsdatum: ${book.release_date}</h2>
                <button class="saveBtn">Lägg till i läslista</button>
            </div>
        </div>
    `;

    document.querySelector(".saveBtn").addEventListener("click", async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            window.location.href = "login.html";
            return;
        }

        try {
            const response = await fetch("http://localhost:1337/api/reading-lists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    data: {
                        books: bookId,
                    }
                })
            });

            if (response.ok) {
                alert("Boken sparad i din läslista!");
            } else {
                alert("Något gick fel, försök igen.");
            }

        } catch (error) {
            alert("Något gick fel, försök igen.");
        }
    });
}

getBook();

