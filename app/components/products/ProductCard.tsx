import { SearchQuery } from '~/generated/graphql';
import { Link } from '@remix-run/react';
import { Price } from './Price';

export type ProductCardProps = SearchQuery['search']['items'][number];

export function ProductCard({
  productAsset,
  productName,
  slug,
  priceWithTax,
  currencyCode,
}: ProductCardProps) {
  return (
    <Link
      className="card flex flex-col items-center transition-transform duration-200 hover:scale-105 group"
      prefetch="intent"
      to={`/products/${slug}`}
    >
      <div className="w-full flex justify-center">
        <img
          className="rounded-2xl object-cover aspect-[7/8] shadow-md border border-gray-100 group-hover:shadow-lg transition-all duration-200"
          alt={productName}
          src={productAsset?.preview + '?w=340&h=400'}
        />
      </div>
      <div className="h-3" />
      <div className="text-base font-semibold text-primary-700 font-sans text-center tracking-tight group-hover:text-primary-500" style={{ fontFamily: 'Quicksand, Montserrat, sans-serif' }}>{productName}</div>
      <div className="text-lg font-bold text-secondary-500 mt-1">
        <Price priceWithTax={priceWithTax} currencyCode={currencyCode} />
      </div>
    </Link>
  );
}
