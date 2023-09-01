export default async function addRemoveList(parkCode, listName, token) {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user[listName].includes(parkCode)) {
    console.log("park already in list");
    return;
  }
  const id = user.id;
  listName === "visited"
    ? user.visited.push(parkCode)
    : user.bucket_list.push(parkCode);
  const account = { ...user };
  localStorage.setItem("user", JSON.stringify(account));
  const url = `http://localhost:8000/api/accounts/${id}`;
  const fetchConfig = {
    method: "put",
    body: JSON.stringify(account),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, fetchConfig);
    if (!response.ok) {
      console.error("Error adding park to list");
    } else {
      console.log("profile updated");
    }
  } catch (error) {
    console.error(error);
  }
}
