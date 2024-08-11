import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

interface CTAProps {
  fileName: string;
  bgClass?: string;
  btnClass?: string;
}

const CTA = async ({ fileName, bgClass, btnClass }: CTAProps) => {
  // Define the path to the markdown file based on the passed fileName
  const filePath = path.join(process.cwd(), 'public', 'content', fileName);
  // Read the file
  const fileContents = fs.readFileSync(filePath, 'utf8');
  // Parse the markdown file to extract frontmatter
  const { data } = matter(fileContents);

  return (
    <div className={`w-full text-slate-50 py-8 px-4 flex flex-col items-center justify-center text-center rounded-md shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out my-2 ${bgClass || 'bg-slate-700'}`}>
      <h2 className="text-4xl font-bold mb-4 transition-transform duration-300 ease-in-out">
        {data['cta-heading']}
      </h2>
      <p className="text-lg mb-6">
        {data['cta-text']}
      </p>
      <Link href={data['cta-button-link']}
        className={` text-white py-2 px-4 rounded-full text-lg font-medium transform hover:scale-105 transition-transform duration-300 ease-in-out ${btnClass || 'bg-slate-950 hover:bg-slate-850'}`}
      >
        {data['cta-button-text']}
      </Link>
    </div>
  );
};

export default CTA;
