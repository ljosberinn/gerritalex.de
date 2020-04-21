export default async function fetcher(url) {
  const res = await fetch(url);
  const data = await res.json();

  return data;
}
