import { useFormContext } from 'react-hook-form';

import Button from '@Components/Button';
import { Spinner } from '@Components/loaders';

import type { CommandsProps } from './Commands.dto';

import styles from '../Form.module.scss'

const Commands: React.FC<CommandsProps> = ({ data }) => {
    const { formState: { isSubmitting } } = useFormContext();

    return (
        <div className={styles['commands']}>
            <Button
                as="input"
                type="reset"
                stylesFor="secondary"
                className={data.reset.className}
                disabled={data.submit.disabled}
            >
                {data.reset.label}
            </Button>
            {isSubmitting ? <Spinner /> : <Button
                as="input"
                type="submit"
                stylesFor="primary"
                className={data.submit.className}
                disabled={data.submit.disabled}
            >
                {data.submit.label}
            </Button>}
        </div>
    )
}

export default Commands;