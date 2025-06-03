import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-gray-900 rounded-2xl p-8 lg:p-12">
          <h1 className="text-white text-3xl lg:text-4xl font-bold font-montserrat mb-8">
            Privacy Policy
          </h1>
          
          <div className="text-gray-300 space-y-6 leading-relaxed">
            <p className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                subscribe to our newsletter, or contact us. This may include:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Email address</li>
                <li>Name and contact information</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Send you updates about our products and services</li>
                <li>Respond to your comments and questions</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">3. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to collect information about your 
                browsing activities. You can control cookies through your browser settings and our 
                cookie consent banner.
              </p>
              <div className="mt-4">
                <h3 className="text-white font-medium mb-2">Types of cookies we use:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Necessary cookies:</strong> Essential for website functionality (Legal basis: Legitimate interest)</li>
                  <li><strong>Analytics cookies:</strong> Help us understand how you use our site (Legal basis: Consent)</li>
                  <li><strong>Marketing cookies:</strong> Used to show you relevant advertisements (Legal basis: Consent)</li>
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="text-white font-medium mb-2">Cookie retention periods:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Necessary cookies:</strong> Session-based, deleted when browser closes</li>
                  <li><strong>Analytics cookies (Google Analytics):</strong> 26 months</li>
                  <li><strong>Marketing cookies:</strong> Up to 24 months</li>
                  <li><strong>Consent preferences:</strong> Stored locally until manually cleared</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">3a. Legal Basis for Processing</h2>
              <p>Under GDPR Article 6, we process your personal data based on the following legal grounds:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Consent (Art. 6(1)(a)):</strong> Newsletter subscriptions, analytics cookies, marketing cookies</li>
                <li><strong>Legitimate Interest (Art. 6(1)(f)):</strong> Website functionality, necessary cookies, fraud prevention</li>
                <li><strong>Legal Obligation (Art. 6(1)(c)):</strong> Tax records, compliance with applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">3b. Third-Party Data Processors</h2>
              <p>We share data with the following third-party processors:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>Google Analytics (Google LLC):</strong> Website analytics - Data processed in US with adequate safeguards</li>
                <li><strong>Google Tag Manager (Google LLC):</strong> Tag management - Data processed in US with adequate safeguards</li>
                <li><strong>MailerLite (UAB MailerLite):</strong> Email marketing - Data processed in EU (Lithuania)</li>
                <li><strong>Vercel Inc.:</strong> Website hosting - Data processed globally with adequate safeguards</li>
              </ul>
              <p className="mt-2">
                All processors are bound by Data Processing Agreements ensuring GDPR compliance.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">3c. Data Retention</h2>
              <p>We retain your personal data for the following periods:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Email addresses (newsletter):</strong> Until you unsubscribe or 3 years of inactivity</li>
                <li><strong>Website analytics data:</strong> 26 months (Google Analytics default)</li>
                <li><strong>Cookie consent records:</strong> 12 months or until consent is withdrawn</li>
                <li><strong>Contact form submissions:</strong> 2 years for customer service purposes</li>
                <li><strong>Legal compliance data:</strong> As required by applicable law (typically 7 years)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">4. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this policy. We may share information with:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Service providers who assist in our operations</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. However, no method of 
                transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">6. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal information</li>
                <li>Object to processing of your information</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">7. International Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place to protect your information.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">8. Children&apos;s Privacy</h2>
              <p>
                Our services are not intended for children under 13. We do not knowingly collect 
                personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-white text-xl font-semibold mb-4">10. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, 
                please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <p><strong>Arfve</strong></p>
                <p>Birger Jarlsgatan 57c</p>
                <p>c/o Norrsken House</p>
                <p>Stockholm, 11356, Sweden</p>
                <p className="mt-2">
                  Email: <a href="mailto:privacy@arfve.com" className="text-blue-400 hover:text-blue-300">
                    privacy@arfve.com
                  </a>
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-700">
              <Link 
                href="/" 
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 