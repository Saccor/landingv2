import Footer from '@/components/Footer';

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] font-montserrat text-[#1a1a18] p-[60px_20px]">
      <div className="max-w-[900px] mx-auto">
        <h1 className="text-center mb-[60px] text-[2.5em] font-black">Sustainability</h1>
        
        <div className="flex flex-col gap-[60px]">
          {/* First Paragraph */}
          <div className="w-full leading-[1.8] text-[#333330] text-[1.1em] font-normal text-center mx-auto">
            <p>
              Arfve exists to bring together a community of people who value excellence, longevity, and purpose. 
              Our mission is to end tech overconsumption by creating products with a transparent supply chain, 
              designed for longevity. A triple side longevity: physical, emotional, and functional. 
              In a world where more than 50 electronic devices often lie unused in every household and islands 
              of e-waste pollute our oceans, we believe the solution isn't a dream.
            </p>
            <span className="block text-[2em] font-black mt-[25px] tracking-[-1px] leading-[1.2]">
              It's a decision. Yours.
            </span>
          </div>
          
          {/* Second Paragraph with Modules */}
          <div className="w-full leading-[1.8] text-[#333330] text-[1.1em] font-normal text-center mx-auto">
            <p>
              Sustainability at Arfve is a core value. 
              Arfve products are the world's first three pieces modular sound products. 
              Battery, chipset, and dynamic driver are completely replaceable. 
              This modular architecture is centered around user's satisfaction.
            </p>
            
            {/* Modules Container */}
            <div className="flex gap-[30px] mt-[40px] mb-[20px] justify-center flex-wrap">
              {/* Module 1 */}
              <div className="flex-1 min-w-[200px] max-w-[250px] p-[30px] border-2 border-[#1a1a18] bg-[#fafaf8] text-center transition-all duration-300 ease-in-out hover:bg-[#1a1a18] hover:text-[#fafaf8] group">
                <div className="text-[1.2em] font-bold mb-[15px] text-[#1a1a18] transition-colors duration-300 group-hover:text-[#fafaf8]">
                  Why Replaceable Battery
                </div>
                <div className="text-[0.95em] leading-[1.6] text-[#666660] transition-colors duration-300 group-hover:text-[#e0e0de]">
                  Battery is the single most common point of failure in consumer electronics. 
                  Replace the battery and continue using what you love. This approach extends 
                  product life by years, not months.
                </div>
              </div>
              
              {/* Module 2 */}
              <div className="flex-1 min-w-[200px] max-w-[250px] p-[30px] border-2 border-[#1a1a18] bg-[#fafaf8] text-center transition-all duration-300 ease-in-out hover:bg-[#1a1a18] hover:text-[#fafaf8] group">
                <div className="text-[1.2em] font-bold mb-[15px] text-[#1a1a18] transition-colors duration-300 group-hover:text-[#fafaf8]">
                  Why Replaceable Chipset
                </div>
                <div className="text-[0.95em] leading-[1.6] text-[#666660] transition-colors duration-300 group-hover:text-[#e0e0de]">
                  A replaceable chipset prevents entire devices from becoming obsolete as technology evolves. 
                  Upgrading the brain of the product extends its usable life and reduces electronic waste.
                </div>
              </div>
              
              {/* Module 3 */}
              <div className="flex-1 min-w-[200px] max-w-[250px] p-[30px] border-2 border-[#1a1a18] bg-[#fafaf8] text-center transition-all duration-300 ease-in-out hover:bg-[#1a1a18] hover:text-[#fafaf8] group">
                <div className="text-[1.2em] font-bold mb-[15px] text-[#1a1a18] transition-colors duration-300 group-hover:text-[#fafaf8]">
                  Why Replaceable Driver
                </div>
                <div className="text-[0.95em] leading-[1.6] text-[#666660] transition-colors duration-300 group-hover:text-[#e0e0de]">
                  A replaceable audio driver allows performance restoration without discarding the whole device. 
                  This reduces material waste and supports a circular lifecycle where sound quality can be renewed.
                </div>
              </div>
            </div>
          </div>
          
          {/* Third Paragraph */}
          <div className="w-full leading-[1.8] text-[#333330] text-[1.1em] font-normal text-center mx-auto">
            <p>
              Every component is designed to be separated, repaired, and recycled, 
              supported by an end-of-life strategy focused on recovery rather than disposal.
            </p>
          </div>
          
          {/* Fourth Paragraph */}
          <div className="w-full leading-[1.8] text-[#333330] text-[1.1em] font-normal text-center mx-auto">
            <p>
              Even our material choices reflect the same vision. Built for disassembly rather than glued shut, 
              Arfve technology puts control back where it belongs: with the user. 
              Our products are made with up to 85% recycled materials, a carefully balanced composition 
              that preserves structural integrity, performance, and premium quality without compromise.
              Soy-based vegetable inks are integrated directly into components and markings, reducing 
              dependence on petroleum-based chemicals while enhancing material safety, durability, and recyclability.
              Arfve products will be heavily compounded by metal alloys which offer exceptional durability, 
              repairability, and recyclability. Unlike plastics, they retain performance over time, withstand 
              repeated disassembly, and can be recycled indefinitely without quality loss.
            </p>
          </div>
          
          {/* Fifth Paragraph */}
          <div className="w-full leading-[1.8] text-[#333330] text-[1.1em] font-normal text-center mx-auto">
            <p>
              Change starts with everyday choices. At Arfve, we design technology that adapts, endures, 
              and respects your values. Our three-piece modular earbuds challenge planned obsolescence by design. 
              You decide when it's time to move on and not a sealed battery or a failed component. 
              Replace only what you need, when you need it. This is modularity with purpose: a circular 
              lifecycle where performance, responsibility, and transparency exist in harmony.
            </p>
            <span className="block text-[2em] font-black mt-[25px] tracking-[-1px] leading-[1.2]">
              Embrace now this future where design, sound quality, and sustainability thrive. Together.
            </span>
            
            <div className="w-full leading-[1.8] text-[#333330] text-[1.1em] font-normal text-center mx-auto">
              <p>Register and be part of the change.</p>
              
              {/* CTA Button */}
              <div className="text-center mt-[40px]">
                <a 
                  href="#" 
                  className="relative inline-block p-[18px_50px] bg-[#1a1a18] text-[#fafaf8] no-underline font-montserrat font-bold text-[1.1em] border-none cursor-pointer overflow-hidden tracking-[0.5px] transition-all duration-400 ease-in-out hover:text-[#1a1a18] hover:translate-y-[-2px] hover:shadow-[0_10px_30px_rgba(26,26,24,0.2)] before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full before:bg-[#fafaf8] before:transition-left before:duration-400 before:ease-in-out before:z-[-1] hover:before:left-0"
                >
                  <span className="block mb-[8px]">Join Arfve</span>
                  <span className="text-[0.9em]">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
