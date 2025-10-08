import Filter  from "@/components/Filter";
import ProductList from "@/components/ProductList";
interface ListPageProps {
  searchParams: Promise<{
    cat?: string;
    name?: string;
    search?: string;
  }>;
}

export default async function ListPage({ searchParams }: ListPageProps) {
  const params = await searchParams;

  const categoryId = params.cat;
  const categoryName = params.name;
  const searchTerm = params.search;

  return (
    <div className="min-h-screen pt-45">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-4 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {categoryName ? `${categoryName} Products` : 'All Products'}
        </h1>
        {searchTerm && (
          <p className="text-gray-600">
            Search results for "{searchTerm}"
          </p>
        )}
      </div>

      {/* Products */}
      <div className="pb">
        <Filter />
        <ProductList
          categoryId={categoryId || ""}
          searchParams={params} // ✅ pass resolved params
          limit={20}
        />
      </div>
    </div>
  );
}
