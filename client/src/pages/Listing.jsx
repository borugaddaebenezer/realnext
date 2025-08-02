import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import { useSelector, useDispatch } from "react-redux";
import {
  FaBath,
  FaBed,
  FaChair,
  FaLocationDot,
  FaSquareParking,
} from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
// import Contact from "../components/Contact";

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [contact, setContact] = useState(false);

  useEffect(() => {
    async function getListingData() {
      const listingId = params.listingId;
      console.log("The listing id is", listingId);
      try {
        setLoading(true);
        const listingData = await axios.get(`/api/listing/get/${listingId}`);
        console.log(listingData.data);
        setLoading(false);
        setError(false);
        setListing(listingData.data);
        if (listingData.success === false) {
          setLoading(false);
          setError(listingData.data.errorMessage);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    }
    getListingData();
  }, [params.listingId]);

  return (
    <main>
      {loading && (
        <p className="text-2xl font-semibold my-7 text-center">Loading...</p>
      )}
      {error && (
        <p className="text-2xl font-semibold my-7 text-center">
          Something Went Wrong
        </p>
      )}
      {listing && !error && !loading && (
        <div className="p-5 bg-neutral-200">
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] mx-auto rounded-lg my-2"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mx-auto mt-5 sm:max-w-2xl sm:mx-auto">
            <div className="flex items-center gap-3 text-green-600">
              <h1 className="text-3xl font-semibold">{listing.name}</h1>
              <FaHome className="text-2xl" />
            </div>

            <div className="flex gap-1 items-center text-lg my-3">
              <FaLocationDot className="text-green-600" />
              <span className="font-semibold">{listing.address}</span>
            </div>

            <p className="text-sm text-gray-500">
              Listed on: {new Date(listing.createdAt).toLocaleDateString()}
            </p>

            <div>
              <div
                className={`p-3 rounded-lg font-semibold max-w-lg my-3 text-white ${
                  listing.type === "rent" ? "bg-red-700" : "bg-green-700"
                }`}
              >
                {listing.type === "rent"
                  ? `Rent per month is $${listing.regularPrice}`
                  : `Cost $${listing.regularPrice}`}
              </div>

              {listing.offer && (
                <div className="bg-green-700 text-white p-3 rounded-lg font-semibold max-w-lg my-3">
                  Max Discount is ${listing.discountPrice}
                </div>
              )}
            </div>

            <div className="p-3 font-semibold text-lg">
              <p className="mb-2">Description -</p>
              <p className="text-slate-700">{listing.description}</p>
            </div>

            <ul className="p-3 flex flex-col gap-5 text-green-900">
              <li className="flex gap-2 whitespace-nowrap items-center font-semibold">
                <FaBed className="text-3xl" />
                Bedroom/s : {listing.bedrooms}
              </li>
              <li className="flex gap-2 whitespace-nowrap items-center font-semibold">
                <FaBath className="text-3xl" />
                Bathroom/s : {listing.bathrooms}
              </li>
              <li className="flex gap-2 whitespace-nowrap items-center font-semibold">
                <FaSquareParking className="text-3xl" />
                Parking : {listing.parking ? "Available" : "Not available"}
              </li>
              <li className="flex gap-2 whitespace-nowrap items-center font-semibold">
                <FaChair className="text-3xl" />
                Furnished : {listing.furnished ? "Furnished" : "Not Furnished"}
              </li>
            </ul>

            {/* Uncomment when Contact component is ready
            {currentUser && !contact && currentUser._id !== listing.userRef && (
              <button
                onClick={() => {
                  setContact(true);
                }}
                className="bg-slate-500 p-3 text-white rounded-lg w-full my-3 text-lg font-semibold hover:opacity-95"
              >
                Contact The LandLord
              </button>
            )}
            {contact && <Contact listing={listing} />} */}
          </div>
        </div>
      )}
    </main>
  );
}
