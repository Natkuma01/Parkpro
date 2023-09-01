export default async function addRemoveList(park, listName, action, token) {
  const parkCode = park.parkCode;
  const user = JSON.parse(localStorage.getItem("user"));
  const inList = user[listName].includes(parkCode);
  let newUser = {};
  if (action === "add") {
    if (inList) {
      console.log("park already in list");
      return;
    } else {
      newUser =
        listName === "visited"
          ? user.visited.push(parkCode)
          : user.bucket_list.push(parkCode);
    }
  } else {
    if (!inList) {
      console.log("park already in list");
    } else {
      const test = user.visited.filter((park) => {
        return park.parkCode !== parkCode;
      });
      console.log(test);
      listName === "visited"
        ? (user.visited = [
            ...user.visited.filter((park) => {
              return park.parkCode !== parkCode;
            }),
          ])
        : (user.bucket_list = [
            ...user.bucket_list.filter((park) => {
              return park.parkCode !== parkCode;
            }),
          ]);
      newUser = { ...user };
    }
  }

  const id = user.id;
  const account = { ...newUser };
  console.log("sending", newUser);
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
    } else {
      console.log("profile updated");
    }
  } catch (error) {
    console.error(error);
  }
}
