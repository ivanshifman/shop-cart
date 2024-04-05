import { useState } from "react";
import blogList from "../utilis/blogdata";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Tags from "../shop/Tags";
import PopularPost from "../shop/PopularPost";

const socialList = [
  { iconName: "icofont-facebook", className: "facebook" },
  { iconName: "icofont-twitter", className: "twitter" },
  { iconName: "icofont-linkedin", className: "linkedin" },
  { iconName: "icofont-instagram", className: "instagram" },
  { iconName: "icofont-pinterest", className: "pinterest" },
];

const SingleBlog = () => {
  const [blog, setBlog] = useState(blogList);
  const { id } = useParams();
  const result = blog.filter((b) => b.id === Number(id));

  return (
    <div>
      <PageHeader
        title={result.map((titleBlog) => titleBlog.title)}
        curPage={"Blog / Blog details"}
      />

      <div className="blog-section blog-single padding-tb section-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-12">
              <article>
                <div className="section-wrapper">
                  <div className="row row-cols-1 justify-content-center g-4">
                    <div className="col">
                      <div className="post-item style-2">
                        <div className="post-inner">
                          {result.map((item) => (
                            <div key={item.id}>
                              <div className="post-thumb">
                                <img
                                  src={item.imgUrl}
                                  alt={item.imgAlt}
                                  className="w-100"
                                />
                              </div>
                              <div className="post-content">
                                <h3>{item.title}</h3>
                                <div className="meta-post">
                                  <ul className="lab-ul">
                                    {item.metaList.map((val, i) => (
                                      <li key={i}>
                                        <i className={val.iconName}></i>
                                        {val.text}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <p>{item.desc}</p>

                                <blockquote>
                                  <p>
                                    "The only limit to our realization of
                                    tomorrow will be our doubts of today."
                                  </p>
                                  <cite>
                                    <a href="#">- Franklin D. Roosevelt</a>
                                  </cite>
                                </blockquote>

                                <p>
                                  In a world where uncertainty often seems to
                                  prevail, it's important to remember that every
                                  challenge brings with it an opportunity to
                                  grow and learn. Though the path to our goals
                                  may sometimes appear daunting, each step
                                  forward brings us closer to our aspirations.
                                  With determination and a positive attitude, we
                                  can overcome any obstacle that stands in our
                                  way. Each new day is an opportunity to start
                                  afresh and create the future we desire.
                                </p>

                                <img
                                  src="/src/assets/images/blog/single/01.jpg"
                                  alt="img-blog-p1"
                                />

                                <p>
                                  In a world full of possibilities, each day
                                  offers us the opportunity to explore,
                                  discover, and grow. Although the journey may
                                  present challenges at times, each experience
                                  strengthens us and brings us closer to our
                                  dreams. Maintaining an open and positive mind
                                  allows us to see opportunities even in the
                                  most difficult moments. With determination and
                                  passion, we can turn every obstacle into a
                                  stepping stone toward success. Life is full of
                                  wonders waiting to be discovered, and every
                                  step we take brings us closer to them.
                                </p>

                                <div className="video-thumb">
                                  <img
                                    src="/src/assets/images/blog/single/02.jpg"
                                    alt="img-blog-p2"
                                  />
                                  <a
                                    href="https://www.youtube.com/watch?v=as6Zu6OCe98"
                                    target="_blank"
                                    className="video-button popup"
                                  >
                                    <i className="icofont-ui-play"></i>
                                  </a>
                                </div>

                                <p>
                                  "May this day be filled with joy, love, and
                                  success for you. May each step you take bring
                                  you closer to your dreams and may every
                                  challenge you face be an opportunity to grow.
                                  Always remember to stay positive and focused
                                  on the good things in life. Trust yourself and
                                  the unlimited power you have to create the
                                  reality you desire! May light and happiness
                                  accompany you always!"
                                </p>

                                <div className="tags-section">
                                  <ul className="tags lab-ul">
                                    <li>
                                      <a href="#">Agency</a>
                                    </li>
                                    <li>
                                      <a href="#">Business</a>
                                    </li>
                                    <li>
                                      <a href="#">Personal</a>
                                    </li>
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
                          ))}
                        </div>
                      </div>

                      <div className="navigations-part">
                        <div className="left">
                          <a href="#" className="prev">
                            <i className="icofont-double-left"></i> Previous
                            blog
                          </a>
                          <a href="#" className="title">
                            See previous blog
                          </a>
                        </div>
                        <div className="right">
                          <a href="#" className="next">
                            Next blog <i className="icofont-double-right"></i>
                          </a>
                          <a href="#" className="title">
                            See next blog
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
            <div className="col-lg-4 col-12">
                <aside>
                    <Tags />
                    <PopularPost />
                </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
