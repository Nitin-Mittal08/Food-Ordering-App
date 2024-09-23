import { Link } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";

import { useEffect, useState } from "react";

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantList, setRestaurantList] = useState([]);
  const [inputText, setInputText] = useState("");

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
  };

  if (restaurants.length === 0) {
    return <Shimmer />;
  }
  return (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            onChange={(event) => setInputText(event.target.value)}
          ></input>
          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>
        </div>
        <button className="filter-btn" onClick={filterTopRated}>
          Top Rated
        </button>
      </div>
      <div className="res-container">
        {restaurantList.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurants/" + restaurant.info.id}
          >
            {" "}
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
