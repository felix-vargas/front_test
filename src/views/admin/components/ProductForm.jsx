/* eslint-disable jsx-a11y/label-has-associated-control */
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { ImageLoader } from '@/components/common';
import {
  CustomColorInput, CustomCreatableSelect, CustomInput, CustomTextarea
} from '@/components/formik';
import {
  Field, FieldArray, Form, Formik
} from 'formik';
import { useFileHandler } from '@/hooks';
import PropType from 'prop-types';
import React from 'react';
import * as Yup from 'yup';
import fs from 'fs';
import axios from 'axios';
// Default brand names that I used. You can use what you want
const brandOptions = [
  { value: 'Salt Maalat', label: 'Salt Maalat' },
  { value: 'Betsin Maalat', label: 'Betsin Maalat' },
  { value: 'Sexbomb', label: 'Sexbomb' },
  { value: 'Black Kibal', label: 'Black Kibal' }
];

const FormSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('Product name is required.')
    .max(60, 'Product name must only be less than 60 characters.'),
  precio: Yup.number()
    .positive('Price is invalid.')
    .integer('Price should be an integer.')
    .required('Price is required.'),
  descripcion: Yup.string()
    .required('Description is required.'),
  stock_s: Yup.number()
    .integer('Max quantity should be an integer.')
    .required('Stock.'), 
  stock_m: Yup.number()
    .integer('Max quantity should be an integer.')
    .required('Max quantity is required.'),
  stock_l: Yup.number()
    .integer('Max quantity should be an integer.')
    .required('Max quantity is required.'),
  stock_xl: Yup.number()
    .integer('Max quantity should be an integer.')
    .required('Max quantity is required.'),
});

const ProductForm = ({ product, onSubmit, isLoading }) => {
  const initFormikValues = {
    nombre: product?.nombre || '',
    precio: product?.precio || 0,
    descripcion: product?.description || 'Producto de tienda Dolfino',
    stock_s: product?.stock_s || 0,
    stock_m: product?.stock_m || 0,
    stock_l: product?.stock_l || 0,
    stock_xl:  product?.stock_xl || 0,
    talla: product?.talla || 'S',
  };

  const {
    imageFile,
    isFileLoading,
    onFileChange,
    removeImage
  } = useFileHandler({ image: {}, imageCollection: product?.imageCollection || [] });

  const onSubmitForm = (form) => {
        //image: imageFile?.image?.file || product.imageUrl
    try{
      const nuevo_producto = {
        imagen_data:imageFile.image,
        precio:form.precio,
        nombre:form.nombre,
        descripcion:form.descripcion,
        stock_s:form.stock_s,
        stock_m:form.stock_m,
        stock_l:form.stock_l,
        stock_xl:form.stock_xl,
        imagen:imageFile.image.file['name'],
        talla:product?.talla || 'S'
      }
      console.log(nuevo_producto)
      const response = axios.post(
        'http://localhost:8000/api/create_product',
        {nuevo_producto}
      )
  }
  catch(err){
    console.error('Error al intentar agregar producto:',err);
  }
  };

  return (
    <div>
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onSubmitForm}
      >
        {({ values, setValues }) => (
          <Form className="product-form">
            <div className="product-form-inputs">
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="nombre"
                    id="nombre"
                    type="text"
                    label="* Nombre"
                    placeholder="Poleron estampado"
                    style={{ textTransform: 'capitalize' }}
                    component={CustomInput}
                  />
                </div>
                &nbsp;
              </div>
              <div className="product-form-field">
                <Field
                  disabled={isLoading}
                  name="descripcion"
                  id="descripcion"
                  rows={5}
                  label="* Descripcion de producto"
                  component={CustomTextarea}
                />
              </div>
              <div className="d-flex">
                <div className="product-form-field">
                  <Field
                    disabled={isLoading}
                    name="precio"
                    id="precio"
                    type="number"
                    label="* Precio"
                    component={CustomInput}
                  />
                </div>
                </div>
                &nbsp;
                <div className="d-flex">
                  <div className="product-form-field">
                    <Field
                      disabled={isLoading}
                      name="stock_s"
                      type="number"
                      id="stock_s"
                      label="* Stock Talla S"
                      component={CustomInput}
                    />
                  </div>
                  &nbsp;
                  <div className="product-form-field">
                    <Field
                      disabled={isLoading}
                      name="stock_m"
                      type="number"
                      id="stock_m"
                      label="* Stock Talla M"
                      component={CustomInput}
                    />
                  </div>
                  &nbsp;
                  <div className="product-form-field">
                    <Field
                      disabled={isLoading}
                      name="stock_l"
                      type="number"
                      id="stock_l"
                      label="* Stock Talla L"
                      component={CustomInput}
                    />
                  </div>
                </div>
                <div className="d-flex">
                  &nbsp;
                  <div className="product-form-field">
                    <Field
                      disabled={isLoading}
                      name="stock_xl"
                      type="number"
                      id="stock_xl"
                      label="* Stock Talla XL"
                      component={CustomInput}
                    />
                  </div>
                </div>
              
              <div className="product-form-collection">
                <>
                  {imageFile.imageCollection.length >= 1 && (
                    imageFile.imageCollection.map((image) => (
                      <div
                        className="product-form-collection-image"
                        key={image.id}
                      >
                        <ImageLoader
                          alt=""
                          src={image.url}
                        />
                        <button
                          className="product-form-delete-image"
                          onClick={() => removeImage({ id: image.id, name: 'imageCollection' })}
                          title="Delete Image"
                          type="button"
                        >
                          <i className="fa fa-times-circle" />
                        </button>
                      </div>
                    ))
                  )}
                </>
              </div>
              <br />
              <br />
              <div className="product-form-field product-form-submit">
                <button
                  className="button"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
                  &nbsp;
                  {isLoading ? 'Agregando producto...' : 'Agregar producto'}
                </button>
              </div>
            </div>
            {/* ----THUBMNAIL ---- */}
            <div className="product-form-file">
              <div className="product-form-field">
                <span className="d-block padding-s">* Thumbnail</span>
                {!isFileLoading && (
                  <label htmlFor="product-input-file">
                    <input
                      disabled={isLoading}
                      hidden
                      id="product-input-file"
                      onChange={(e) => onFileChange(e, { name: 'image', type: 'single' })}
                      readOnly={isLoading}
                      type="file"
                    />
                    Choose Image
                  </label>
                )}
              </div>
              <div className="product-form-image-wrapper">
                {(imageFile.image.url || product.image) && (
                  <ImageLoader
                    alt=""
                    className="product-form-image-preview"
                    src={imageFile.image.url || product.image}
                  />
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ProductForm.propTypes = {
  product: PropType.shape({
    name: PropType.string,
    brand: PropType.string,
    price: PropType.number,
    maxQuantity: PropType.number,
    description: PropType.string,
    keywords: PropType.arrayOf(PropType.string),
    imageCollection: PropType.arrayOf(PropType.object),
    sizes: PropType.arrayOf(PropType.string),
    image: PropType.string,
    imageUrl: PropType.string,
    isFeatured: PropType.bool,
    isRecommended: PropType.bool,
    availableColors: PropType.arrayOf(PropType.string)
  }).isRequired,
  onSubmit: PropType.func.isRequired,
  isLoading: PropType.bool.isRequired
};

export default ProductForm;
