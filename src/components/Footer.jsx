import { Link } from "react-router-dom";

const title = "About ShopCart";
const desc =
  "Explore our fashion and accessories store, where you'll find a wide variety of products, from clothing to cameras and makeup. Fill your cart with the best in style and technology, all in one place!";
const ItemTitle = "Categories";
const quickTitle = "Quick links";
const tweetTitle = "Recent tweets";

const addressList = [
  {
    iconName: "icofont-google-map",
    text: " New York, USA.",
  },
  {
    iconName: "icofont-phone",
    text: " +880 123 456 789",
  },
  {
    iconName: "icofont-envelope",
    text: " info@shopcart.com",
  },
];

const socialList = [
  {
    iconName: "icofont-facebook",
    className: "facebook",
  },
  {
    iconName: "icofont-twitter",
    className: "twitter",
  },
  {
    iconName: "icofont-linkedin",
    className: "linkedin",
  },
  {
    iconName: "icofont-instagram",
    className: "instagram",
  },
  {
    iconName: "icofont-pinterest",
    className: "pinterest",
  },
];

const ItemList = [
  {
    text: "Home",
    link: "/",
  },
  {
    text: "Shop",
    link: "/shop",
  },
  {
    text: "Blog",
    link: "/blog",
  },
  {
    text: "About",
    link: "/about",
  },
  {
    text: "FAQs",
    link: "/about",
  },
];

const quickList = [
  {
    text: "Summer sessions",
  },
  {
    text: "Events",
  },
  {
    text: "Gallery",
  },
  {
    text: "Forums",
  },
  {
    text: "Privacy policy",
  },
  {
    text: "Terms of use",
  },
];

const tweetList = [
  {
    iconName: "icofont-twitter",
    desc: (
      <p>
        Emilio Taylor <a href="#">@ShopCart Greetings! #ShopCart</a> Your go-to
        for fashion and more. Shop now!
      </p>
    ),
  },
  {
    iconName: "icofont-twitter",
    desc: (
      <p>
        Sofia Bensson <a href="#">@ShopCart Greetings! #ShopCart</a> Ultimate
        destination for all your shopping needs.
      </p>
    ),
  },
];

const footerbottomList = [
  {
    text: "Comments",
  },
  {
    text: "Information",
  },
  {
    text: "Sales",
  },
];

const Footer = () => {
  return (
    <footer className="style-2">
      <div className="footer-top dark-view padding-tb">
        <div className="container">
          <div className="row g-4 row-cols-xl-4 row-cols-sm-2 row-cols-1 justify-content-center">
            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{title}</h4>
                    </div>
                    <div className="content">
                      <p>{desc}</p>
                      <ul className="lab-ul office-address">
                        {addressList.map((val, i) => (
                          <li key={i}>
                            <i className={val.iconName}>{val.text}</i>
                          </li>
                        ))}
                      </ul>
                      <ul className="lab-ul social-icons">
                        {socialList.map((val, i) => (
                          <li key={i}>
                            <a href="#" className={val.className}>
                              <i className={val.iconName}></i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{ItemTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul office-address">
                        {ItemList.map((val, i) => (
                          <li key={i}>
                            <a href={val.link}>{val.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{quickTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul office-address">
                        {quickList.map((val, i) => (
                          <li key={i}>
                            <a href="#">{val.text}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="footer-item our-address">
                <div className="footer-inner">
                  <div className="footer-content">
                    <div className="title">
                      <h4>{tweetTitle}</h4>
                    </div>
                    <div className="content">
                      <ul className="lab-ul office-address">
                        {tweetList.map((val, i) => (
                          <li key={i}>
                            <i className={val.iconName}></i>
                            {val.desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="section-wrapper">
            <p>
              &copy; 2024 <Link to="/">Shop Cart</Link> designed by Iván Shifman
            </p>
            <div className="footer-bottom-list">
              {footerbottomList.map((val, i) => (
                <a key={i} href="#">
                  {val.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
