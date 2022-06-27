import { useParams } from 'react-router-dom';

function ProductScreen() {
  const param = useParams();
  const { tag } = param;
  return <div>{tag}</div>;
}
export default ProductScreen;
