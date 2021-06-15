import { Status } from './Status';

export function Avatar({ userName }) {
  return (
    <div className="float-left col-3 col-md-12 pr-3 pr-md-0">
      <a
        className="u-photo d-block tooltipped tooltipped-s"
        aria-label="Jan 2020"
        href={`https://github.com/${userName}`}
      >
        <img
          alt="Gerrit Alex"
          width="272"
          height="272"
          className="avatar width-full height-full avatar-before-user-status"
          src="https://avatars3.githubusercontent.com/u/29307652?s=460;v=4"
        />
        <Status />
      </a>
    </div>
  );
}
