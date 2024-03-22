/* eslint-disable react/jsx-props-no-spreading */
import { LoadingOutlined } from '@ant-design/icons';
import { Boundary, MessageDisplay } from '@/components/common';
import { ProductGrid } from '@/components/product';
import { useDidMount } from '@/hooks';
import PropType from 'prop-types';
import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '@/redux/actions/miscActions';
import { searchProduct } from '@/redux/actions/productActions';
import axios from 'axios';


const Search = ({ match }) => {
  const { searchKey } = match.params;
  const dispatch = useDispatch();
  const didMount = useDidMount(true);
  const store = useSelector((state) => ({
    isLoading: state.app.loading,
    products: state.products.searchedProducts.items,
    basket: state.basket,
    requestStatus: state.app.requestStatus
  }));

  const [products, setProducts] = useState([]);
  const [requestStatus, setRequestStatus] = useState(false);

  const fetchProducts = async () => {
    try {
      let response = await axios.get('http://localhost:8000/api/productos');
      response = response.data

      const filteredResponse = response.filter(item =>
        item.nombre.toLowerCase().includes(searchKey.toLowerCase()) || 
        item.descripcion.toLowerCase().includes(searchKey.toLowerCase())
      );      
      console.log('Filtered:',filteredResponse)
      setProducts(filteredResponse);
      setRequestStatus(true);
    } catch (error) {
      setRequestStatus(false);
    } finally {

    }
  };
  useEffect(() => {
    fetchProducts();
  }, [searchKey]);




  if (!requestStatus) {
    return (
      <main className="content">
        <MessageDisplay
          message={store.requestStatus}
          desc="Intenta usar otras palabras para buscar"
        />
      </main>
    );
  }
  if (requestStatus){
    return (
      <Boundary>
        <main className="content">
          <section className="product-list-wrapper product-list-search">
            {!store.requestStatus && (
              <div className="product-list-header">
                <div className="product-list-header-title">
                  <h5>
                    {`Se encontraron ${products.length} ${products.length === 1 ? 'prenda' : 'prendas'} con las palabras de busqueda: ${searchKey}`}
                  </h5>
                </div>
              </div>
            )}
            <ProductGrid products={products} />
          </section>
        </main>
      </Boundary>
    );
  }

  return (
    <main className="content">
      <div className="loader">
        <h4>Buscando productos...</h4>
        <br />
        <LoadingOutlined style={{ fontSize: '3rem' }} />
      </div>
    </main>
  );
};

Search.propTypes = {
  match: PropType.shape({
    params: PropType.shape({
      searchKey: PropType.string
    })
  }).isRequired
};

export default Search;
