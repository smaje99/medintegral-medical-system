import { RankingInfo } from '@tanstack/match-sorter-utils';
import {
    FilterFn, FilterFns, FilterMeta
} from '@tanstack/react-table';

declare module '@tanstack/table-core' {
    interface FilterFns {
        fuzzy: FilterFn<unknown>;
        startWith: FilterFn<unknown>;
    }
    interface FilterMeta {
        itemRank: RankingInfo;
    }
}