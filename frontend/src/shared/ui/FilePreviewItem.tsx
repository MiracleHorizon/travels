import { Button } from './button'
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from './item'
import { TooltipComposer } from './tooltip'
import { formatFileSize } from '@/shared/lib/file'
import { Trash2 } from 'lucide-react'

interface FilePreviewItemProps {
  file: File
  previewUrl: string
  onRemove?: () => void
}

const FilePreviewItem = ({ file, previewUrl, onRemove }: FilePreviewItemProps) => (
  <Item size='sm' variant='outline' className='px-3 pt-2.5 pb-3 rounded-xl'>
    <ItemMedia className='h-14 rounded-sm overflow-hidden'>
      <img src={previewUrl} alt={file.name} className='w-full h-full object-cover' />
    </ItemMedia>

    <ItemContent>
      <ItemTitle className='truncate max-w-[250px]'>{file.name}</ItemTitle>
      <ItemDescription className='whitespace-nowrap'>{formatFileSize(file.size)}</ItemDescription>
    </ItemContent>

    {onRemove && (
      <ItemActions>
        <TooltipComposer content='Удалить фотографию'>
          <Button variant='ghost' size='icon-sm' onClick={onRemove}>
            <Trash2 />
          </Button>
        </TooltipComposer>
      </ItemActions>
    )}
  </Item>
)

export { FilePreviewItem }
