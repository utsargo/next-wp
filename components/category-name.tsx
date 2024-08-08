// components/CategoryName.tsx
import { fetchCategories } from "@/lib/api";
import type { Category } from "@/lib/actions";

interface CategoryNameProps {
  categorySlug: string;
}

const CategoryName = async ({ categorySlug }: CategoryNameProps) => {
  const categories = await fetchCategories();
  const category = categories.find((cat: Category) => cat.slug === categorySlug);
  const name = category ? category.name : "Category";

  return <span>{name}</span>;
};

export default CategoryName;
