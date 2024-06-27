/**
 * A utility function to get URL's pathname and its search params
 */

export default function getPathWithSearchParams(
  relative?: boolean
): string {
  const result = (
    window.location.pathname + window.location.search
  ).substr(1);

  return relative ? result : `/${result}`;
}
