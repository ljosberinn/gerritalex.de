import { Carousel } from '../Carousel';
import { GitHubRepoCard } from './RepoCard';
import RepoList from './repo-list.json';

export function GitHubList(): JSX.Element {
  return (
    <Carousel>
      {RepoList.map((repo) => (
        <GitHubRepoCard
          key={repo.title}
          title={repo.title}
          description={repo.description}
          url={repo.url}
          tags={repo.tags}
        />
      ))}
    </Carousel>
  );
}
