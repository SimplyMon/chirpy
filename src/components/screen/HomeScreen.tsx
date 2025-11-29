import { Birds } from "../layout/elements/Home/Birds";
import { HeroText } from "../layout/elements/Home/HeroText";
import { HeroImage } from "../layout/elements/Home/HeroImage";
import { BackgroundEffects } from "../layout/elements/Home/backgroundEffects";

export function HomeScreen() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(31,41,55,0.95) 100%)`,
      }}
    >
      <Birds />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-10 relative z-10">
        <HeroText />
        <HeroImage />
      </div>

      <BackgroundEffects />
    </section>
  );
}
