import { API_ENDPOINTS } from "../apiConfig";

export const validateToken = async (token) => {
  try {
    const response = await fetch(`${API_ENDPOINTS.validate}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return { valid: true, user: data.user };
    } else {
      return { valid: false };
    }
  } catch (error) {
    console.error("Token validation failed:", error);
    return { valid: false };
  }
};
