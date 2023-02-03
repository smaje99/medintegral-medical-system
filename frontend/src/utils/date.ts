import dayjs, { Dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/es';

dayjs.extend(relativeTime);
dayjs.locale('es');

export function addDays(date: Date, days: number): Dayjs {
    return dayjs(new Date(date).toDateString())
        .add(days, 'days');
}

export function dateWithFormat(date: Dayjs): string {
    return date.format('DD/MM/YYYY');
}

export function relativeDateToNow(date: string | number | Dayjs | Date): string {
    return dayjs().to(date);
}