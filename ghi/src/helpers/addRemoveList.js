export default async function addRemoveList(park, listName, action, token) {
  const parkCode = park.parkCode;
  let user = {};
  if (!!localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const inList = user[listName].includes(parkCode);
  let newUser = {};

  if (action === "add") {
    if (inList) {
      return;
    } else {
      listName === "visited"
        ? user.visited.push(parkCode)
        : user.bucket_list.push(parkCode);
      newUser = user;
    }
  } else {
    if (!inList) {
    } else {
      const newList =
        listName === "visited"
          ? (user.visited = [
              ...user.visited.filter((park) => {
                return park !== parkCode;
              }),
            ])
          : (user.bucket_list = [
              ...user.bucket_list.filter((park) => {
                return park !== parkCode;
              }),
            ]);

      listName === "visited"
        ? (user.visited = newList)
        : (user.bucket_list = newList);
      newUser = { ...user };
    }
  }
  const id = user.id;
  const account = newUser;
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
      console.error("Error updating list");
    }
  } catch (error) {
    console.error(error);
  }
}
