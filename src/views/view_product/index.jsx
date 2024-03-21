import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { ColorChooser, ImageLoader, MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import { displayMoney } from '@/helpers/utils';
import {
  useBasket,
  useDocumentTitle,
  useProduct,
  useRecommendedProducts,
  useScrollTop
} from '@/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';

const ViewProduct = () => {
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const { addToBasket, isItemOnBasket } = useBasket(id);
  useScrollTop();
  useDocumentTitle(`View ${product?.name || 'Item'}`);

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useRecommendedProducts(6);
  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.image);
  }, [product]);

  const onSelectedSizeChange = (newValue) => {
    setSelectedSize(newValue.value);
  };

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const sizes = ["S", "M", "L", "XL"];

  const sortedSizes = sizes.sort((a, b) => {
    // Define the desired order of sizes
    const sizeOrder = { "S": 0, "M": 1, "L": 2, "XL": 3 };

    // Compare the sizes based on their order
    return sizeOrder[a] - sizeOrder[b];
  });

  const handleAddToBasket = () => {
    addToBasket({ ...product, selectedColor, selectedSize: selectedSize || product.sizes[0] });
  };

  return (
    <main className="content">
      {isLoading && (
        <div className="loader">
          <h4>Cargando producto...</h4>
          <br />
          <LoadingOutlined style={{ fontSize: '3rem' }} />
        </div>
      )}
      {error && (
        <MessageDisplay message={error} />
      )}
      {(product && !isLoading) && (
        <div className="product-view">
          <Link to={SHOP}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; Volver a la tienda
            </h3>
          </Link>
          <div className="product-modal">
            {product.imagen !== null && (
              <div className="product-modal-image-collection">
                {product.imagen.map((image) => (
                  <div
                    className="product-modal-image-collection-wrapper"
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    role="presentation"
                  >
                    <ImageLoader
                      className="product-modal-image-collection-img"
                      src={image.url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="product-modal-image-wrapper">
              {selectedColor && <input type="color" disabled ref={colorOverlay} id="color-overlay" />}
              <ImageLoader
                alt={product.nombre}
                className="product-modal-image"
                src={selectedImage}
              />
            </div>
            <div className="product-modal-details">
              <br />
              <span className="text-subtle">{product.brand}</span>
              <h1 className="margin-top-0">{product.nombre}</h1>
              <span>{product.descripcion}</span>
              <br />
              <br />
              <div className="divider" />
              <br />
              <div>
                <span className="text-subtle">{product.descripcion}</span>
                <br />
                <br />
                <Select
                  placeholder="--Select Size--"
                  onChange={onSelectedSizeChange}
                  options={sortedSizes.map((size) => ({ label: size, value: size }))}
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                />
              </div>
              <br />
              {/* {product.availableColors.length !== undefined && (
                <div>
                  <span className="text-subtle">Seleccionar talla</span>
                  <br />
                  <br />
                  <ColorChooser
                    availableColors={product.availableColors}
                    onSelectedColorChange={onSelectedColorChange}
                  />
                </div>
              )} */}
              <h1>{displayMoney(product.precio)}</h1>
              <div className="product-modal-action">
                <button
                  className={`button button-small ${isItemOnBasket(product.id) ? 'button-border button-border-gray' : ''}`}
                  onClick={handleAddToBasket}
                  type="button"
                >
                  {isItemOnBasket(product.id) ? 'Remove From Basket' : 'Add To Basket'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewProduct;
