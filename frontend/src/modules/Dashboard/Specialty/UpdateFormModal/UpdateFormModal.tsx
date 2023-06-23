import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type CommandAttributes, type FieldAttributes, Form } from '@/components/Form';
import { Modal } from '@/components/Modal';
import getToastConfig, { getToastUpdateConfig } from '@/helpers/toast.config';
import { createFile } from '@/services/files.service';
import { updateSpecialty } from '@/services/specialty.service';
import type { FileCreate, FileModel } from '@/types/file.model';
import type { Specialty, SpecialtyUpdate } from '@/types/medical/specialty.model';

import styles from './UpdateFormModal.module.scss';

type Props = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly specialty: Specialty;
};

type SpecialtyUpdateValues = SpecialtyUpdate;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const UpdateFormModal: React.FC<Props> = ({ isOpen, onClose, specialty }) => {
  const [image, setImage] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string | undefined>(null);

  const router = useRouter();
  const { data: session } = useSession();
  const formMethods = useForm<SpecialtyUpdateValues>({ defaultValues: specialty });

  const handleImageSelect = (files: File[]) => {
    setImage(files);

    // Read the image file and convert it to a data URL
    if (files.length) {
      const file = files[0];
      const blob = new Blob([file], { type: file.type });
      const reader = new FileReader();
      reader.onloadend = () => setImageUrl(reader.result.toString());
      reader.readAsDataURL(blob);
    } else {
      setImageUrl(null);
    }
  };

  const data = useMemo<FieldAttributes<SpecialtyUpdateValues>[]>(
    () => [
      {
        type: 'text',
        name: 'name',
        label: 'Nombre',
      },
      {
        type: 'textarea',
        name: 'description',
        label: 'Descripción',
      },
      {
        type: 'file',
        name: 'image',
        label: 'Imagen',
        accept: 'image/*',
        onFileChange: handleImageSelect,
        image: {
          src: imageUrl ?? specialty.image,
          alt: 'Imagen actual de la especialidad',
          width: 370,
          height: 200,
        },
      },
    ],
    [imageUrl, specialty]
  );

  const commands = useMemo<CommandAttributes>(
    () => ({
      submit: { label: 'Actualizar' },
      reset: { label: 'Cancelar' },
    }),
    []
  );

  const handleClose = () => {
    setImage([]);
    setImageUrl(null);
    formMethods.reset();
    onClose();
  };

  const handleUpdate: SubmitHandler<SpecialtyUpdateValues> = async (formData) => {
    const idToast = toast.loading('Actualizando especialidad', getToastConfig());
    let imageCreated: FileModel | undefined = null;

    // Update image
    if (imageUrl) {
      if (image[0].size > MAX_FILE_SIZE) {
        toast.update(idToast, {
          render: 'El archivo excede el tamaño máximo permitido de 5MB',
          ...getToastUpdateConfig('warning'),
        });
      }

      toast.update(idToast, { render: 'Subiendo imagen' });

      try {
        const file: FileCreate = { directory: 'system', file: image[0] };
        imageCreated = await createFile(file, session.accessToken);

        toast.update(idToast, { render: 'Actualizando especialidad' });
      } catch (error) {
        toast.update(idToast, {
          render: error.message ?? 'La imagen no fue subida',
          ...getToastUpdateConfig('error'),
        });
        return;
      }
    }

    // Update the specialty
    try {
      const specialtyToUpdate: SpecialtyUpdate = {
        ...formData,
        image: imageCreated?.pathname,
      };
      await updateSpecialty(specialty.id, specialtyToUpdate, session.accessToken);

      handleClose();
      toast.update(idToast, {
        render: 'La especialidad ha sido actualizada',
        ...getToastUpdateConfig('success', { delay: 200 }),
      });
      router.replace(router.asPath);
    } catch (error) {
      toast.update(idToast, {
        render: error.message ?? 'La especialidad no pudo ser actualizada',
        ...getToastUpdateConfig('error'),
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      contentLabel='Modal para actualizar especialidades'
    >
      <h2 className={styles.title}>Actualizar Especialidad</h2>
      <FormProvider<SpecialtyUpdateValues> {...formMethods}>
        <Form<SpecialtyUpdateValues>
          data={data}
          commands={commands}
          onSubmit={handleUpdate}
          onReset={handleClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default UpdateFormModal;
