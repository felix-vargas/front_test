import { useDidMount } from '@/hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from '@/services/firebase';
import axios from 'axios';

const useProduct = (id) => {
  // get and check if product exists in store
  const storeProduct = useSelector((state) => state.products.items.find((item) => item.id === id));

  const [product, setProduct] = useState(storeProduct);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!product || product.id !== id) {
          setLoading(true);
          let doc = await axios.post('http://localhost:8000/api/producto',{
            id:id
          });  
          doc = doc.data
          console.log(doc)
          console.log('doc.exists->',doc.exists);
          if (didMount) {
            setProduct(doc);
            setLoading(false);
          }

        }
      } catch (err) {
        if (didMount) {
          setLoading(false);
          setError(err?.message || 'Algo sali&oacute; mal.');
        }
      }
    })();
  }, [id]);

  return { product, isLoading, error };
};

export default useProduct;
