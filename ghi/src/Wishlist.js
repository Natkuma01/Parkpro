// import React from 'react';

// const Wishlist = () => {

//   const [mywishlist, setMyWishList] = useState([]);

//   const fetchData = async () => {
//     const response = await fetch('http://localhost:8000/api/parks')
//     if (response.ok) {
//       const data = await response.json()
//       setMyWishList(data["parks"]);
//     }
//   }

//   useEffect(() => {
//     fetchData().then((result) => setMyWishList(result));
//   }, []);


//   return (
//     <div> {mywishlist.map((w) => w.fullName)}</div>
//   )
// }

// export default Wishlist
import React from 'react'

const Wishlist = () => {
  return (
    <div>Wishlist</div>
  )
}

export default Wishlist