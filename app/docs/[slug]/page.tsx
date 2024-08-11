
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';
import 'prismjs/themes/prism-tomorrow.css'; // Import your preferred Prism theme
import Container from '@/components/container';

interface DocPageProps {
  params: { slug: string };
}

const DocPage = async ({ params }: DocPageProps) => {
  const filePath = path.join(process.cwd(), 'public', 'docs', `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  return (
    <Container className="py-8 my-4 flex flex-col items-start bg-slate-50">
      <h1 className='text-4xl'>{data.title}</h1>
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypePrism],
          },
        }}
      />
    </Container>
  );
};

export default DocPage;
