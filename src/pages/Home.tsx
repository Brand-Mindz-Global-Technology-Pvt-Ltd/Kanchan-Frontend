import HeroBanner from "../components/ui/HeroBanner";
import OurCategories from "../components/home/OurCategories";
import GreenCompanions from "../components/home/GreenCompanions";
import GardenBanner from "../components/home/GardenBanner";
import WhyChooseKanchan from "../components/home/ChooseKanchan";
import GardenerStories from "../components/home/GardenerStories";
import AskedQuestions from "../components/home/AskedQuestions";
import BotanicalChronicle from "../components/home/BotanicalChronicle";
import Footer from "../components/layout/Footer";
import leftLeafBorder from "../assets/leaves/Leaf-left.png";
import rightLeafBorder from "../assets/leaves/Leaf-right.png";

function Home() {
  return (
    <main className="homepage-leaf-border">
      <style>{`
        .homepage-leaf-border > :not(style) {
          isolation: isolate;
          position: relative;
        }

        .homepage-leaf-border > :not(style)::before,
        .homepage-leaf-border > :not(style)::after {
          content: "";
          position: absolute;
          inset-block: 0;
          width: clamp(16px, 4vw, 52px);
          z-index: -1;
          pointer-events: none;
          display: block;
          background-repeat: no-repeat;
          background-size: clamp(110px, 16vw, 190px) auto;
        }

        .homepage-leaf-border > :not(style)::before {
          left: 0;
          background-position: left top;
          background-image: url("${leftLeafBorder}");
        }

        .homepage-leaf-border > :not(style)::after {
          right: 0;
          background-position: right top;
          background-image: url("${rightLeafBorder}");
        }

        .homepage-leaf-border > section:nth-of-type(2)::before { background-position-y: 42%; }
        .homepage-leaf-border > section:nth-of-type(2)::after { background-position-y: 68%; }
        .homepage-leaf-border > section:nth-of-type(3)::before { background-position-y: 100%; }
        .homepage-leaf-border > section:nth-of-type(3)::after { background-position-y: 22%; }
        .homepage-leaf-border > section:nth-of-type(4)::before { background-position-y: 28%; }
        .homepage-leaf-border > section:nth-of-type(4)::after { background-position-y: 82%; }
        .homepage-leaf-border > section:nth-of-type(5)::before { background-position-y: 74%; }
        .homepage-leaf-border > section:nth-of-type(5)::after { background-position-y: 48%; }
        .homepage-leaf-border > section:nth-of-type(6)::before { background-position-y: 12%; }
        .homepage-leaf-border > section:nth-of-type(6)::after { background-position-y: 100%; }
        .homepage-leaf-border > section:nth-of-type(7)::before { background-position-y: 88%; }
        .homepage-leaf-border > section:nth-of-type(7)::after { background-position-y: 36%; }
        .homepage-leaf-border > section:nth-of-type(8)::before { background-position-y: 54%; }
        .homepage-leaf-border > section:nth-of-type(8)::after { background-position-y: 8%; }
        .homepage-leaf-border > section:nth-of-type(2)::before { width: clamp(18px, 4.8vw, 62px); background-size: clamp(110px, 18vw, 210px) auto; }
        .homepage-leaf-border > section:nth-of-type(3)::after { width: clamp(18px, 4.6vw, 60px); background-size: clamp(110px, 17vw, 200px) auto; }
        .homepage-leaf-border > section:nth-of-type(4)::before { background-size: clamp(90px, 13vw, 160px) auto; }
        .homepage-leaf-border > section:nth-of-type(5)::after { background-size: clamp(100px, 16vw, 190px) auto; }
        .homepage-leaf-border > section:nth-of-type(6)::before { background-size: clamp(100px, 15vw, 180px) auto; }
        .homepage-leaf-border > section:nth-of-type(7)::after { background-size: clamp(110px, 18vw, 210px) auto; }
        .homepage-leaf-border > section:nth-of-type(8)::before { background-size: clamp(100px, 16vw, 190px) auto; }

        @media (min-width: 641px) {
          .homepage-leaf-border > section:nth-of-type(2)::after,
          .homepage-leaf-border > section:nth-of-type(3)::before,
          .homepage-leaf-border > section:nth-of-type(4)::after,
          .homepage-leaf-border > section:nth-of-type(5)::before,
          .homepage-leaf-border > section:nth-of-type(6)::after,
          .homepage-leaf-border > section:nth-of-type(7)::before,
          .homepage-leaf-border > section:nth-of-type(8)::after,
          .homepage-leaf-border > footer::before,
          .homepage-leaf-border > footer::after {
            width: clamp(28px, 6vw, 78px);
          }
        }

        @media (max-width: 640px) {
          .homepage-leaf-border > :not(style)::before,
          .homepage-leaf-border > :not(style)::after {
            width: clamp(10px, 3vw, 12px);
            background-size: clamp(72px, 26vw, 100px) auto;
          }
        }
      `}</style>
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