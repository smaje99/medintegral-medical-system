import 'dayjs/locale/es';

import dayjs, { type ConfigType, extend, locale, type UnitType } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

extend(relativeTime);
locale('es');

/**
 * Returns the difference between two dates in a given unit.
 */
export function differenceBetweenDates(
  date1: ConfigType,
  date2: ConfigType,
  unit: UnitType,
): number {
  return dayjs(date1).diff(date2, unit);
}
