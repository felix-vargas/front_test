import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { ColorChooser, ImageLoader, MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { RECOMMENDED_PRODUCTS, SHOP, FEATURED_PRODUCTS } from '@/constants/routes';
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
  useDocumentTitle(`Ver ${product?.nombre || 'Articulo'}`);

  const [selectedImage, setSelectedImage] = useState(product?.imagen || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.imagen);
  }, [product]);

  const onSelectedSizeChange = (newValue) => {
    console.log(newValue)
    setSelectedSize(newValue.value);
  };

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const sizesSample = ["S", "M", "L", "XL"];

  function sortedSizes(sizes) {
    // Check if the input is an array of strings or an array of numbers
    let newSizes = sizes.split(',');
    if (newSizes.every(size => sizesSample.includes(size))) {
        // Handle array of strings (sizes like 'S', 'M', 'L', 'XL')
        // Define a custom sorting function based on size weights
        const sizeWeights = { 'S': 0, 'M': 1, 'L': 2, 'XL': 3 };
        newSizes.sort((a, b) => sizeWeights[a] - sizeWeights[b]);
    } else if (newSizes.every(size => /^\d+$/.test(size))) {
        // Handle array of numbers represented as strings (sizes like '1', '2', '3', '4')
        newSizes = newSizes.map(Number); // Convert strings to numbers
        newSizes.sort((a, b) => a - b);
    } else {
        // Handle invalid input
        return sizesSample.map(size => ({ value: size, label: size }));
    }
    console.log(newSizes);
    return newSizes.map(size => ({ value: size.toString(), label: size.toString() }));
}


console.log(product)

  const handleAddToBasket = () => {
    addToBasket({ ...product, selectedColor, selectedSize: selectedSize || product.talla[0] });
  };

  return (
    <main className="content" style={{ display: 'flex', justifyContent: 'center' }}>
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
          <Link to={FEATURED_PRODUCTS}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; Volver a la tienda
            </h3>
          </Link>
          <div className="product-modal" >
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
                <span className="text-subtle">Talla seleccionada: {selectedSize}</span>

                <Select
                  placeholder="--Seleccionar Talla--"
                  onChange={onSelectedSizeChange}
                  options={sortedSizes(product.talla)}
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                />
              </div>
              <br />
              <h1>{displayMoney(product.precio)}</h1>
              <div className="product-modal-action">
                <button
                  className={`button button-small ${isItemOnBasket(product.id) ? 'button-border button-border-gray' : ''}`}
                  onClick={handleAddToBasket}
                  type="button"
                >
                  {isItemOnBasket(product.id) ? 'Quitar del carro' : 'Agregar al carro'}
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
