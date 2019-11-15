import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const routes = [
  { to: '/', title: 'cv' },
  //{ to: '/blog', title: 'blog' },
  //{ to: '/other', title: 'other' },
  { to: '/concerts', title: 'concerts' },
  //{ to: '/music', title: 'music' }
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
          <NavLink
            to={to}
            className="UnderlineNav-item mr-0 mr-md-1 mr-lg-3"
            activeClassName="selected"
            exact
            key={to}
          >
            {t(title)}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
