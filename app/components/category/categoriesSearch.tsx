import { Category } from "~/types/category";

interface CategoriesListProps {
  name: string;
  onSelect: (name: string) => void;
  categories: Category[];
  quickCreate?: boolean;
}

export default function CategoriesSearch({
  name,
  onSelect,
  categories,
  quickCreate = true,
}: CategoriesListProps) {
  const mapped_categories = categories
    .filter((category) => {
      return category.name.toLowerCase().includes(name.toLowerCase());
    })
    .sort((c1, c2) => {
      if (c1.name.toLowerCase() < c2.name.toLowerCase()) return -1;
      else if (c1.name.toLowerCase() > c2.name.toLowerCase()) return 1;
      else return 0;
    });
  const isCategoryCreated = mapped_categories.some((c) => c.name === name);

  return (
    <div className="bg-white text-sm rounded-xl drop-shadow-xl mt-2 max-h-28 overflow-y-auto">
      {name != "" && !isCategoryCreated && quickCreate && (
        <button
          className="flex flex-row p-1 w-full"
          onClick={() => onSelect(name)}
          type="button"
        >
          Create: {name}
        </button>
      )}
      {mapped_categories.map((category, index) => (
        <button
          key={index}
          className="flex flex-row p-1 w-full"
          onClick={() => onSelect(category.name)}
          type="button"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
