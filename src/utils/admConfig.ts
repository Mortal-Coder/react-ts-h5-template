/* 配置 antd-mobile 语言包 */
export async function loadLocale(lang: string) {
  let antdLocale;

  switch (lang) {
    case 'en':
      antdLocale = await import('antd-mobile/es/locales/en-US');
      break;
    case 'zh':
      antdLocale = await import('antd-mobile/es/locales/zh-CN');
      break;
    default:
      // 默认中文
      antdLocale = await import('antd-mobile/es/locales/zh-CN');
  }

  return antdLocale.default;
}
