import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import firebase from '@/services/firebase';
import axios from 'axios';

const useFeaturedProducts = (itemsCount) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      setError('');

      //const docs = await firebase.getFeaturedProducts(itemsCount);

      const result = await axios.get('http://localhost:8000/api/productos');      
      let docs = result.data;
      console.log(docs);
      if (docs.empty) {
        if (didMount) {
          setError('No se encontraron productos destacados.');
          setLoading(false);
        }
      } else {
        const items = docs;

        if (didMount) {
          setFeaturedProducts(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('No se encontraron productos destacados.');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (featuredProducts.length === 0 && didMount) {
      fetchFeaturedProducts();
    }
  }, []);

  return {
    featuredProducts, fetchFeaturedProducts, isLoading, error
  };
};

export default useFeaturedProducts;
