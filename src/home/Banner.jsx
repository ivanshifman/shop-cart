import { useState } from "react";
import productData from "../../public/products.json";
import { Link } from "react-router-dom";
import SelectedCategory from "../components/SelectedCategory";

const title = (
  <h2 className="pb-5">
    Search your one from <span>thousand</span> of products
  </h2>
);
const desc = "We have the largest collection of products";

const Banner = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(productData);

  const categories = Array.from(
    new Set(productData.map((product) => product.category))
  );

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchInput(searchTerm);

    const filtered = productData.filter(
      (product) =>
        product.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase()) &&
        (selectedCategory === "all" || product.category === selectedCategory)
    );

    setFilteredProducts(filtered);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSearchInput("");
    const filtered = productData.filter(
      (product) =>
        (category === "all" || product.category === category) &&
        product.name
          .toLocaleLowerCase()
          .includes(searchInput.toLocaleLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="banner-section style-4">
      <div className="container">
        <div className="banner-content">
          {title}
          <form onSubmit={(e) => e.preventDefault()}>
            <SelectedCategory
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
            <input
              type="text"
              name="search"
              id="search"
              placeholder="Search your product"
              value={searchInput}
              onChange={handleSearch}
            />
            <button type="submit">
              <i className="icofont-search"></i>
            </button>
          </form>
          <p className="pt-4">{desc}</p>
          <ul className="lab-ul">
            {searchInput &&
              filteredProducts.map((product, i) => (
                <li key={i}>
                  <Link to={`/shop/${product.id}`}>{product.name}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Banner;
