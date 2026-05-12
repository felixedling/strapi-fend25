const header = document.querySelector(".header-main");
const token = localStorage.getItem("token");

async function renderHeader() {
    let username = "";

    if (token) {
        const response = await fetch("http://localhost:1337/api/users/me", {
            headers: { Authorization: `Bearer ${token}` }
        });
        const user = await response.json();
            username = user.username.charAt(0);
    }

    header.innerHTML = `
        <nav class="header-nav">
            <a href="index.html" class="logo">Book Ducks</a>
            <div class="nav-bar">
                <a class="products-nav" href="products.html">Alla böcker</a>
                <a class="about-nav" href="about.html">Om oss</a>
                <div class="search-wrapper">
                    <button class="search"><i class="fa-solid fa-magnifying-glass"></i></button><input type="search" id="searchbar" placeholder="Sök bok eller författare">
                </div>
                ${token ? `
                    <button class="profileBtn">${username}</button>
                ` : `
                    <button class="loginBtn">Logga in</button>
                    <button class="registerBtn">Registrera</button>
                `}
            </div>
        </nav>
    `;

    if (token) {
        document.querySelector(".profileBtn").addEventListener("click", () => {
            window.location.href = "profile.html";
        });
    } else {
        document.querySelector(".loginBtn").addEventListener("click", () => {
            window.location.href = "login.html";
        });

        document.querySelector(".registerBtn").addEventListener("click", () => {
            window.location.href = "register.html";
        });
    }
}

renderHeader();

