import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import data from '../data';

function HomeScreen() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchD = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data);
    };
    fetchD();
  }, []);
  return (
    <div>
      <h1>Featured Products </h1>
      <div className="products">
        {products.map((product) => (
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
        ))}
      </div>
    </div>
  );
}
export default HomeScreen;
