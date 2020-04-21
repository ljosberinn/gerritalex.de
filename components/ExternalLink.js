import React from 'react';

export default function ExternalLink({ children, ...rest }) {
  return (
    <a rel="noopener noreferrer" target="_blank" {...rest}>
      {children}
    </a>
  );
}
