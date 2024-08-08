import { Metadata } from "next";
import Container from "@/components/container";
import ContactForm from "@/components/contact-form";
import siteData from "@/lib/get-sitedata";
import { getMarkdownContent } from "@/lib/get-markdown-content";
import ReactMarkdown from 'react-markdown';

export const metadata: Metadata = {
  title: `${siteData.siteInfo.title} | ${siteData.pageHeadings.contact}`,
  description: siteData.siteInfo.description,
  openGraph: {
    title: `${siteData.siteInfo.title} | ${siteData.pageHeadings.contact}`,
    description: siteData.siteInfo.description,
    type: "website",
    url: "/contact",
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

const ContactPage = async () => {
  const actionLink = siteData.siteInfo.contactFormLink
  const markdownContent = await getMarkdownContent('public/content/contact-content.md');

  return (
    <Container className="py-8 flex flex-col items-center">
      <h1 className="text-4xl">{siteData.pageHeadings.contact}</h1>
      <div className="w-full flex flex-col md:flex-row gap-2">
        <div className="w-full md:w-1/2 p-4">
          <ReactMarkdown>
            {markdownContent}
          </ReactMarkdown>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <ContactForm formLink={actionLink} />
        </div>
      </div>
    </Container>
  );
}

export default ContactPage;
