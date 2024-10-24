// /eprov2/ui

const Config = {
  defaultPath: '/vendor/security',
  //defaultPath: '/bulk/dashboard',
  // basename: 'kr-creation',
  // localUrl
  baseUrl: `${window?.location?.href?.split('#')[0].substring(0, window?.location?.href?.split('#')[0].length - 1)}/eprov2api`,
  baseUrlForSampleData: `${window?.location?.href
    ?.split('#')[0]
    .substring(0, window?.location?.href?.split('#')[0].length - 1)}/samples/SamplePartyMasterData.xlsx`,
  // baseUrl: `${window?.location?.href?.split('#')[0].substring(0, window?.location?.href?.split('#')[0].length - 1)}/eprov2api`,
  // baseUrlForSampleData: `${window?.location?.href
  //     ?.split('#')[0]
  //     .substring(0, window?.location?.href?.split('#')[0].length - 1)}/samples/SamplePartyMasterData.xlsx`,

  // baseUrl: 'https://techamour.net/eprotex/eprov2api',

  //30 03 2023
 baseUrl: 'http://eprotex.shop/eprotex/eprov2api',

  //baseUrl: 'https://eprotex.software/eprotex/eprov2api',

  //dev remote api (Common DB)
  layout: 'vertical',
  subLayout: '',
  collapseMenu: false,
  layoutType: 'menu-light',
  headerBackColor: 'header-blue',
  rtlLayout: false,

  navFixedLayout: false,
  headerFixedLayout: true,
  boxLayout: false,
  alertTimeout: 1500
};
export default Config;
