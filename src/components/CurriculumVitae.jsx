import React from 'react';

const cv = [
  {
    position: 'Web Developer',
    employer: 'mpunkt GmbH',
    location: 'Augsburg',
    from: '2018-07-23',
    to: '',
    achievements: [
      'project lead & continued development after takeover of a customer-tailored web application',
      'leading a SCRUM-like team of up to five developers',
      'using Code Review- and Pair Programming-like processes',
      'client contact concerning SDLC via mail, phone as well as on site',
      'modernizing the development processes with tools such as, but not limited to IDE plugins, npm, composer, Sentry, SCSS, React, TypeScript, webpack and Jenkins',
      'supervising and coordinating work students and trainees',
      'held internal trainings (e.g. ES2015+, Chrome Developer Tools Deep Dive)'
    ]
  },
  {
    position: 'Voactional training as media designer',
    employer: 'Printery Joh. Walch',
    location: 'Haunstetten',
    from: '2015-09-01',
    to: '2018-07-22',
    achievements: []
  },
  {
    position: 'Philosophy',
    employer: 'University of Augsburg',
    location: 'Augsburg',
    from: '2014-10-01',
    to: '2015-08-30',
    achievements: []
  },
  {
    position: 'Teachers Education: German language & philosophy',
    employer: 'University of Trier',
    location: 'Trier',
    from: '2012-10-01',
    to: '2014-09-30',
    achievements: []
  }
];

export const CurriculumVitae = () => {
  const handleClick = e => e.preventDefault();

  return (
    <div className="mt-4">
      <details className="details-reset details-overlay details-overlay-dark">
        <summary className="btn-link muted-link float-right mt-1 pinned-items-setting-link ">
          Change language
        </summary>
      </details>
      <h2 className="f4 mb-2 text-normal">Curriculum Vitae</h2>
      <ol className="pinned-items-list mb-4">
        {cv.map(
          ({ position, employer, from, to, location, achievements }, key) => {
            const dates = {
              from: new Date(from).toLocaleDateString(),
              to: to.length > 0 ? new Date(to).toLocaleDateString() : ''
            };

            return (
              <li
                className="pinned-item-list-item d-flex p-3 border border-gray-dark rounded-1 -item-list-item public source sortable-button-item cv"
                key={key}
              >
                <div className="pinned-item-list-item-content">
                  <div className="d-flex width-full flex-items-center position-relative">
                    <svg
                      className="octicon octicon-repo mr-2 text-gray"
                      viewBox="0 0 12 16"
                      version="1.1"
                      width="12"
                      height="16"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"
                      />
                    </svg>
                    <a
                      href=""
                      className="text-bold flex-auto"
                      onClick={handleClick}
                    >
                      <span
                        className="repo -item"
                        title={`${position} at ${employer}, ${location}`}
                      >
                        {position} at {employer}, {location}
                      </span>
                    </a>
                  </div>

                  <p className="pinned-item-desc text-gray text-small d-block mt-2 mb-3">
                    {dates.from} - {dates.to}
                    {achievements.map((achievement, key) => (
                      <span key={key}>
                        {achievement}
                        <br />
                      </span>
                    ))}
                  </p>

                  <p className="mb-0 f6 text-gray">
                    <span className="d-inline-block mr-3">
                      <span
                        className="repo-language-color"
                        style={{ backgroundColor: '#2b7489' }}
                      />
                      <span itemProp="programmingLanguage">TypeScript</span>
                    </span>

                    {achievements.length > 0 && (
                      <span className="pinned-item-meta muted-link">
                        <svg
                          aria-label="stars"
                          className="octicon octicon-star"
                          viewBox="0 0 14 16"
                          version="1.1"
                          width="14"
                          height="16"
                          role="img"
                        >
                          <path
                            fillRule="evenodd"
                            d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"
                          />
                        </svg>
                        {` ${achievements.length + 1}`}
                      </span>
                    )}
                  </p>
                </div>
              </li>
            );
          }
        )}
      </ol>
    </div>
  );
};
