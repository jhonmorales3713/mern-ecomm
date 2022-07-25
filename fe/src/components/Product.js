import axios from 'axios';
import { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Store } from '../Store';
import Rating from './Rating';
function Product(props) {
  const { product } = props;
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  //   const addToCartHandler = () => {
  //     ctxDispatch({
  //       type: 'ADD_CART_ITEM',
  //       payload: { ...product, quantity: 1 },
  //     });
  //   };
  const addToCartHandler = async (item) => {
    const itemexist = cartItems.find((product2) => product2._id === product.id);
    const quantity = itemexist ? itemexist.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('This product is out of stock');
      return;
    }
    ctxDispatch({
      type: 'ADD_CART_ITEM',
      payload: { ...item, quantity },
    });
  };
  return (
    <Card className="product">
      <Link to={`/product/${product.tag}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.tag}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>{product.price}</Card.Text>
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out Of Stock
          </Button>
        ) : (
          <Button
            onClick={() => addToCartHandler(product)}
            className="btn-add-to-cart"
          >
            Add To Cart
          </Button>
        )}
        <Button className="btn-buy-now">Buy Now</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
