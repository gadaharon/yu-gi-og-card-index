import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import Pagination from '@material-ui/lab/Pagination';

import Card from './Card';

const NUM_OF_CARDS_PER_PAGE = 10;

const CardsList = () => {
  const [cardsList, setCardsList] = useState([]);
  const [cardsPageData, setCardsPageData] = useState([]);

  useEffect(async () => {
    const { data } = await axios.get(
      'https://db.ygoprodeck.com/api/v7/cardinfo.php'
    );
    // console.log(data);
    setCardsList(data.data);
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
      {cardsPageData.map((card, index) => (
        <Card key={index} cardData={card} />
      ))}
      <Pagination
        onChange={onPageChange}
        count={Math.floor(cardsList.length / NUM_OF_CARDS_PER_PAGE)}
        shape="rounded"
      />
    </div>
  );
};

export default CardsList;
