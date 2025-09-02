import SmoothScrollWrapper from "../component/SmoothScrollWrapper";
import HeroSection from "../parts/LP/Section1";
import Section2 from "../parts/LP/Section2";
import Header from "../parts/Header";
import Footer from "../parts/Footer";
export default function Landingpage() {
  return (
        <SmoothScrollWrapper>
    <div>
        <Header/>
      <HeroSection />
      <Section2 />
      <Footer/>

    </div>
</SmoothScrollWrapper>
  );
}
