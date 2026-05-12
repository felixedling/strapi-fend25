const profileContent = document.querySelector(".profile-main");

async function getProfile() {
    const response = await fetch("http://localhost:1337/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
    });
    const user = await response.json();
    
    profileContent.innerHTML = `
        <div class="profile-container">
            <div class="profile-top">
                <div class="profile-pic">${user.username.charAt(0)}</div>
                <div class="profile-info">
                    <h1>${user.username}</h1>
                    <p>${user.email}</p>
                </div>
                <div class="profile-settings">
                    <p class="settingsLabel">Inställningar</p>
                    <button class="logoutBtn" id="logoutBtn">Logga ut</button>
                </div>
            </div>
            <section class="reading-list-section">
                <div class="reading-list-header">
                    <h2>Att läsa</h2>
                    <div class="sort-wrapper">
                        <label for="sortSelect">Sortera:</label>
                        <select id="sortSelect">
                            <option value="title">Titel (A-Ö)</option>
                            <option value="author">Författare (A-Ö)</option>
                        </select>
                    </div>
                </div>
                <div class="reading-list-container" id="readingListContainer"></div>
            </section>
        </div>
    `;
    
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("token");
        window.location.href = "index.html";
    });

    getReadingList();
}

async function getReadingList() {
    const response = await fetch("http://localhost:1337/api/reading-lists?populate[books][populate]=image", {
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await response.json();
    console.log(data);
    const readingList = data.data;

    const container = document.getElementById("readingListContainer");

    if (readingList.length === 0) {
        container.innerHTML = `<p>Du har inga böcker i din lista ännu!</p>`;
        return;
    }

    document.getElementById("sortSelect").addEventListener("change", (e) => {
        const sortBy = e.target.value;
        const cards = document.querySelectorAll(".reading-card");
        const container = document.getElementById("readingListContainer");

        const cardsArray = Array.from(cards);

        cardsArray.sort((a, b) => {
            const aText = a.querySelector(sortBy === "title" ? "h2" : ".author").textContent;
            const bText = b.querySelector(sortBy === "title" ? "h2" : ".author").textContent;
            return aText.localeCompare(bText, "sv");
        });

        cardsArray.forEach(card => container.appendChild(card));
    });

    container.innerHTML = readingList.map(item => {
        const book = item.books[0];
        console.log(book);
        return `
            <div class="reading-card">
                <img class="book-cover" src="${book?.image ? 'http://localhost:1337' + book.image.url : ''}" alt="${book?.title}">
                <div class="card-info">
                    <h2>${book?.title}</h2>
                    <p class="author">${book?.author}</p>
                    <p class="pages">${book?.pages} sidor</p>
                </div>
                <button class="removeBtn" data-id="${item.documentId}">Ta bort</button>
            </div>
        `
    }).join("");

    document.querySelectorAll(".removeBtn").forEach(btn => {
        btn.addEventListener("click", async () => {
        await removeBook(btn.dataset.id);
        });
    });
};

async function removeBook(id) {
    await fetch(`http://localhost:1337/api/reading-lists/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
    });
    getReadingList();
};

getProfile ();
