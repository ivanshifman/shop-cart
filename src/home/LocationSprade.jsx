import { Link } from "react-router-dom";

const title = (
  <h2 className="title">
    More then <span className="text-warning">60,000</span> customers
  </h2>
);

const desc =
  "Buy products on your any device with our app & enjoy your time what you want. Just download & install & start to shopping";

const clientsList = [
  {
    imgUrl: "/images/clients/avater.jpg",
    imgAlt: "education thumb",
    text: "Join with Us",
  },
  {
    imgUrl: "/images/clients/avater.jpg",
    imgAlt: "education thumb",
    text: "Join with Us",
  },
  {
    imgUrl: "/images/clients/avater.jpg",
    imgAlt: "education thumb",
    text: "Join with Us",
  },
  {
    imgUrl: "/images/clients/avater.jpg",
    imgAlt: "education thumb",
    text: "Join with Us",
  },
  {
    imgUrl: "/images/clients/avater.jpg",
    imgAlt: "education thumb",
    text: "Join with Us",
  },
  {
    imgUrl: "/images/clients/avater.jpg",
    imgAlt: "education thumb",
    text: "Join with Us",
  },
  {
    imgUrl: "/images/clients/avater.jpg",
    imgAlt: "education thumb",
    text: "Join with Us",
  },
];

const LocationSprade = () => {
  return (
    <div className="clients-section style-2 padding-tb">
      <div className="container">
        <div className="section-header text-center">
          {title}
          <p>{desc}</p>
        </div>

        <div className="section-wrapper">
          <div className="clients">
            {clientsList.map((val, i) => (
              <div key={i} className="client-list">
                <Link to="/about" className="client-content">
                  <span>{val.text}</span>
                </Link>
                <div className="client-thumb">
                  <img src={val.imgUrl} alt={val.imgUrl} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationSprade;
