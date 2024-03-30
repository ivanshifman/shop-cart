import Data from "../products.json";

const ShopCategory = ({
  filterItem,
  menuItems,
  setProducts,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <>
      <div className="widget-header">
        <h5 className="ms-2">All categories</h5>
      </div>
      <div>
        <button
          onClick={() => {
            setProducts(Data);
            setSelectedCategory("All");
          }}
          className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}
        >
          All
        </button>
        {menuItems.map((val, id) => {
          return (
            <button
              className={`m-2 ${selectedCategory === val ? "bg-warning" : ""}`}
              key={id}
              onClick={() => filterItem(val)}
            >
              {val}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ShopCategory;
