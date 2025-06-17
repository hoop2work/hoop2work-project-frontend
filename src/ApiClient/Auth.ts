const API_BASE_URL = "http://localhost:4000";

export async function loginUser(username: string, password: string) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
    }
    return data;
}

export async function registerUser(user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    newsletter: boolean;
}) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
    }
    return response.json(); // enthält z. B. { message: "User registered successfully" }
    
}
