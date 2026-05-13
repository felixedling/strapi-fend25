async function getTheme() {
    const response = await fetch("http://localhost:1337/api/themes");
    const data = await response.json();
    const theme = data.data[0].theme;

    const elements = [
        document.body,
        document.querySelector(".frontpage-content"),
        document.querySelector(".detailed-products"),
        document.querySelector(".profile-main"),
        document.querySelector(".products-main"),
        document.querySelector(".hero-section"),
        document.querySelector(".featured-section"),
    ].filter(Boolean);

    if (theme === "light") {
        elements.forEach(el => {
            el.style.backgroundColor = "#f0ede8";
            el.style.color = "#1a1a2e";
        });
    } else if (theme === "dark") {
        elements.forEach(el => {
            el.style.backgroundColor = "#1a1a2e";
            el.style.color = "#f0ede8";
        });
    } else if (theme === "warm") {
        elements.forEach(el => {
            el.style.backgroundColor = "#f5e6d0";
            el.style.color = "#5c3d2e";
        });
    }
}

getTheme();