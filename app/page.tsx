import { CapabilityBand } from "@/components/CapabilityBand";
import { ChromeRhythm } from "@/components/ChromeRhythm";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { MobileInstallBar } from "@/components/MobileInstallBar";
import { SkipLink } from "@/components/SkipLink";
import { SocialProof } from "@/components/SocialProof";
import { TechIntegrations } from "@/components/TechIntegrations";
import { getHomepageJsonLd } from "@/lib/home-json-ld";

const homepageJsonLd = getHomepageJsonLd();

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <SkipLink />
      <Header />
      <main id="install" className="pb-24 md:pb-0">
        <Hero />
        <MarqueeTicker />
        <SocialProof />
        <CapabilityBand />
        <TechIntegrations />
        <ChromeRhythm />
        <Faq />
        <CtaBand />
      </main>
      <Footer />
      <MobileInstallBar />
    </>
  );
}
