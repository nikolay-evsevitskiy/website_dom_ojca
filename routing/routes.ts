import { PageView } from '../types';

/** URL path for each page (relative to base). */
export const paths: Record<PageView, string> = {
  [PageView.HOME]: '/',
  [PageView.ABOUT]: '/about',
  [PageView.SERMONS]: '/sermons',
  [PageView.EVENTS]: '/events',
  [PageView.CONTACT]: '/contact',
  [PageView.DONATION]: '/donation',
};

/** Map pathname (normalized: no trailing slash except for '/') to PageView. */
export function getPageFromPath(pathname: string): PageView {
  const normalized = (pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname) || '/';
  const entries = Object.entries(paths) as [PageView, string][];
  const match = entries.find(([, path]) => path === normalized);
  return match ? match[0] : PageView.HOME;
}

export function getPathFromPage(page: PageView): string {
  return paths[page];
}
