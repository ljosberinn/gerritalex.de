import { Carousel } from './Carousel';
import { GitHubRepoCard } from './GitHubRepoCard';

const repositories = [
  {
    description:
      "hopefully the last eslint config you'll ever need - customizable & modern best practices for JS, TS, Node, React, Next, Jest, testing-library",
    tags: [
      'react',
      'typescript',
      'eslint',
      'jest',
      '@testing-library/react',
      'node',
      'next',
    ],
    title: 'eslint-config-galex',
    url: 'https://github.com/ljosberinn/eslint-config-galex',
  },
];

export function GitHubList(): JSX.Element {
  return (
    <Carousel>
      {repositories.map((repo) => (
        <GitHubRepoCard key={repo.title} {...repo} />
      ))}
    </Carousel>
  );
}
