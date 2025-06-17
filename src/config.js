// /eprov2/ui

// const Config = {
//   defaultPath: '/',
//   //defaultPath: '/bulk/dashboard',
//   // basename: 'kr-creation',
//   // localUrl
//   // baseUrl: `${window?.location?.href?.split('#')[0]
//   //   .substring(0, window?.location?.href?.split('#')[0].length - 1)
//   //   .replace('kcvendor.', '')}/eprotex/eprov2api`,
//   baseUrl: `${window?.location?.href?.split('#')[0]
//     .substring(0, window?.location?.href?.split('#')[0].length - 1)
//     // .replace(window?.location?.href?.includes('kcvendor.') ? 'kcvendor.' : 'krvendor.', '')}/eprotex/eprov2api`,
//     .replace(
//       window?.location?.href?.includes('kcvendor.') ? 'kcvendor.' :
//         window?.location?.href?.includes('krvendor.') ? 'krvendor.' :
//           window?.location?.href?.includes('ofvendor.') ? 'ofvendor.' : '',
//       ''
//     )}/eprotex/eprov2api`,

//   baseUrlForSampleData: `${window?.location?.href
//     ?.split('#')[0]
//     .substring(0, window?.location?.href?.split('#')[0].length - 1)}/samples/SamplePartyMasterData.xlsx`,
const baseHost = window?.location?.hostname.replace(/^[^.]+?\./, ''); // Removes the first subdomain
const protocol = window?.location?.protocol;
const baseUrl = `${protocol}//${baseHost}/eprotex/eprov2api`;

// console.log('protocol', protocol);
// console.log('protocol', baseHost);

const Config = {
  defaultPath: '/',
  baseUrl,

  baseUrlForSampleData: `${protocol}//${baseHost}/samples/SamplePartyMasterData.xlsx`,
  // baseUrl: `${window?.location?.href?.split('#')[0].substring(0, window?.location?.href?.split('#')[0].length - 1)}/eprov2api`,
  // baseUrlForSampleData: `${window?.location?.href
  //     ?.split('#')[0]
  //     .substring(0, window?.location?.href?.split('#')[0].length - 1)}/samples/SamplePartyMasterData.xlsx`,

  // baseUrl: 'https://techamour.net/eprotex/eprov2api',

  //30 03 2023
  // baseUrl: 'http://eprotex.shop/eprotex/eprov2api',

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
