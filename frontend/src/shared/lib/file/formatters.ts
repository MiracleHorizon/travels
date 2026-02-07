const KILOBYTE = 1024
const FILE_SIZES = ['Bytes', 'KB', 'MB', 'GB'] as const

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return '0 Bytes'
  }

  const index = Math.floor(Math.log(bytes) / Math.log(KILOBYTE))
  const sizeLabel = FILE_SIZES[index]
  const sizeValue = Math.round((bytes / Math.pow(KILOBYTE, index)) * 100) / 100

  return `${sizeValue} ${sizeLabel}`
}
