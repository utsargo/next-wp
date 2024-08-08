import siteData from "@/lib/get-sitedata";
interface ContactFormProps {
    formLink: string;
  }

const ContactForm = ({formLink}:ContactFormProps) => {
    return (
      <form
        className="my-contact-form flex flex-col space-y-4 items-center w-full"
        action={formLink}
        method="POST"
        id="contact-form"
      >
        <label className="flex flex-col w-full">
          <span className="sr-only">Name</span>
          <input
            type="text"
            name="full-name"
            maxLength={30}
            placeholder={siteData.placeholders.name}
            id="full-name"
            required
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </label>
        <label className="flex flex-col w-full">
          <span className="sr-only">Email</span>
          <input
            type="email"
            name="email"
            placeholder={siteData.placeholders.email}
            id="email"
            required
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </label>
        <label className="flex flex-col w-full">
          <span className="sr-only">Your Message</span>
          <textarea
            name="message"
            placeholder={siteData.placeholders.message}
            maxLength={2000}
            id="message"
            required
            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
          ></textarea>
        </label>
        
        <span id="error-message" className="text-red-500"></span>
        <button
          className="btn btn-primary bg-slate-950 text-slate-50 rounded py-2 px-4 hover:bg-slate-800 transition-colors w-fit"
          id="btn-submit"
          type="submit"
        >
          {siteData.buttons.contactSubmit}
        </button>
      </form>
    );
  };
  
  export default ContactForm;
  