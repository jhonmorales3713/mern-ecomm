import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
// import data from '../data';
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchD = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        // setProducts(result.data);
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };
    fetchD();
  }, []);
  return (
    <div>
      <h1>Featured Products </h1>
      <div className="products">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div className="product" key={product.tag}>
              <Link to={`/product/${product.tag}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className="product-info">
                <Link to={`/product/${product.tag}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>{product.price}</strong>
                </p>
                <button>Add to Cart</button>
                <button>Buy Now</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
