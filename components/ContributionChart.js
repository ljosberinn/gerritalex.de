import React from 'react';

export function ContributionChart({ svg }) {
  return svg.length === 0 ? (
    <img
      className="d-block mx-auto mt-4"
      alt="Loading"
      src="https://github.githubassets.com/images/spinners/octocat-spinner-32.gif"
      width="32"
      height="32"
    />
  ) : (
    <svg
      width="722"
      height="112"
      className="mx-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
