import data from '../prebuild/release-cadence.json' assert { type: 'json' };

const groupByMajorVersion = data.reduce<Array<typeof data>>((acc, dataset) => {
  if (acc.length === 0) {
    acc.push([dataset]);
  } else {
    const [majorVersion] = dataset.patch.split('.');

    const last = acc[acc.length - 1];
    const [lastMajorVersion] = last[last.length - 1].patch.split('.');

    if (majorVersion === lastMajorVersion) {
      last.push(dataset);
    } else {
      acc.push([dataset]);
    }
  }

  return acc;
}, []);

type AnnouncementDateProps = {
  url: string | null;
  date: string | null;
};

function AnnouncementDate({ date, url }: AnnouncementDateProps) {
  if (date) {
    if (url) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <time dateTime={date}>{date}</time>
        </a>
      );
    }
    return <time dateTime={date}>{date}</time>;
  }

  return <span>-</span>;
}

function ReleaseDate({ date }: { date: string | null }) {
  if (date === null) {
    return <span>TBA</span>;
  }

  const isEstimation = date.startsWith('?');

  if (isEstimation) {
    return (
      <i>
        ?? <time dateTime={date.slice(1)}>{date.slice(1)}</time> ??
      </i>
    );
  }

  return <time dateTime={date}>{date}</time>;
}

type SinceLastReleaseProps = {
  currentReleaseDate: string;
  previousReleaseDate: string | null;
};

function SinceLastRelease({ currentReleaseDate, previousReleaseDate }: SinceLastReleaseProps) {
  if (previousReleaseDate === null) {
    return null;
  }

  const currentIsEstimation = currentReleaseDate.startsWith('?');
  const previousIsEstimation = previousReleaseDate.startsWith('?');

  const current = new Date(currentIsEstimation ? currentReleaseDate.slice(1) : currentReleaseDate);
  const previous = new Date(
    previousIsEstimation ? previousReleaseDate.slice(1) : previousReleaseDate
  );

  const daysBetweenLastPatch = Math.floor(
    (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      {daysBetweenLastPatch}d / {daysBetweenLastPatch / 7}w
    </>
  );
}

export function PatchCadence() {
  return (
    <>
      {groupByMajorVersion.map((majorGroup, groupIndex) => {
        const majorVersion = majorGroup[0].patch.split('.')[0];

        return (
          <section key={groupIndex}>
            <h2>Patch {majorVersion}.x</h2>

            <table>
              <thead>
                <tr>
                  <th>Patch</th>
                  <th>Announcement</th>
                  <th>Release Date</th>
                  <th>Since Last Release</th>
                </tr>
              </thead>

              <tbody>
                {majorGroup.map((patch, index) => {
                  let previous = majorGroup[index + 1];

                  if (previous === undefined) {
                    previous = groupByMajorVersion[groupIndex + 1]?.[0];
                  }

                  return (
                    <tr key={patch.patch}>
                      <td>
                        <a
                          href={`https://warcraft.wiki.gg/wiki/Patch_${patch.patch}`}
                          target="_blank"
                        >
                          {patch.patch}
                        </a>
                      </td>

                      <td>
                        <AnnouncementDate url={patch.url} date={patch.announcementDate} />
                      </td>

                      <td>
                        <ReleaseDate date={patch.releaseDate} />
                      </td>

                      <td>
                        <SinceLastRelease
                          currentReleaseDate={patch.releaseDate}
                          previousReleaseDate={previous?.releaseDate ?? null}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        );
      })}
    </>
  );
}
