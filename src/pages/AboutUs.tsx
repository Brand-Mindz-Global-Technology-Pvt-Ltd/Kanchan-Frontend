import AboutStory from "../components/about/AboutStory";
import BotanicalCommitment from "../components/about/BotanicalCommitment";
import BotanicalSanctuary from "../components/about/BotanicalSanctuary";
import Caretakers from "../components/about/Caretakers";
import BotanicalBenefits from "../components/about/BotanicalBenefits";
import AboutFaq from "../components/about/AboutFaq";
import GreenCommunity from "../components/about/GreenCommunity";

export default function AboutUs() {
  return (
    <div className="w-full text-[#143826]">
      {/* Import serif and sans fonts if not already loaded */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        .font-serif-heading {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-body-copy {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
      `}</style>

      {/* White section separator between HeroBanner and Section 2 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* SECTION 2: HOW WE BEGAN */}
      <AboutStory />

      {/* White section separator between Section 2 and Section 3 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* SECTION 3: OUR BOTANICAL COMMITMENT */}
      <BotanicalCommitment />

      {/* White section separator between Section 3 and Section 4 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* SECTION 4: BOTANICAL SANCTUARY */}
      <BotanicalSanctuary />

      {/* White section separator between Section 4 and Section 5 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* SECTION 5: MEET THE CARETAKERS */}
      <Caretakers />

      {/* White section separator between Section 5 and Section 6 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* SECTION 6: BOTANICAL BENEFITS */}
      <BotanicalBenefits />

      {/* White section separator between Section 6 and Section 7 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* SECTION 7: FREQUENTLY ASKED QUESTIONS */}
      <AboutFaq />

      {/* White section separator between Section 7 and Section 8 */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />

      {/* SECTION 8: GREEN COMMUNITY BANNER */}
      <GreenCommunity />

      {/* White section separator between Section 8 and Footer */}
      <div className="w-full bg-white" style={{ height: "8px" }} aria-hidden="true" />
    </div>
  );
}
