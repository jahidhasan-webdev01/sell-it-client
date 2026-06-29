import AboutUs from "@/components/home/AboutUs";
import AllProduct from "@/components/home/AllProduct";
import Banner from "@/components/home/Banner";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <div>
      <Banner />
      <AllProduct />
      <AboutUs />
      <Contact />
    </div>
  );
}
