import { Link } from "react-router-dom";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";

import { useEffect, useState } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";

const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [inputText, setInputText] = useState("");
  const onlineStatus = useOnlineStatus();

  const filterTopRated = () => {
    setRestaurantList(
      restaurants.filter((restaurant) => restaurant.info.avgRating > 4.5)
    );
  };

  const handleSearch = () => {
    inputText !== ""
      ? setRestaurantList(
          restaurants.filter((restaurant) =>
            restaurant?.info?.name
              ?.toLowerCase()
              .includes(inputText.toLowerCase())
          )
        )
      : setRestaurantList(restaurants);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.73390&lng=76.78890&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    setRestaurants(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setRestaurantList(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );

    console.log(restaurants);
  };
  if (onlineStatus == "offline") {
    return <h1>Please check your internet connection!</h1>;
  }

  if (restaurants.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="filter">
        <div className="search p-4 m-4">
          <input
            type="text"
            className="border border-solid border-black"
            onChange={(event) => setInputText(event.target.value)}
          ></input>
          <button
            className="px-4 py-1 rounded mx-2 bg-orange-400"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="p-4 m-4 search">
          <button
            className="px-4 py-1 rounded mx-2 bg-orange-400"
            onClick={filterTopRated}
          >
            Top Rated
          </button>
        </div>
      </div>
      <div className="res-container flex flex-wrap">
        {restaurantList.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {" "}
            {restaurant.info.avgRating > 4.3 ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
