// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import {
//   updateUserFailure,
//   updateUserSuccess,
//   updateUserStart,
//   deleteUserFailure,
//   deleteUserStart,
//   deleteUserSuccess,
//   signOutSuccess,
// } from "../redux/user/userSlice.js";
// import axios from "axios";

// function Profile() {
//   const { _id, username, email, photo } = useSelector(
//     (state) => state.user.currentUser
//   );
//   console.log(photo);

//   const { loading, error } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const navigate = useNavigate();
//   const inputRef = useRef(null);
//   const [file, setFile] = useState(undefined);
//   const [formData, setFormData] = useState({});
//   const [listing, setListing] = useState([]);
//   const [showListings, setShowListings] = useState(false);

//   async function handleSignout() {
//     try {
//       const res = await axios.get("/api/auth/signout");
//       dispatch(signOutSuccess());
//     } catch (error) {
//       return;
//     }
//   }
//   async function handleFileUpload(e) {
//     const data = new FormData();
//     setFile(e.target.files[0]);
//     data.append("file", e.target.files[0]);
//     data.append("upload_preset", "realnext_avatar");
//     data.append("cloud_name", "dihcggs0n");

//     if (!e.target.files[0]) return;

//     try {
//       const cloudinaryRes = await axios.post(
//         "https://api.cloudinary.com/v1_1/dihcggs0n/image/upload",
//         data
//       );

//       setFormData({ ...formData, photo: cloudinaryRes.data.secure_url });
//     } catch (err) {
//       return toast.error("There is an issue with the cloudinary service!");
//     }
//   }

//   async function handleFormSubmit(e) {
//     e.preventDefault();

//     try {
//       dispatch(updateUserStart());
//       const newUser = await axios.post("/api/user/update/" + _id, formData, {
//         withCredentials: true,
//       });
//       console.log("updated user data", newUser);

//       setFormData(newUser.data);
//       dispatch(updateUserSuccess(newUser.data));
//       toast.success("User Is Updated Successfully!");
//     } catch (err) {
//       toast.error(err);
//       dispatch(updateUserFailure(err));
//     }
//   }

//   async function handleDeleteUser() {
//     try {
//       dispatch(deleteUserStart());
//       const res = await axios.delete("/api/user/delete/" + _id, {
//         withCredentials: true,
//       });
//       if (res.data.success == false) {
//         dispatch(deleteUserFailure(res.data.errorMessage));
//         return toast.error(res.data.errorMessage);
//       } else {
//         dispatch(deleteUserSuccess());
//       }
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//       return toast.error(error);
//     }
//   }

//   async function handleShowListings() {
//     setShowListings((prev) => !prev);
//     try {
//       const listings = await axios.get("/api/user/listings/" + _id, {
//         withCredentials: true,
//       });
//       if (listings.data.success == false) {
//         return toast.error(listings.data.errorMessage);
//       }
//       setListing(listings.data);
//     } catch (error) {
//       console.log(error);

//       toast.error("There seem to be an issue with the backend");
//     }
//   }

//   async function handleListingDelete(listingId) {
//     try {
//       const response = await axios.delete(`/api/listing/delete/${listingId}`, {
//         withCredentials: true,
//       });
//       if (response.data.success == true) {
//         toast.success(response.data.message);
//         setListing((prev) => prev.filter((list) => list._id != listingId));
//       }
//     } catch (err) {
//       toast.error(err);
//     }
//   }

//   const ShowListingsTextComponent = () => {
//     if (showListings) {
//       if (listing.length > 0) {
//         return (
//           <h1 className="text-2xl text-green-500 font-semibold my-7 text-center uppercase">
//             Your Listings
//           </h1>
//         );
//       } else {
//         return (
//           <h1 className="text-2xl text-red-500 font-semibold my-7 text-center uppercase">
//             You Don't Have Any Listings
//           </h1>
//         );
//       }
//     }
//   };

//   return (
//     <div className="flex flex-col gap-5 p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl font-medium my-3 text-center">Profile</h1>

//       <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
//         <input
//           type="file"
//           onChange={handleFileUpload}
//           ref={inputRef}
//           accept="image/*"
//           hidden
//         />
//         <img
//           src={formData.photo || photo}
//           onClick={() => {
//             inputRef.current.click();
//           }}
//           className="w-28 h-28 rounded-full mx-auto object-cover cursor-pointer"
//           alt="Profile-Image"
//         />
//         <input
//           type="text"
//           placeholder="Username"
//           defaultValue={username}
//           value={formData.username}
//           onChange={(e) =>
//             setFormData({ ...formData, username: e.target.value })
//           }
//           className="border-2 rounded p-3"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           defaultValue={email}
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//           className="border-2 rounded p-3"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//           className="border-2 rounded p-3"
//         />

//         <button
//           disabled={loading}
//           className="bg-slate-500 p-3 rounded-md text-white uppercase hover:opacity-90"
//         >
//           {" "}
//           {loading ? "Loading" : "Update"}{" "}
//         </button>
//         <button
//           onClick={() => {
//             navigate("/create-listing");
//           }}
//           type="button"
//           className="bg-green-500 p-3 rounded-md text-white uppercase"
//         >
//           Create Listing
//         </button>
//       </form>
//       <div className="flex justify-between my-3">
//         <span
//           onClick={handleDeleteUser}
//           className="text-red-600 cursor-pointer"
//         >
//           Delete Account
//         </span>
//         <span className="text-red-600 cursor-pointer" onClick={handleSignout}>
//           {" "}
//           Sign Out{" "}
//         </span>
//       </div>
//       <button onClick={handleShowListings} className="text-green-400 uppercase">
//         Show Listings
//       </button>
//       {/* {listing.length>0 ? (
//         <h1 className="text-3xl font-semibold my-7 text-center">
//           Your Listings
//         </h1>
//       ): <h1 className="text-3xl font-semibold my-7 text-center">
//       You Don't Have Any Listing
//     </h1>  } */}
//       <ShowListingsTextComponent />

//       {listing && listing.length > 0
//         ? listing.map((list, i) => (
//             <div
//               key={listing._id}
//               className="flex justify-between my-5  border-2 rounded-lg p-3"
//             >
//               <Link
//                 className="flex gap-5 items-center "
//                 to={`/listing/${list._id}`}
//               >
//                 <img
//                   className="h-20 w-20 rounded-lg"
//                   src={list.imageURLs[0]}
//                   alt="Listing-Cover-Image"
//                 />
//                 <h1 className="text-lg font-semibold truncate hover:underline">
//                   {list.name}
//                 </h1>
//               </Link>
//               <div className="flex flex-col justify-center items-center">
//                 <button
//                   onClick={() => {
//                     handleListingDelete(list._id);
//                   }}
//                   className="text-green-400 uppercase hover:underline"
//                 >
//                   Delete
//                 </button>
//                 <Link to={"/update-listing/" + list._id}>
//                   <button className="text-red-400 uppercase hover:underline">
//                     Edit
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))
//         : ""}
//     </div>
//   );
// }

// export default Profile;
