import HeroBanner from "../components/ui/HeroBanner";
import OurCategories from "../components/home/OurCategories";
import GreenCompanions from "../components/home/GreenCompanions";
import GardenBanner from "../components/home/GardenBanner";
import WhyChooseKanchan from "../components/home/ChooseKanchan";
import GardenerStories from "../components/home/GardenerStories";
import AskedQuestions from "../components/home/AskedQuestions";
import BotanicalChronicle from "../components/home/BotanicalChronicle";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <main>
      <HeroBanner />
      <OurCategories />
      <GreenCompanions />
      <GardenBanner />
      <WhyChooseKanchan />
      <GardenerStories />
      <AskedQuestions />
      <BotanicalChronicle />
      <Footer />
    </main>
  );
}

export default Home;