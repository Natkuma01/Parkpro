import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

const { token } = useAuthContext;

export async function user() {
  const url = `http://localhost:8000/token`;
  const fetchConfig = {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      console.error("Error getting user data");
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
  }
}

export const logout = async () => {
  const url = `http://localhost:8000/token`;
  const fetchConfig = {
    method: "delete",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      console.error("Error logging out");
    }
  } catch (error) {
    console.error(error);
  }
};
