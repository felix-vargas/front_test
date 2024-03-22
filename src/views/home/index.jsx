import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop
} from '@/hooks';
import bannerImg from '@/images/banner.png';
import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  useDocumentTitle('Dolfino Tienda');
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  return (
    <main className="content">
      <div className="home">
        <div className="banner">
          <div className="banner-desc">
            <h1 className="text-thin">
              <strong>Dolfino</strong>
              &nbsp;4&nbsp;
              <strong>All</strong>
            </h1>
            <h2 className="text-thin">
              <strong>Moda circular</strong>
            </h2>
            <p>
              Hecho a mano, producto chileno
            </p>
            <br />
            <Link to={FEATURED_PRODUCTS} className="button">
              Comprar&nbsp;
              <ArrowRightOutlined />
            </Link>
          </div>
          <div className="banner-img"><img src={bannerImg} alt="" /></div>
        </div>
        <div className="display">
          <div className="display-header">
            <h1>Productos destacados</h1>
            <Link to={FEATURED_PRODUCTS}>Ver todo</Link>
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductShowcaseGrid
              products={featuredProducts.slice(0,8)}
              skeletonCount={6}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
