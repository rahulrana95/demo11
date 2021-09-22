import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import fetchStock from './service/fetch-stock-api';

function App() {
  const [date, setDate] = useState('');

  const [apiInfo, setApiInfo] = useState({ isLoading: false, error: '' });
  const [isAPIHit, setIsAPIHit] = useState(false);
  const [stockInfo, setStockInfo] = useState(null);

  const onSearchChange = (e) => {
    setStockInfo(null);
    setDate((state) => {
      return e.target.value;
    });
    setApiInfo((state) => {
      state.error = '';
      return state;
    });
    setIsAPIHit(false);
  };

  const onSearchClick = async () => {
    setStockInfo(null);
    setIsAPIHit(false);
    setApiInfo((state) => {
      state.isLoading = true;
      state.error = '';
      return state;
    });
    try {
      const data = await fetchStock(date);
      console.log(data);
      setIsAPIHit(true);

      setApiInfo((state) => {
        state.isLoading = false;
        return state;
      });
      if (data.open === undefined) {
        setStockInfo(null);
      } else {
        setStockInfo({ ...data });
      }
    } catch (err) {
      setApiInfo((state) => {
        state.error = err.message;
        return state;
      });
    } finally {
      setApiInfo((state) => {
        state.isLoading = false;
        return state;
      });
    }
  };

  const _renderResult = () => {
    if (stockInfo) {
      const { open, low, high, close } = stockInfo;
      return (
        <ul data-testid="stock-data">
          <li>Open: {open}</li>
          <li>Close: {close}</li>
          <li>High: {high}</li>
          <li>Low: {low}</li>
        </ul>
      );
    } else if (isAPIHit) {
      console.log('empty');
      return <div data-testid="no-result">No Results Found</div>;
    }

    return null;
  };

  return (
    <div className="App">
      <div
        style={{
          height: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '8px 16px',
          backgroundColor: 'black',
          color: 'green',
          marginBottom: '16px',
        }}
      >
        Stock Data
      </div>
      <div>
        <input
          value={date}
          type="text"
          data-testid="app-input"
          onChange={onSearchChange}
        />
        <button onClick={onSearchClick}>Search</button>
      </div>
      <div>{_renderResult()}</div>
    </div>
  );
}

export default App;
