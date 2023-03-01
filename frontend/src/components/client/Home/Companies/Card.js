const Card = ({ card }) => (
  <div className="card">
    <img src={card.image1} alt={card.text1} />
    <h3>{card.text1}</h3>
    <p>{card.subtitle}</p>
    <img src={card.image2} alt={card.text1} />
  </div>
);

export default Card;
