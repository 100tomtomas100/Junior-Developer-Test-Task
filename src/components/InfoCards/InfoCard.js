import "../../assets/infoCard.css";

const InfoCard = (product) => {
  const productType = {
    Book: `Weight: ${product.props.weight}KG`,
    DVD: `Size: ${product.props.size}MB`,
    Furniture: `Dimensions: ${product.props.height}x${product.props.width}x${product.props.length}`,
  };

  const handleChange = (e) => {
    product.marks(e.target.id);
  };

  return (
    <div className="info-card">
      <div className="checkbox">
        <input
          type="checkbox"
          id={product.props.sku}
          onChange={handleChange}
          className="delete-checkbox"
        />
      </div>
      <div className="card-info">
        <p>{product.props.sku}</p>
        <p>{product.props.name}</p>
        <p>{`${product.props.price}$`}</p>
        <p>{productType[product.props.type]}</p>
      </div>
    </div>
  );
};

export default InfoCard;
