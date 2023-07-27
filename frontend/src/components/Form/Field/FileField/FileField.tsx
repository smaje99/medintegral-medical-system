import Image from 'next/future/image';
import prettyBytes from 'pretty-bytes';
import { type ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { CgTrash } from 'react-icons/cg';
import { TbCloudUpload } from 'react-icons/tb';

import type { FileFieldAttributes } from '../Field.dto';
import styles from './FileField.module.scss';

/**
 * The FileField component is added to allow users to upload files.
 *  The component supports drag and drop functionality, and it can
 *  handle multiple files. The component also displays the name and
 *  size of the uploaded files and allows users to remove them.
 */
function FileField<T>({
  name,
  type,
  multiple,
  onFileChange,
  image,
  ...props
}: FileFieldAttributes<T>): React.JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const { register } = useFormContext<T>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const onDragEnter = () => wrapperRef.current.classList.add(styles.dragover);

  const onDragLeave = () => wrapperRef.current.classList.remove(styles.dragover);

  const onDrop = () => wrapperRef.current.classList.remove(styles.dragover);

  const onFileDrop: ChangeEventHandler<HTMLInputElement> = (event) => {
    const newFiles = event.target.files;
    if (newFiles?.length > 0) {
      for (const newFile of newFiles) {
        if (files.some((file) => file.name === newFile.name)) {
          return;
        }
      }

      setFiles((currentFiles) =>
        multiple ? [...currentFiles, ...newFiles] : [newFiles[0]]
      );
    }
  };

  const onFileRemove = (file: File) => {
    const updatedList = [...files];
    updatedList.splice(files.indexOf(file), 1);
    setFiles(updatedList);
  };

  useEffect(() => onFileChange(files), [files, onFileChange]);

  useEffect(() => () => setFiles([]), []);

  return (
    <div className={styles.file}>
      {image ? <Image alt={image.alt} {...image} className={styles.image} /> : null}
      <div
        ref={wrapperRef}
        className={styles['file-wrapper']}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <label htmlFor={name} className={styles.label}>
          <TbCloudUpload aria-hidden />
          <span className={styles.text}>
            Arrastra y suelta tus archivos aquí o haz clic para navegar por tus archivos
          </span>
        </label>
        <input
          className={styles['field-file']}
          {...{ type, multiple, ...props }}
          {...register(name)}
          id={name}
          onChange={onFileDrop}
        />
      </div>
      {files?.map((file) => (
        <div
          key={file.name}
          className={styles['file-item']}
          role='contentinfo'
          aria-label='Información del archivo'
        >
          <span className={styles.name}>{file.name}</span>
          <span className={styles.size}>{prettyBytes(file.size)}</span>
          <div
            className={styles.del}
            title='Remover archivo'
            aria-label='Remover archivo'
            role='button'
            onClick={(event) => {
              event.preventDefault();
              onFileRemove(file);
            }}
          >
            <CgTrash aria-hidden />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FileField;