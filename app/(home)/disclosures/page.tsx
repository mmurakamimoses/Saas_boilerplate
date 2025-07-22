"use client"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/templates/ui/tabs"

export default function DisclosuresPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Legal Disclosures</h1>
        
        <Tabs defaultValue="terms" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="terms" className="data-[state=active]:!bg-[#F7C55F] data-[state=active]:text-black">Terms of Service</TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:!bg-[#F7C55F] data-[state=active]:text-black">Privacy Policy</TabsTrigger>
          </TabsList>
          
          <TabsContent value="terms" className="mt-0">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold mb-6">Terms of Service</h2>
              <p className="text-muted-foreground text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h3>
                  <p>
                    By accessing and using PurePantry (&quot;the Service&quot;), you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p>
                    These Terms of Service constitute a legally binding agreement between you and PurePantry regarding your use of the Service. 
                    Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">2. Description of Service</h3>
                  <p>
                    PurePantry is a nutritional analysis and meal planning platform that provides users with tools to analyze food products, 
                    create meal plans, and access nutritional information. The Service includes but is not limited to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nutritional analysis of food products and ingredients</li>
                    <li>Meal planning and recipe recommendations</li>
                    <li>Dietary restriction and allergy management tools</li>
                    <li>Integration with various food databases and APIs</li>
                    <li>Community features for sharing and discovering recipes</li>
                    <li>Premium features for advanced analytics and personalization</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">3. User Accounts and Registration</h3>
                  <p>
                    To access certain features of the Service, you must register for an account. When you register, you agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate, current, and complete information during registration</li>
                    <li>Maintain and promptly update your account information</li>
                    <li>Maintain the security of your password and accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use of your account</li>
                  </ul>
                  <p>
                    You are responsible for safeguarding the password and for all activities that occur under your account. 
                    We reserve the right to refuse service, terminate accounts, or cancel orders at our sole discretion.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">4. User Content and Conduct</h3>
                  <p>
                    Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, 
                    videos, or other material (&quot;Content&quot;). You are responsible for the Content that you post to the Service, including its legality, reliability, and appropriateness.
                  </p>
                  <p>By posting Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content.</p>
                  <p>You agree not to use the Service:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To transmit any unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable material</li>
                    <li>To impersonate any person or entity or falsely state or misrepresent your affiliation with any person or entity</li>
                    <li>To interfere with or disrupt the Service or servers or networks connected to the Service</li>
                    <li>To attempt to gain unauthorized access to any portion of the Service or any other systems or networks</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">5. Subscription and Payment Terms</h3>
                  <p>
                    Certain parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring 
                    and periodic basis (such as daily, weekly, monthly, or annually), depending on the type of subscription plan you select.
                  </p>
                  <p>
                    Subscription fees are non-refundable except as required by law or as specifically permitted in these Terms. 
                    You may cancel your subscription at any time, and cancellation will be effective at the end of the current billing period.
                  </p>
                  <p>
                    We reserve the right to change our subscription plans or adjust pricing for our service at any time. 
                    Any price changes will apply to subsequent billing periods after reasonable notice to you.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">6. Medical Disclaimer</h3>
                  <p className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <strong>Important:</strong> The information provided by PurePantry is for educational and informational purposes only and is not intended as 
                    medical advice. Always consult with a qualified healthcare provider before making any dietary changes or if you have concerns about 
                    your health or nutrition. PurePantry does not provide medical diagnosis, treatment recommendations, or replace professional medical advice.
                  </p>
                  <p>
                    Nutritional information provided may not be 100% accurate due to variations in food preparation, 
                    manufacturing processes, and database limitations. Users should verify nutritional information independently when making critical dietary decisions.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">7. Intellectual Property Rights</h3>
                  <p>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of PurePantry 
                    and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used 
                    in connection with any product or service without our prior written consent.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h3>
                  <p>
                    In no event shall PurePantry, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, 
                    incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, 
                    or other intangible losses, resulting from your use of the Service.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">9. Termination</h3>
                  <p>
                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, 
                    under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                  </p>
                  <p>
                    If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">10. Changes to Terms</h3>
                  <p>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, 
                    we will provide at least 30 days notice prior to any new terms taking effect.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">11. Contact Information</h3>
                  <p>
                    If you have any questions about these Terms of Service, please contact us at:
                  </p>
                  <p><strong>Email:</strong> legal@purepantry.com</p>
                  <p><strong>Address:</strong> [Your Company Address]</p>
                </section>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-0">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <h2 className="text-3xl font-bold mb-6">Privacy Policy</h2>
              <p className="text-muted-foreground text-sm mb-8">Last updated: {new Date().toLocaleDateString()}</p>
              
              <div className="space-y-8">
                <section>
                  <h3 className="text-2xl font-semibold mb-4">1. Information We Collect</h3>
                  <p>
                    We collect information you provide directly to us, such as when you create an account, use our services, 
                    or communicate with us. This may include:
                  </p>
                  
                  <h4 className="text-xl font-semibold mt-6 mb-3">Personal Information</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, email address, and contact information</li>
                    <li>Account credentials (username and encrypted password)</li>
                    <li>Profile information including dietary preferences and restrictions</li>
                    <li>Billing and payment information (processed securely through third-party providers)</li>
                  </ul>

                  <h4 className="text-xl font-semibold mt-6 mb-3">Usage Information</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Food items scanned, searched, or analyzed</li>
                    <li>Meal plans created and recipes saved</li>
                    <li>App usage patterns and feature interactions</li>
                    <li>Device information and technical data</li>
                  </ul>

                  <h4 className="text-xl font-semibold mt-6 mb-3">Automatically Collected Information</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address and general location information</li>
                    <li>Browser type and operating system</li>
                    <li>Referral sources and website navigation patterns</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h3>
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices, updates, security alerts, and support messages</li>
                    <li>Respond to your comments, questions, and customer service requests</li>
                    <li>Communicate with you about products, services, offers, and events</li>
                    <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
                    <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                    <li>Personalize and improve your experience with our services</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h3>
                  <p>
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                    except in the following circumstances:
                  </p>
                  
                  <h4 className="text-xl font-semibold mt-6 mb-3">Service Providers</h4>
                  <p>
                    We may share your information with third-party service providers who perform services on our behalf, such as:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payment processing and billing services</li>
                    <li>Cloud hosting and data storage providers</li>
                    <li>Analytics and performance monitoring services</li>
                    <li>Customer support and communication tools</li>
                  </ul>

                  <h4 className="text-xl font-semibold mt-6 mb-3">Legal Requirements</h4>
                  <p>We may disclose your information if required to do so by law or in response to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Valid legal process, such as a court order or subpoena</li>
                    <li>Government or regulatory requests</li>
                    <li>Requests from law enforcement agencies</li>
                    <li>Protection of our rights, property, or safety, or that of our users or the public</li>
                  </ul>

                  <h4 className="text-xl font-semibold mt-6 mb-3">Business Transfers</h4>
                  <p>
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction. 
                    We will provide notice before your personal information is transferred and becomes subject to different privacy practices.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">4. Data Security</h3>
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and assessments</li>
                    <li>Access controls and authentication protocols</li>
                    <li>Employee training on data protection practices</li>
                    <li>Incident response and breach notification procedures</li>
                  </ul>
                  <p>
                    However, no method of transmission over the internet or electronic storage is 100% secure. 
                    While we strive to use commercially acceptable means to protect your personal information, 
                    we cannot guarantee its absolute security.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">5. Data Retention</h3>
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
                    unless a longer retention period is required or permitted by law. Specifically:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Account information is retained while your account is active</li>
                    <li>Usage data may be retained for up to 2 years for analytics purposes</li>
                    <li>Financial records are retained as required by applicable laws</li>
                    <li>Communication records may be retained for customer support purposes</li>
                  </ul>
                  <p>
                    When we no longer need your information, we will securely delete or anonymize it in accordance with our data retention policies.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h3>
                  <p>Depending on your location, you may have certain rights regarding your personal information:</p>
                  
                  <h4 className="text-xl font-semibold mt-6 mb-3">Access and Portability</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request a copy of the personal information we hold about you</li>
                    <li>Export your data in a machine-readable format</li>
                  </ul>

                  <h4 className="text-xl font-semibold mt-6 mb-3">Correction and Updates</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Update or correct inaccurate personal information</li>
                    <li>Complete incomplete personal information</li>
                  </ul>

                  <h4 className="text-xl font-semibold mt-6 mb-3">Deletion</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Request deletion of your personal information</li>
                    <li>Deactivate your account</li>
                  </ul>

                  <h4 className="text-xl font-semibold mt-6 mb-3">Marketing Communications</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Opt out of marketing emails by clicking the unsubscribe link</li>
                    <li>Adjust notification preferences in your account settings</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">7. Cookies and Tracking Technologies</h3>
                  <p>
                    We use cookies and similar tracking technologies to collect and track information and to improve our services. 
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                  </p>
                  
                  <h4 className="text-xl font-semibold mt-6 mb-3">Types of Cookies We Use</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                    <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
                    <li><strong>Functional Cookies:</strong> Enable enhanced functionality and personalization</li>
                    <li><strong>Targeting Cookies:</strong> Used to deliver relevant advertisements</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">8. Third-Party Services</h3>
                  <p>
                    Our service may contain links to third-party websites, applications, or services that are not owned or controlled by us. 
                    We are not responsible for the privacy practices of these third parties.
                  </p>
                  <p>
                    We integrate with various third-party services to enhance our functionality, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Food databases and nutrition APIs</li>
                    <li>Payment processors</li>
                    <li>Analytics and tracking services</li>
                    <li>Cloud storage providers</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">9. Children&apos;s Privacy</h3>
                  <p>
                    Our service is not intended for children under 13 years of age. We do not knowingly collect personally identifiable 
                    information from children under 13. If we become aware that we have collected personal information from a child under 13 
                    without verification of parental consent, we will take steps to remove that information from our servers.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">10. International Data Transfers</h3>
                  <p>
                    Your information may be transferred to and maintained on computers located outside of your state, province, 
                    country, or other governmental jurisdiction where data protection laws may differ from those in your jurisdiction.
                  </p>
                  <p>
                    We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance 
                    with this Privacy Policy and applicable data protection laws.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h3>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                    Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                  </p>
                  <p>
                    For material changes, we will provide additional notice (such as by email or through a prominent notice in our application) 
                    at least 30 days before the change becomes effective.
                  </p>
                </section>

                <section>
                  <h3 className="text-2xl font-semibold mb-4">12. Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <p><strong>Email:</strong> privacy@purepantry.com</p>
                  <p><strong>Data Protection Officer:</strong> dpo@purepantry.com</p>
                  <p><strong>Address:</strong> [Your Company Address]</p>
                </section>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 