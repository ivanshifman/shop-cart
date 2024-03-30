import AboutUs from "./AboutUs";
import AppSection from "./AppSection";
import Banner from "./Banner";
import CategoryShowCase from "./CategoryShowCase";
import HomeCategory from "./HomeCategory";
import LocationSprade from "./LocationSprade";
import Register from "./Register";
import Sponsor from "./Sponsor";

const Home = () => {
  return (
    <>
      <Banner />
      <HomeCategory />
      <CategoryShowCase />
      <Register />
      <LocationSprade />
      <AboutUs />
      <AppSection />
      <Sponsor />
    </>
  );
};

export default Home;
