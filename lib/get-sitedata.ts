import { SiteData } from '@/lib/actions';
import data from '../public/site-data.json';

export const getSiteData = () => {
  const siteData: SiteData = data;
  return siteData;
}

const siteData = getSiteData();

export default siteData;