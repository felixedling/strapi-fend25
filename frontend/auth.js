async function checkAuth() {
    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "./login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:1337/api/users/me", {
            headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "./login.html";
        }

    } catch (error) {
        window.location.href = "./login.html";
    }
}

checkAuth();