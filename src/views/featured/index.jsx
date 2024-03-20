import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { useDocumentTitle, useFeaturedProducts, useScrollTop } from '@/hooks';
import bannerImg from '@/images/banner-guy.png';
import React from 'react';

const FeaturedProducts = () => {
  useDocumentTitle('Productos destacados | Salinaka');
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
        <div className="banner">
          <div className="banner-desc">
            <h1>Featured Products</h1>
          </div>
          <div className="banner-img">
            <img src={bannerImg} alt="" />
          </div>
        </div>
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
