import React, { useState } from 'react';

export const Banner = ({ repoLink }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClick = () => setIsVisible(false);

  return isVisible ? (
    <div className="signup-prompt-bg rounded-1">
      <div className="signup-prompt p-4 text-center mb-4 rounded-1">
        <div className="position-relative">
          <button
            type="button"
            onClick={handleClick}
            className="position-absolute top-0 right-0 btn-link link-gray"
          >
            Dismiss
          </button>
          <h3 className="pt-4 pt-lg-2">Disclaimer</h3>
          <p className="col-8 mx-auto">
            This is a reactified GitHub profile.
            <br />
            You can find my real profile in the section on the left.
            Alternatively, you can find the repo{' '}
            <a href={repoLink} target="_blank" rel="noreferrer noopener">
              here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  ) : null;
};
