import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 max-w-4xl">
        <div className="bg-[#363637] rounded-2xl p-6 sm:p-8 lg:p-12 border border-[#4a4a4a]/50">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold font-montserrat mb-6 sm:mb-8">
            Privacy Policy
          </h1>
          
          <div className="text-gray-200 space-y-6 sm:space-y-8 leading-relaxed">
            <div className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-5">
              <p className="text-xs sm:text-sm text-gray-400 font-poppins">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">1. Information We Collect</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins mb-4">
                We collect information you provide directly to us, such as when you create an account, 
                subscribe to our newsletter, or contact us. This may include:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300 text-sm sm:text-base font-poppins">
                <li>Email address</li>
                <li>Name and contact information</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">2. How We Use Your Information</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300 text-sm sm:text-base font-poppins">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you updates about our products and services</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">3. Cookies and Tracking</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins mb-4">
                We use cookies and similar tracking technologies to collect information about your 
                browsing activities. You can control cookies through your browser settings and our 
                cookie consent banner.
              </p>
              <div className="mt-4">
                <h3 className="text-white font-medium mb-2 font-montserrat">Types of cookies we use:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm sm:text-base font-poppins">
                  <li><span className="font-medium text-white">Necessary cookies:</span> Essential for website functionality (Legal basis: Legitimate interest)</li>
                  <li><span className="font-medium text-white">Analytics cookies:</span> Help us understand how you use our site (Legal basis: Consent)</li>
                  <li><span className="font-medium text-white">Marketing cookies:</span> Used to show you relevant advertisements (Legal basis: Consent)</li>
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-white font-medium mb-2 font-montserrat">Cookie retention periods:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm sm:text-base font-poppins">
                  <li><span className="font-medium text-white">Necessary cookies:</span> Session-based, deleted when browser closes</li>
                  <li><span className="font-medium text-white">Analytics cookies (Google Analytics):</span> 26 months</li>
                  <li><span className="font-medium text-white">Marketing cookies:</span> Up to 24 months</li>
                  <li><span className="font-medium text-white">Consent preferences:</span> Stored locally until manually cleared</li>
                </ul>
              </div>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">3a. Legal Basis for Processing</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins mb-4">Under GDPR Article 6, we process your personal data based on the following legal grounds:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300 text-sm sm:text-base font-poppins">
                <li><span className="font-medium text-white">Consent (Art. 6(1)(a)):</span> Newsletter subscriptions, analytics cookies, marketing cookies</li>
                <li><span className="font-medium text-white">Legitimate Interest (Art. 6(1)(f)):</span> Website functionality, necessary cookies, fraud prevention</li>
                <li><span className="font-medium text-white">Legal Obligation (Art. 6(1)(c)):</span> Tax records, compliance with applicable laws</li>
              </ul>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">3b. Third-Party Data Processors</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins mb-4">We share data with the following third-party processors:</p>
              <ul className="list-disc list-inside mt-2 space-y-2 text-gray-300 text-sm sm:text-base font-poppins">
                <li><span className="font-medium text-white">Google Analytics (Google LLC):</span> Website analytics - Data processed in US with adequate safeguards</li>
                <li><span className="font-medium text-white">Google Tag Manager (Google LLC):</span> Tag management - Data processed in US with adequate safeguards</li>
                <li><span className="font-medium text-white">MailerLite (UAB MailerLite):</span> Email marketing - Data processed in EU (Lithuania)</li>
                <li><span className="font-medium text-white">Vercel Inc.:</span> Website hosting - Data processed globally with adequate safeguards</li>
              </ul>
              <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed font-poppins">
                All processors are bound by Data Processing Agreements ensuring GDPR compliance.
              </p>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">3c. Data Retention</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins mb-4">We retain your personal data for the following periods:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300 text-sm sm:text-base font-poppins">
                <li><span className="font-medium text-white">Email addresses (newsletter):</span> Until you unsubscribe or 3 years of inactivity</li>
                <li><span className="font-medium text-white">Website analytics data:</span> 26 months (Google Analytics default)</li>
                <li><span className="font-medium text-white">Cookie consent records:</span> 12 months or until consent is withdrawn</li>
                <li><span className="font-medium text-white">Contact form submissions:</span> 2 years for customer service purposes</li>
                <li><span className="font-medium text-white">Legal compliance data:</span> As required by applicable law (typically 7 years)</li>
              </ul>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">4. Information Sharing</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy. We may share information with:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300 text-sm sm:text-base font-poppins">
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">5. Data Security</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">6. Your Rights</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-gray-300 text-sm sm:text-base font-poppins">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal information</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">7. International Transfers</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information.
              </p>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">8. Children&apos;s Privacy</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins">
                Our services are not intended for children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">9. Changes to This Policy</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins">
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="bg-[#2a2a2a] border border-[#4a4a4a]/50 rounded-xl p-4 sm:p-6">
              <h2 className="text-white text-lg sm:text-xl font-semibold mb-4 font-montserrat">10. Contact Us</h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-poppins mb-4">
                If you have any questions about this privacy policy or our privacy practices, 
                please contact us at:
              </p>
              <div className="mt-4 p-4 bg-black/30 border border-[#4a4a4a]/30 rounded-lg">
                <p className="text-white font-medium font-montserrat">Arfve</p>
                <p className="text-gray-300 text-sm font-poppins">Birger Jarlsgatan 57c</p>
                <p className="text-gray-300 text-sm font-poppins">c/o Norrsken House</p>
                <p className="text-gray-300 text-sm font-poppins">Stockholm, 11356, Sweden</p>
                <p className="mt-2 text-gray-300 text-sm font-poppins">
                  Email: <a href="mailto:privacy@arfve.com" className="text-white hover:text-gray-300 underline font-medium transition-colors">
                    privacy@arfve.com
                  </a>
                </p>
              </div>
            </section>

            <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#4a4a4a]/50">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/" 
                  className="inline-flex items-center text-white hover:text-gray-300 transition-colors font-poppins"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Home
                </Link>
                <Link 
                  href="/cookie-settings" 
                  className="inline-flex items-center text-white hover:text-gray-300 transition-colors font-poppins"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Cookie Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 