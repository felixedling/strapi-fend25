const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:1337/api/auth/local", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ identifier: email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert("Inloggning misslyckades: " + data.error.message);
            return;
        }

        localStorage.setItem("token", data.jwt);
        window.location.href = "./index.html";

    } catch (error) {
        alert("Något gick fel, försök igen.");
    }
});