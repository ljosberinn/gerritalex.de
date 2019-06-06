import React from 'react';

export const Status = () => (
  <div className="user-status-container position-relative hide-sm hide-md">
    <div className="f5">
      <div className="border-top-0 rounded-top-0 rounded-bottom-1 p-2 border">
        <details className="details-reset details-overlay details-overlay-dark">
          <summary className="btn-link btn-block link-gray no-underline toggle-user-status-edit">
            <div className="d-flex">
              <div className="f6 lh-condensed user-status-header d-inline-flex user-status-emoji-only-header circle">
                <div className="user-status-emoji-container flex-shrink-0 mr-1">
                  <g-emoji
                    className="g-emoji"
                    alias="dart"
                    aria-hidden="true"
                    fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f3af.png"
                  >
                    🎯
                  </g-emoji>
                </div>
                <div className="pt-1 ws-normal user-status-message-wrapper f6">
                  <div className="d-inline-block text-gray-dark">
                    <span>
                      <div>[foh-kuhs]</div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </summary>
        </details>
      </div>
    </div>
  </div>
);
