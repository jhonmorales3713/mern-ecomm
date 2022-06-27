import data from './data';
function App() {
  return (
    <div>
      <header>
        <a href="/">Toktokmall</a>
      </header>
      <main>
        <h1>Featured Products </h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.tag}>
              <a href={`/product/${product.tag}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product-info">
                <a href={`/product/${product.tag}`}>
                  <p>{product.name}</p>
                </a>
                <p>
                  <strong>{product.price}</strong>
                </p>
                <button>Add to Cart</button>
                <button>Buy Now</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
