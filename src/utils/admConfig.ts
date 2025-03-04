/* 配置 antd-mobile 语言包 */
import { LangEnum } from '@/constant/langEnum';

export async function loadLocale(lang: string) {
  let antdLocale;

  switch (lang) {
    case LangEnum.EN:
      antdLocale = await import('antd-mobile/es/locales/en-US');
      break;
    case LangEnum.ZH:
      antdLocale = await import('antd-mobile/es/locales/zh-CN');
      break;
    default:
      // 默认中文
      antdLocale = await import('antd-mobile/es/locales/zh-CN');
  }

  return antdLocale.default;
}
