import { format } from 'date-fns';
import bnLocale from 'date-fns/locale/bn';

/**
 * Date-fns lib throw error when parsing date in UTC format,
 * this function split up the date and use date object before pass
 * into the "format" function from date-fns
 *
 * @param {string} date
 * @param {string} formatStyle
 * @param {string} locale
 * @return {string} formatted date
 *
 * @version 1.0.2
 */
export default (date, formatStyle = 'dd MMMM yyyy', locale = '') => {
  const localeLang = {
    locale: locale ? locale : bnLocale,
  };

  return format(new Date(date), formatStyle, localeLang);
};
