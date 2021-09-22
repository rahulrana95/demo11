import apiConfig from './config';
const fetchStock = (date) => {
  const requestOptions = {};
  return fetch(
    `${apiConfig.baseURL}${apiConfig.apiEndPoint.fetchStockInfo}?date=${date}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((responseData) => {
      return {
        ...responseData.data[0],
      };
    });
};

export default fetchStock;
