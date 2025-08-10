import { Link } from '@remix-run/react';
import { CollectionsQuery } from '~/generated/graphql';

export function CollectionCard({
  collection,
}: {
  collection: CollectionsQuery['collections']['items'][number];
}) {
  return (
    <Link
      to={'/collections/' + collection.slug}
      prefetch="intent"
      key={collection.id}
      className="card max-w-[320px] relative rounded-2xl overflow-hidden hover:scale-105 transition-transform duration-200 xl:w-auto shadow group"
      style={{ fontFamily: 'Quicksand, Montserrat, sans-serif' }}
    >
      <span aria-hidden="true" className="">
        <div className="w-full h-full object-center object-cover">
          <img className="rounded-2xl object-cover aspect-square w-full h-full group-hover:opacity-90 transition" src={collection.featuredAsset?.preview + '?w=320&h=320'} />
        </div>
      </span>
      <span
        aria-hidden="true"
        className="absolute w-full bottom-0 h-2/3 bg-gradient-to-t from-primary-900/80 to-transparent opacity-80"
      />
      <span className="absolute w-full bottom-4 mt-auto text-center text-2xl font-bold text-white drop-shadow-lg tracking-tight px-2">
        {collection.name}
      </span>
    </Link>
  );
}
