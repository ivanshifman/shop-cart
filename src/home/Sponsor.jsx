import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay } from "swiper/modules";

const sponsorList = [
  {
    imgUrl: "/images/sponsor/01.png",
    imgAlt: "sponsor-1",
  },
  {
    imgUrl: "/images/sponsor/02.png",
    imgAlt: "sponsor-2",
  },
  {
    imgUrl: "/images/sponsor/03.png",
    imgAlt: "sponsor-3",
  },
  {
    imgUrl: "/images/sponsor/04.png",
    imgAlt: "sponsor-4",
  },
  {
    imgUrl: "/images/sponsor/05.png",
    imgAlt: "sponsor-5",
  },
  {
    imgUrl: "/images/sponsor/06.png",
    imgAlt: "sponsor-6",
  },
];

const Sponsor = () => {
  return (
    <div className="sponsor-section section-bg">
      <div className="container">
        <div className="section-wrapper">
          <div className="sponsor-slider">
            <Swiper
              slidesPerView={2}
              spaceBetween={20}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 50,
                },
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {sponsorList.map((val, i) => (
                <SwiperSlide key={i}>
                  <div className="sponsor-item">
                    <div className="sponsor-thumb">
                      <img src={val.imgUrl} alt={val.imgAlt} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsor;
