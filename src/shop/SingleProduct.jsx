import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import ProductDisplay from "./ProductDisplay";
import Review from "./Review";
import PopularPost from "./PopularPost";
import Tags from "./Tags";

const SingleProduct = () => {
  const [product, setProducts] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch("/src/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const result = product.filter((p) => p.id === id);
  const doubledResults = [...result, ...result];

  return (
    <div>
      <PageHeader title={"Single product"} curPage={"Shop / Single product"} />

      <div className="shop-single padding-tb aside-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="product-details">
                  <div className="row align-items-center">
                    <div className="col-md-6 col-12">
                      <div className="product-thumb">
                        <div className="swiper-container pro-single-top">
                          <Swiper
                            className="mySwiper"
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={false}
                            autoplay={{
                              delay: 2000,
                              disableOnInteraction: false,
                            }}
                            modules={[Autoplay]}
                            navigation={{
                              prevEl: ".pro-single-prev",
                              nextEl: ".pro-single-next",
                            }}
                          >
                            {doubledResults.map((item, i) => (
                              <SwiperSlide key={i}>
                                <div className="single-thumb">
                                  <img src={item.img} alt={item.name} />
                                </div>
                              </SwiperSlide>
                            ))}
                          </Swiper>

                          <div className="pro-single-next">
                            <i className="icofont-rounded-left"></i>
                          </div>
                          <div className="pro-single-prev">
                            <i className="icofont-rounded-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6 col-12">
                      <div className="post-content">
                        {result.map((item) => (
                          <ProductDisplay key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="review">
                  {
                    result.map((item) => (
                      <Review key={item.id} item={item}/>
                    ))
                  }
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">
              <aside className="ps-lg-4">
                <PopularPost />
                <Tags />
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
