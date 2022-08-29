import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    clearFilters,
    updateFilters,
    filters: {
      text,
      company,
      color,
      category,
      min_price,
      max_price,
      price,
      shipping,
    },
    all_products,
  } = useFilterContext();

  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");
  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Search input start */}
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          {/* Search input end */}
          {/* Categories start */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((e, index) => (
                <button
                  type="button"
                  className={`${
                    category === e.toLowerCase() ? "active" : null
                  }`}
                  key={index}
                  onClick={updateFilters}
                  name="category"
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
          {/* Categories end */}
          {/* Companies start */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              className="company"
              value={company}
              onChange={updateFilters}
            >
              {companies.map((e, index) => (
                <option key={index} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
          {/* Companies end */}
          {/* Colors start */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              <button
                name="color"
                data-color="all"
                className={`${color === "all" ? "all-btn active" : "all-btn"}`}
                onClick={updateFilters}
                value="all"
              >
                all
              </button>
              {colors
                .filter((e) => e !== "all")
                .map((e, index) => (
                  <button
                    key={index}
                    value={e}
                    name="color"
                    className={`${
                      color === e ? "color-btn active" : "color-btn"
                    }`}
                    data-color={e}
                    style={{ backgroundColor: e }}
                    onClick={updateFilters}
                  >
                    {color === e && <FaCheck></FaCheck>}
                  </button>
                ))}
            </div>
          </div>
          {/* Colors end */}
          {/* Price start */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>
          {/* Price end */}
          {/* Shipping start */}
          <div className="form-control shipping">
            <label htmlFor="shipping">free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              id="shipping"
              onChange={updateFilters}
              checked={shipping}
            />
          </div>
          {/* Shipping end */}
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
