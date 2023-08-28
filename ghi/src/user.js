export async function user() {
  const url = `http://localhost:8000/token`;
  try {
    const response = await fetch(url);
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
