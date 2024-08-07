import { LoadingOutlined } from '@ant-design/icons';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import React, { lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addProduct } from '@/redux/actions/productActions';
import fs from 'fs'
import path from 'path';

const ProductForm = lazy(() => import('../components/ProductForm'));

const AddProduct = () => {
  useScrollTop();
  useDocumentTitle('Add New Product | Dolfino');
  const isLoading = useSelector((state) => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (product) => {
  };

  return (
    <div className="product-form-container">
      <h2>Add New Product</h2>
      <Suspense fallback={(
        <div className="loader" style={{ minHeight: '80vh' }}>
          <h6>Loading ... </h6>
          <br />
          <LoadingOutlined />
        </div>
      )}
      >
        <ProductForm
          isLoading={isLoading}
          onSubmit={onSubmit}
          product={{
            nombre: '',
            precio: 0,
            descripcion: '',
            talla: 'S,M,L,XL',
            imagen: '',
            stock_s: 0,
            stock_m: 0,
            stock_l: 0,
            stock_xl: 0,
          }}
        />
      </Suspense>
    </div>
  );
};

export default withRouter(AddProduct);
