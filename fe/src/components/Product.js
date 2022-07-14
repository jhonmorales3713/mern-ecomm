import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';
function Product(props) {
  const { product } = props;
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
        <Button className="btn-add-to-cart">Add To Cart</Button>
        <Button className="btn-buy-now">Buy Now</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;
