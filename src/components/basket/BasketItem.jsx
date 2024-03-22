import { CloseOutlined } from '@ant-design/icons';
import { BasketItemControl } from '@/components/basket';
import { ImageLoader } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeFromBasket } from '@/redux/actions/basketActions';

const BasketItem = ({ product }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id));
  console.log(product.precio )
  console.log((product.precio * product.quantity));
  if(product.quantity === undefined){
    product.quantity = 1;
  }
  return (
    <div className="basket-item">
      <BasketItemControl product={product} />
      <div className="basket-item-wrapper">
        <div className="basket-item-img-wrapper">
          <ImageLoader
            alt={product.nombre}
            className="basket-item-img"
            src={product.imagen}
          />
        </div>
        <div className="basket-item-details">
          <Link to={`/product/${product.id}`} onClick={() => document.body.classList.remove('is-basket-open')}>
            <h4 className="underline basket-item-name">
              {product.nombre}
            </h4>
          </Link>
          <div className="basket-item-specs">
            <div>
              <span className="spec-title">Unidades</span>
              <h5 className="my-0">{product.quantity}</h5>
            </div>
            <div>
              <span className="spec-title">Talla</span>
              <h5 className="my-0">
                {product.selectedSize}
              </h5>
            </div>
          </div>
        </div>
        <div className="basket-item-price">
          <h4 className="my-0">{displayMoney(product.precio * product.quantity)}</h4>
        </div>
        <button
          className="basket-item-remove button button-border button-border-gray button-small"
          onClick={onRemoveFromBasket}
          type="button"
        >
          <CloseOutlined />
        </button>
      </div>
    </div>
  );
};

BasketItem.propTypes = {
  product: PropType.shape({
    id: PropType.number,
    nombre: PropType.string,
    brand: PropType.string,
    precio: PropType.number,
    quantity: PropType.number,
    maxQuantity: PropType.number,
    descripcion: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    selectedSize: PropType.string,
    selectedColor: PropType.string,
    imageCollection: PropType.arrayOf(PropType.string),
    talla: PropType.string,
    imagen: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired
};

export default BasketItem;
