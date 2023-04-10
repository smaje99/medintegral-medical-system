import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import {
    FormProvider, useForm, type SubmitHandler
} from 'react-hook-form';
import { toast } from 'react-toastify';

import {
    Form, type FieldAttributes, type CommandAttributes
} from '@Components/Form';
import { Modal } from '@Components/Modal';
import getToastConfig, { getToastUpdateConfig } from '@Helpers/toast.config';
import { createFile } from '@Services/files.service';
import { createSpecialty } from '@Services/specialty.service';
import type { FileCreate } from '@Types/file.model';
import type { SpecialtyCreate } from '@Types/medical/specialty.model';

import styles from './CreateFormModal.module.scss';

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

type SpecialtyCreateValues = Omit<SpecialtyCreate, 'image'> & {
    image?: File[]
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;  // 5MB

const CreateFormModal: React.FC<Props> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [image, setImage] = useState<File[]>([]);

    const { data: session } = useSession();
    const formMethods = useForm<SpecialtyCreateValues>();

    const data = useMemo<FieldAttributes<SpecialtyCreateValues>[]>(() => [
        {
            type: 'text',
            name: 'name',
            label: 'Nombre',
            obligatory: true,
        },
        {
            type: 'textarea',
            name: 'description',
            label: 'Descripción',
            obligatory: true,
        },
        {
            type: 'file',
            name: 'image',
            label: 'Imagen',
            accept: 'image/*',
            obligatory: true,
            onFileChange: (files) => setImage(files)
        }
    ], []);

    const commands = useMemo<CommandAttributes>(() => ({
        submit: { label: 'Crear' },
        reset: { label: 'Cancelar',  }
    }), []);

    const handleClose = () => {
        formMethods.reset();
        onClose();
    }

    const handleCreate: SubmitHandler<SpecialtyCreateValues> = async (data) => {
        const idToast = toast.loading('Cargando imagen', getToastConfig());

        if (image[0].size > MAX_FILE_SIZE) {
            toast.update(idToast, {
                render: 'El archivo excede el tamaño máximo permitido de 5MB',
                ...getToastUpdateConfig('warning')
            });
        }

        try {
            const file: FileCreate = { directory: 'system', file: image[0] };
            const imageCreated = await createFile(file, session.accessToken);

            toast.update(idToast, { render: 'Creando especialidad' });

            try {
                const specialty: SpecialtyCreate = {
                    ...data, image: imageCreated.pathname
                };
                await createSpecialty(specialty, session.accessToken);

                handleClose();
                toast.update(idToast, {
                    render: `La especialidad ha sido creado`,
                    ...getToastUpdateConfig('success', { delay: 200 })
                });
                router.replace(router.asPath);
            } catch (error) {
                toast.update(idToast, {
                    render: error.message ?? 'La especialidad no pudo crearse',
                    ...getToastUpdateConfig('error')
                });
            }
        } catch (error) {
            toast.update(idToast, {
                render: error.message,
                ...getToastUpdateConfig('error')
            });
            return;
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            close={handleClose}
            contentLabel='Modal para crear especialidades'
        >
            <h1 className={styles.title}>
                Crear Especialidad
            </h1>
            <FormProvider<SpecialtyCreateValues> {...formMethods}>
                <Form<SpecialtyCreateValues>
                    data={data}
                    commands={commands}
                    onSubmit={handleCreate}
                    onReset={onClose}
                />
            </FormProvider>
        </Modal>
    )
}

export default CreateFormModal;