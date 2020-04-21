import React, { forwardRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

const routes = [
  { to: '/', title: 'cv' },
  { to: '/concerts', title: 'concerts' },
  { to: '/music', title: 'music' },
];

const Navigation = () => {
  const { t } = useTranslation('navigation');

  return (
    <div
      className="UnderlineNav width-full user-profile-nav top-0"
      style={{ position: 'static' }}
    >
      <nav className="UnderlineNav-body" aria-label="User profile">
        {routes.map(({ to, title }) => (
          <Link href={to} passHref key={to}>
            <NavLink label={t(title)}></NavLink>
          </Link>
        ))}
      </nav>
    </div>
  );
};

const NavLink = forwardRef(({ onClick, href, label }, ref) => {
  const { pathname } = useRouter();

  return (
    <a
      className={[
        'UnderlineNav-item mr-0 mr-md-1 mr-lg-3',
        pathname === href ? 'selected' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      ref={ref}
    >
      {label}
    </a>
  );
});

export default Navigation;
