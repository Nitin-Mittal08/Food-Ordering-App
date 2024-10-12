import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    cuisines,
    avgRating,
    cloudinaryImageId,
    sla: { deliveryTime },
  } = resData.info;
  return (
    <div className="m-4 p-4 w-[220px] h-200 rounded-lg bg-[#f0f0f0] hover:bg-gray-400">
      <img
        alt="res-logo"
        className="rounded-lg"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-1 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating}stars</h4>
      <h4>{deliveryTime} minutes</h4>
    </div>
  );
};

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute p-2 m-2 bg-black text-white rounded-lg">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
