import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useFeaturedProducts, useScrollTop } from '@/hooks';
import bannerImg from '@/images/banner.png';
import React from 'react';

const FeaturedProducts = () => {
  useDocumentTitle('Productos destacados | Dolfino');
  useScrollTop();

  let {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading,
    error
  } = useFeaturedProducts();

  const uniqueIds = {};

  // Filter out objects with duplicate IDs
  featuredProducts = featuredProducts.filter(obj => {
      // If the ID is not in the uniqueIds object, add it and return true to keep the object
      if (!uniqueIds[obj.id]) {
          uniqueIds[obj.id] = true;
          return true;
      }
      // If the ID is already in the uniqueIds object, return false to filter out the object
      return false;
  });


  return (
    <main className="content">
      <div className="featured">
        <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchFeaturedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductShowcaseGrid
                products={featuredProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FeaturedProducts;
