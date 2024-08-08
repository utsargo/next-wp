import Container from "@/components/container";
import { Metadata } from "next";
import siteData from "@/lib/get-sitedata";
import Link from "next/link";

export const metadata: Metadata = {
    title: `${siteData.siteInfo.title} | Privacy Policy`,
    description: siteData.siteInfo.description,
    openGraph: {
        title: `${siteData.siteInfo.title} | Privacy Policy`,
        description: siteData.siteInfo.description,
        type: "website",
        url: "/privacy-policy",
        images: [
            {
                url: "/images/og-logo.png",
                width: 400,
                height: 400,
                alt: siteData.siteInfo.title,
            },
        ],
    },
};

const PrivacyPolicy = () => {
    return (
        <Container className="py-8 flex flex-col items-center">

        <h1 className="text-3xl font-bold mb-6">Privacy Policy for {siteData.siteInfo.title}</h1>
        <p className="text-sm mb-6"><strong>Effective Date:</strong> July 28, 2024</p>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-2">Welcome to {siteData.siteInfo.title} (“we,” “our,” or “us”). We are committed to protecting your privacy and ensuring that your personal data is handled in a safe and responsible manner. This Privacy Policy explains how we collect, use, and disclose your personal data, and your rights under the General Data Protection Regulation (GDPR) and the California Privacy Rights Act (CPRA).</p>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            <p className="mb-2">We may collect the following types of personal data:</p>
            <ul className="list-disc list-inside mb-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
                <li><strong>Account Information:</strong> Username, password, and profile information.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, such as your IP address, browser type, pages visited, and time spent on the site.</li>
                <li><strong>Cookies and Tracking Technologies:</strong> Data collected through cookies, web beacons, and similar technologies.</li>
            </ul>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p className="mb-2">We use your personal data for the following purposes:</p>
            <ul className="list-disc list-inside mb-2">
                <li><strong>To Provide and Improve Our Services:</strong> To operate and maintain our website, provide customer support, and improve our services.</li>
                <li><strong>To Communicate with You:</strong> To send you updates, newsletters, and other communications.</li>
                <li><strong>To Personalize Your Experience:</strong> To tailor content and recommendations to your interests.</li>
                <li><strong>To Comply with Legal Obligations:</strong> To comply with applicable laws, regulations, and legal processes.</li>
            </ul>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">4. Legal Basis for Processing Personal Data (GDPR)</h2>
            <p className="mb-2">Under the GDPR, we rely on the following legal bases for processing your personal data:</p>
            <ul className="list-disc list-inside mb-2">
                <li><strong>Consent:</strong> When you have given us explicit consent to process your personal data.</li>
                <li><strong>Contract:</strong> When processing is necessary for the performance of a contract with you.</li>
                <li><strong>Legal Obligation:</strong> When processing is necessary to comply with a legal obligation.</li>
                <li><strong>Legitimate Interests:</strong> When processing is necessary for our legitimate interests, provided that your rights and interests do not override those interests.</li>
            </ul>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">5. Your Rights (GDPR and CPRA)</h2>
            <p className="mb-2">You have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside mb-2">
                <li><strong>Access:</strong> You have the right to request access to your personal data.</li>
                <li><strong>Correction:</strong> You have the right to request the correction of inaccurate or incomplete personal data.</li>
                <li><strong>Deletion:</strong> You have the right to request the deletion of your personal data.</li>
                <li><strong>Data Portability:</strong> You have the right to request a copy of your personal data in a structured, commonly used, and machine-readable format.</li>
                <li><strong>Opt-Out:</strong> You have the right to opt-out of the sale of your personal data (CPRA).</li>
                <li><strong>Non-Discrimination:</strong> You have the right not to be discriminated against for exercising your privacy rights (CPRA).</li>
            </ul>
            <p className="mb-2">To exercise any of these rights, please contact us at <a href="mailto:[insert contact email]" className="text-blue-600">[insert contact email]</a>.</p>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p className="mb-2">We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, use, or disclosure.</p>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p className="mb-2">We retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.</p>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">8. Third-Party Disclosure</h2>
            <p className="mb-2">We do not sell your personal data to third parties. We may share your personal data with third-party service providers who assist us in operating our website and providing our services, subject to confidentiality agreements.</p>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p className="mb-2">If you are located outside of the United States, please be aware that your personal data may be transferred to, stored, and processed in the United States, where our servers are located. We take steps to ensure that your personal data receives an adequate level of protection in the jurisdictions in which we process it.</p>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">10. Changes to This Privacy Policy</h2>
            <p className="mb-2">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.</p>
        </section>

        <section className="mb-6 w-full">
            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
            <p className="mb-2">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            <p className="mb-2">
                Email: <Link href={`mailto:${siteData.siteInfo.email}`} className="text-blue-600">{siteData.siteInfo.email}</Link>
               
            </p>
        </section>



        </Container>
    );
    }

export default PrivacyPolicy;