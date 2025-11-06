const API_URL = "https://glowing-lamp-59p6pwq7jvgcv7jg-3001.app.github.dev/api";

export async function register(email, password) {
  console.log(API_URL);
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}
export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getProfile(token) {
  const res = await fetch(`${API_URL}/protected`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Token inválido o expirado");
  return res.json();
}
