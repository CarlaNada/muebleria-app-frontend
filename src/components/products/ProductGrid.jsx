import ProductCard from '@/components/products/ProductCard';

export default function ProductGrid({ products }) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl bg-surface px-5 py-10 text-center text-muted">
        No encontramos productos con esos criterios.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}