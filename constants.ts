import { GDPData } from './types';

// Approximate 2024 GDP Projections (Trillions USD)
// Source: Aggregated estimates for demo purposes
export const GDP_2024_DATA: Record<string, GDPData> = {
  USA: { iso: 'USA', country: '美国', gdp: 28.78, rank: 1, growth: '+2.7%', region: '北美洲' },
  CHN: { iso: 'CHN', country: '中国', gdp: 19.53, rank: 2, growth: '+4.6%', region: '亚洲' },
  DEU: { iso: 'DEU', country: '德国', gdp: 4.59, rank: 3, growth: '+0.2%', region: '欧洲' },
  JPN: { iso: 'JPN', country: '日本', gdp: 4.11, rank: 4, growth: '+0.9%', region: '亚洲' },
  IND: { iso: 'IND', country: '印度', gdp: 3.94, rank: 5, growth: '+6.8%', region: '亚洲' },
  GBR: { iso: 'GBR', country: '英国', gdp: 3.50, rank: 6, growth: '+0.5%', region: '欧洲' },
  FRA: { iso: 'FRA', country: '法国', gdp: 3.13, rank: 7, growth: '+0.7%', region: '欧洲' },
  BRA: { iso: 'BRA', country: '巴西', gdp: 2.33, rank: 8, growth: '+2.2%', region: '南美洲' },
  ITA: { iso: 'ITA', country: '意大利', gdp: 2.33, rank: 9, growth: '+0.7%', region: '欧洲' },
  CAN: { iso: 'CAN', country: '加拿大', gdp: 2.24, rank: 10, growth: '+1.2%', region: '北美洲' },
  RUS: { iso: 'RUS', country: '俄罗斯', gdp: 2.06, rank: 11, growth: '+3.2%', region: '欧亚' },
  MEX: { iso: 'MEX', country: '墨西哥', gdp: 2.02, rank: 12, growth: '+2.4%', region: '北美洲' },
  AUS: { iso: 'AUS', country: '澳大利亚', gdp: 1.79, rank: 13, growth: '+1.5%', region: '大洋洲' },
  KOR: { iso: 'KOR', country: '韩国', gdp: 1.76, rank: 14, growth: '+2.3%', region: '亚洲' },
  ESP: { iso: 'ESP', country: '西班牙', gdp: 1.65, rank: 15, growth: '+1.9%', region: '欧洲' },
  IDN: { iso: 'IDN', country: '印度尼西亚', gdp: 1.54, rank: 16, growth: '+5.0%', region: '亚洲' },
  TUR: { iso: 'TUR', country: '土耳其', gdp: 1.34, rank: 17, growth: '+3.0%', region: '亚洲' },
  SAU: { iso: 'SAU', country: '沙特阿拉伯', gdp: 1.17, rank: 18, growth: '+2.6%', region: '亚洲' },
  NLD: { iso: 'NLD', country: '荷兰', gdp: 1.14, rank: 19, growth: '+0.6%', region: '欧洲' },
  CHE: { iso: 'CHE', country: '瑞士', gdp: 0.93, rank: 20, growth: '+1.3%', region: '欧洲' },
  POL: { iso: 'POL', country: '波兰', gdp: 0.86, rank: 21, growth: '+2.8%', region: '欧洲' },
  ARG: { iso: 'ARG', country: '阿根廷', gdp: 0.60, rank: 22, growth: '-2.8%', region: '南美洲' },
  SWE: { iso: 'SWE', country: '瑞典', gdp: 0.62, rank: 23, growth: '+0.2%', region: '欧洲' },
  BEL: { iso: 'BEL', country: '比利时', gdp: 0.66, rank: 24, growth: '+0.8%', region: '欧洲' },
  THA: { iso: 'THA', country: '泰国', gdp: 0.53, rank: 25, growth: '+2.7%', region: '亚洲' },
  ZAF: { iso: 'ZAF', country: '南非', gdp: 0.38, rank: 35, growth: '+1.0%', region: '非洲' },
  EGY: { iso: 'EGY', country: '埃及', gdp: 0.35, rank: 38, growth: '+3.0%', region: '非洲' },
  NGA: { iso: 'NGA', country: '尼日利亚', gdp: 0.25, rank: 45, growth: '+3.3%', region: '非洲' },
};

export const GEOJSON_URL = 'https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson';

export const GLOBE_IMAGE_URL = '//unpkg.com/three-globe/example/img/earth-night.jpg';
export const BACKGROUND_IMAGE_URL = '//unpkg.com/three-globe/example/img/night-sky.png';