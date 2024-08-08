import Container from '@/components/container';
import SearchResults from '@/components/SearchResults';

interface SearchProps {
  searchParams: { query: string };
}

const SearchPage = ({ searchParams }: SearchProps) => {
  const { query } = searchParams;

  return (
    <Container className="py-8">
      <h1 className="text-4xl font-bold mb-4">অনুসন্ধানের ফলাফল: &quot;{query}&quot;</h1>
      <SearchResults query={query} />
    </Container>
  );
};

export default SearchPage;
