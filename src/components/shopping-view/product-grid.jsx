import { ProductGridSkeleton } from "@/components/ui/skeleton";

export default function ProductGrid({ products, isLoading }) {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
} 