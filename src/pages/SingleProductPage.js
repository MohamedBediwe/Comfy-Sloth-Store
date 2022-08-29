import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    single_product_error: error,
    single_product_loading: loading,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext();

  const {
    images,
    company,
    stock,
    stars,
    price,
    description,
    name,
    reviews,
    id: sku,
  } = product;

  useEffect(() => {
    fetchSingleProduct(url, id);
    // eslint-disable-next-line
  }, [id]);

  // Redirect to the home page if there is an error
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/comfy-sloth-store");
      }, 3000);
    }
    // eslint-disable-next-line
  }, [error]);

  if (loading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <Error></Error>;
  }

  return (
    <Wrapper>
      <PageHero title={name} product={true}></PageHero>
      <div className="section section-center page">
        <Link to="/comfy-sloth-store/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={stars} reviews={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>Available : </span>
              {stock ? "In stock" : "Out of stock"}
            </p>
            <p className="info">
              <span>Sku : </span>
              {sku}
            </p>
            <p className="info">
              <span>Brand : </span>
              {company}
            </p>
            <hr />
            {stock && <AddToCart product={product} />}
          </section>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
