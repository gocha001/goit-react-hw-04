import css from "./ImageCard.module.css";

const ImageCard = ({ item }) => {
  return (
    <div className={css.card}>
      <img src={item.urls.small} alt={item.alt_description} />
    </div>
  );
};

export default ImageCard;
