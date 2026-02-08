import type { DropzoneState } from 'react-dropzone'
import { Upload } from 'lucide-react'
import { cn } from '@/shared/lib'
import { ReactNode } from 'react'

interface FileDropzoneProps extends Pick<
  DropzoneState,
  'getRootProps' | 'getInputProps' | 'isDragActive'
> {
  dragLabel?: ReactNode
  selectLabel?: ReactNode
  hint?: string
  inputId?: string
}

export const FileDropzone = ({
  getRootProps,
  getInputProps,
  isDragActive,
  dragLabel = 'Перетащите файл или',
  selectLabel = 'выберите файл',
  hint,
  inputId = 'file'
}: FileDropzoneProps) => {
  const { className: rootClassName, ...rootProps } = getRootProps()

  return (
    <div
      {...rootProps}
      className={cn(
        'flex justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors duration-200 cursor-pointer',
        isDragActive
          ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
          : 'border-border hover:border-primary/50',
        rootClassName
      )}
    >
      <div className='text-center'>
        <Upload className='mx-auto h-12 w-12 text-muted-foreground/80' aria-hidden={true} />
        <div className='mt-4 flex flex-wrap justify-center gap-1 text-sm text-muted-foreground'>
          <span>{dragLabel}</span>
          <label
            htmlFor={inputId}
            className='relative cursor-pointer font-medium text-primary hover:text-primary/80 hover:underline hover:underline-offset-4'
          >
            <span>{selectLabel}</span>
            <input {...getInputProps()} id={inputId} type='file' className='sr-only' />
          </label>
        </div>
        {hint && <p className='mt-2 text-xs text-muted-foreground'>{hint}</p>}
      </div>
    </div>
  )
}
