import React from 'react';
import { NavLink } from 'react-router-dom';

const routes = [
  { to: '/', title: 'CV' },
  { to: '/concerts', title: 'Concerts I attended' }
  //{ to: '/music', title: 'Music I own' }
];

const Navigation = () => {
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
            {title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
