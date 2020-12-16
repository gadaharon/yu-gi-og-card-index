import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import Pagination from '@material-ui/lab/Pagination';
import './style.css';

const NUM_OF_CARDS_PER_PAGE = 30;

const CardsList = () => {
  const [cardsList, setCardsList] = useState([]);
  const [cardsPageData, setCardsPageData] = useState([]);

  const fetchCardsList = async () => {
    const { data } = await axios.get(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php'
    );
    setCardsList(data.data);
  };

  useEffect(() => {
    fetchCardsList();
  }, []);

  useEffect(() => {
    const listClone = cloneDeep(cardsList);
    const pageData = listClone.splice(0, NUM_OF_CARDS_PER_PAGE);
    setCardsPageData(pageData);
  }, [cardsList]);

  const onPageChange = (e, page) => {
    const start = (page - 1) * NUM_OF_CARDS_PER_PAGE;
    const listClone = cloneDeep(cardsList);
    const pageData = listClone.splice(start, NUM_OF_CARDS_PER_PAGE);
    setCardsPageData(pageData);
  };

  return (
    <div>
      <h3>Cards list</h3>
      <div className="card-list-container">
        {cardsPageData.map((card, index) => (
          <div className="card-list-item">
            <div className="card-list-item-label">{card.name}</div>
            <img
              className="card-list-item-image"
              src={card.card_images[0].image_url}
              alt="card"
            />
          </div>
        ))}
      </div>
      <Pagination
        onChange={onPageChange}
        count={Math.floor(cardsList.length / NUM_OF_CARDS_PER_PAGE)}
        shape="rounded"
      />
    </div>
  );
};

export default CardsList;
