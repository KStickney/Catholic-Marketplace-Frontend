import { Link, useLoaderData } from '@remix-run/react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { SearchBar } from '~/components/header/SearchBar';
import { useRootLoader } from '~/utils/use-root-loader';
import { UserIcon } from '@heroicons/react/24/solid';
import { useScrollingUp } from '~/utils/use-scrolling-up';
import { classNames } from '~/utils/class-names';
import { useTranslation } from 'react-i18next';

export function Header({
  onCartIconClick,
  cartQuantity,
}: {
  onCartIconClick: () => void;
  cartQuantity: number;
}) {
  const data = useRootLoader();
  const isSignedIn = !!data.activeCustomer.activeCustomer?.id;
  const isScrollingUp = useScrollingUp();
  const { t } = useTranslation();

  return (
    <header
      className={classNames(
        isScrollingUp ? 'sticky top-0 z-10 animate-dropIn' : '',
        'bg-white/80 backdrop-blur border-b border-primary-100 shadow-sm',
      )}
    >
      <div className="bg-primary-50 text-primary-700 text-center text-sm py-2 px-2 xl:px-0 font-sans tracking-tight">
        <div className="max-w-6xl mx-2 md:mx-auto flex items-center justify-between">
          <div>
            <p className="hidden sm:block">
              {t('vendure.exclusive')}{' '}
              <a
                href="https://github.com/vendure-ecommerce/storefront-remix-starter"
                target="_blank"
                className="underline hover:text-primary-500"
              >
                {t('vendure.repoLinkLabel')}
              </a>
            </p>
          </div>
          {/* Removed login/account button from here */}
        </div>
      </div>
      <div className="max-w-6xl mx-auto py-4 flex items-center space-x-6">
        <h1 className="w-14 h-14 flex items-center justify-center bg-primary-100/80 rounded-2xl border-2 border-primary-300 shadow-lg">
          <Link to="/">
            <img
              src="/cube-logo-small.webp"
              width={44}
              height={34}
              alt={t('commmon.logoAlt')}
              className="rounded-xl drop-shadow-md"
              style={{ background: 'transparent' }}
            />
          </Link>
        </h1>
        <nav className="flex space-x-2 hidden sm:block">
          {data.collections.map((collection) => (
            <Link
              className="text-base text-primary-700 hover:bg-primary-100 px-3 py-1 rounded-full font-medium transition"
              to={'/collections/' + collection.slug}
              prefetch="intent"
              key={collection.id}
              style={{ fontFamily: 'Quicksand, Montserrat, sans-serif' }}
            >
              {collection.name}
            </Link>
          ))}
        </nav>
        <div className="flex-1 md:pr-8">
          <SearchBar></SearchBar>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="relative w-10 h-10 bg-primary-100 rounded-full text-primary-700 p-2 shadow hover:bg-primary-200 transition"
            onClick={onCartIconClick}
            aria-label="Open cart tray"
          >
            <ShoppingBagIcon></ShoppingBagIcon>
            {cartQuantity ? (
              <div className="absolute rounded-full -top-2 -right-2 bg-secondary-500 min-w-6 min-h-6 flex items-center justify-center text-xs p-1 text-white font-bold shadow">
                {cartQuantity}
              </div>
            ) : (
              ''
            )}
          </button>
          <Link
            to={isSignedIn ? '/account' : '/sign-in'}
            className="flex space-x-1 items-center bg-primary-100 rounded-full px-3 py-1 text-primary-700 hover:bg-primary-200 transition font-semibold ml-1"
            style={{ fontFamily: 'Quicksand, Montserrat, sans-serif' }}
          >
            <UserIcon className="w-4 h-4"></UserIcon>
            <span>
              {isSignedIn ? t('account.myAccount') : t('account.signIn')}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
