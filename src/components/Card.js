import React from 'react';

const Card = ({ cardData }) => {
  const { name, type, race, desc, archetype, card_images } = cardData;
  return (
    <div>
      <div>name: {name}</div>
      <div>type: {type}</div>
      <div>race: {race}</div>
      <div>desc: {desc}</div>
      <div>archetype: {archetype}</div>
      <img src={card_images[0].image_url} alt="card-image" />
    </div>
  );
};

export default Card;
