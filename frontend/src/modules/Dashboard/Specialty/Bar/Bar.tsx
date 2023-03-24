import { Search } from '@Components/Input';
import { Bar as BarTemplate, useTable } from '@Components/Table/Table';
import { Specialty } from '@Types/medical/specialty.model';

const Bar: React.FC = () => {
    const { globalFilter, setGlobalFilter } = useTable<Specialty>();

    return (
        <BarTemplate<Specialty> title='Especialidades'>
            <Search
                name='specialty-search'
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                title='Buscar por todas las especialidades'
                aria-label='Buscar por todas las especialidades'
            />
        </BarTemplate>
    )
}

export default Bar;