import { useState } from "react"
import PageHeader from "../components/PageHeader"
import Data from "../products.json"
import ProductCards from "./ProductCards"
import Pagination from "./Pagination"
import Search from "./Search"
import ShopCategory from "./ShopCategory"
import PopularPost from "./PopularPost"
import Tags from "./Tags"

const Shop = () => {

    const [gridList, setGridList] = useState(true);
    const [products, setProducts] = useState(Data);
    const [currentPage, setCurrentPage] = useState(1);

    const productsForPage = 12;
    const indexOfLastProduct = currentPage * productsForPage;
    const indexOfFirstProduct = indexOfLastProduct - productsForPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const shopResults = `Showing ${indexOfFirstProduct + 1} - ${indexOfLastProduct > products.length ? products.length : indexOfLastProduct} of ${products.length} results`;

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const [selectedCategory, setSelectedCategory] = useState("All");
    const menuItems = [...new Set(Data.map((val) => val.category))];

    const filterItem = (curCat) => {
        const newItem = Data.filter((newVal) => {
            return newVal.category === curCat;
        })
        setSelectedCategory(curCat);
        setProducts(newItem);
        setCurrentPage(1);
    }


  return (
    <>
      <PageHeader title="Shop" curPage="Shop"/>
      <div className="shop-page padding-tb">
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-lg-8 col-12">
                    <article>
                        <div className="shop-title d-flex flex-wrap justify-content-between">
                            <p>{shopResults}</p>
                            <div className={`product-view-mode ${gridList ? "gridActive" : "listActive"}`}>
                                <a className="grid" onClick={() => setGridList(!gridList)}>
                                    <i className="icofont-ghost"></i>
                                </a>
                                <a className="list" onClick={() => setGridList(!gridList)}>
                                    <i className="icofont-listine-dots"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div>
                            <ProductCards gridList={gridList} products={currentProducts}/>
                        </div>
                        <Pagination productsForPage={productsForPage} totalProducts={products.length} paginate={paginate} activePage={currentPage}/>

                    </article>
                </div>
                <div className="col-lg-4 col-12">
                    <aside>
                        <Search products={products} gridList={gridList}/>
                        <ShopCategory filterItem={filterItem} menuItems={menuItems} setProducts={setProducts} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
                        <PopularPost />
                        <Tags />
                    </aside>
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Shop
