'use client'

import { cn, isImage } from '@/lib/utils'
import { Camera, Download, Trash2, Upload, X } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FcFile } from 'react-icons/fc'
import { Button, buttonVariants } from '../chadcn/button'

type TDnd = {
   className?: string
   file: File | null | string
   setFile: (file: File | null) => void
   fileType?: 'image' | 'attachment'
}

const getFileName = (file: File | string | null, fileType: 'image' | 'attachment') => {
   if (file instanceof File) return file.name
   return fileType === 'image' ? 'Image' : 'Attachment'
}

const getImageSrc = (file: File | string | null) => {
   if (file instanceof File) return URL.createObjectURL(file)
   return file
}

const FilePreview: React.FC<{
   file: File | string | null
   fileType: 'image' | 'attachment'
   removeFile: () => void
}> = ({ file, fileType, removeFile }) => (
   <div className="col-span-8 flex">
      {file ? (
         <div className="h-full w-full flex items-center justify-between gap-1 pr-2">
            <div className={cn('bg-primary-dark h-full aspect-square center')}>
               <FcFile className="size-7" />
            </div>
            <p
               title={getFileName(file, fileType)}
               className="text-sm text-secondary font-500 w-[20rem] flex-1 max-w-full truncate"
            >
               {getFileName(file, fileType)}
            </p>
            <div className="size-6 center border border-red-500 circle pointer" onClick={removeFile}>
               <X size={16} className="text-red-500" />
            </div>
         </div>
      ) : (
         <p className="pl-1r h-full text-sm text-muted-foreground flex items-center">Drop the file here</p>
      )}
   </div>
)

const ImagePreview = React.memo<{ file: File | string | null; fileType: string }>(
   ({ file, fileType }) =>
      file !== null &&
      fileType === 'image' &&
      ((file instanceof File && isImage(file)) || typeof file === 'string') && (
         <div className="p-3">
            <div className="rounded-lg overflow-hidden h-[15rem] center">
               <Image
                  loading="lazy"
                  src={getImageSrc(file)!}
                  {...(file instanceof File ? { onLoad: () => URL.revokeObjectURL(URL.createObjectURL(file)) } : {})}
                  alt={getFileName(file, fileType)}
                  width={300}
                  height={300}
                  className="object-contain h-full !max-h-full w-auto rounded-lg shadow"
               />
            </div>
         </div>
      ),
)

const DragAndDrop: React.FC<TDnd> = React.forwardRef<HTMLInputElement, TDnd>(
   ({ className, file, setFile, fileType = 'attachment' }, ref) => {
      const onDrop = useCallback((acceptedFiles: File[]) => setFile(acceptedFiles[0]), [setFile])
      const removeFile = () => setFile(null)
      const { getRootProps, getInputProps, isDragActive } = useDropzone({
         onDrop,
         multiple: false,
         maxFiles: 1,
         onFileDialogCancel: removeFile,
      })

      return (
         <div className="flex flex-col gap-1.5" {...getRootProps()}>
            <input type="file" ref={ref} {...getInputProps()} />
            <div
               className={cn(
                  'border-2 border-dotted border-gray-200 rounded-xl overflow-hidden flex flex-col box-border',
                  isDragActive && 'border-primary-dark',
                  className,
               )}
            >
               <div className={cn('grid grid-cols-12 h-[44px]', file instanceof File && isImage(file) && 'border-b')}>
                  <FilePreview file={file} fileType={fileType} removeFile={removeFile} />
                  <label className={cn(buttonVariants(), 'col-span-4 text-xs h-full gap-1.5 !rounded-none')}>
                     <span>Browse Files</span>
                     <Download className="size-4 shrink-0" />
                  </label>
               </div>
               <ImagePreview file={file} fileType={fileType} />
            </div>
         </div>
      )
   },
)

DragAndDrop.displayName = 'DND'

type TDndImage = {
   className?: string
   imageContainerClassName?: string
   innerContainerClassName?: string
   file: File | null | string
   setFile: (file: File | null) => void
   size?: number
   width?: number
   height?: number
}

export const DragAndDropImage = React.forwardRef<HTMLInputElement, TDndImage>(
   ({ className, imageContainerClassName, file, setFile, size = 224, width, height }: TDndImage, ref) => {
      const onDrop = useCallback(
         (acceptedFiles: File[]) => {
            if (acceptedFiles[0]) setFile(acceptedFiles[0])
         },
         [setFile],
      )

      const removeFile = (e: React.MouseEvent) => {
         e.stopPropagation() // Prevent triggering the drag-and-drop input
         setFile(null) // Propagate null to parent for removal
      }

      const { getRootProps, getInputProps, isDragActive } = useDropzone({
         onDrop,
         multiple: false,
         maxFiles: 1,
         accept: {
            'image/*': [], // accept all image files
         },
      })

      return (
         <div
            className={cn('w-fit inline-flex items-center justify-center flex-col gap-1r pointer', className)}
            {...getRootProps()}
         >
            <input type="file" ref={ref} {...getInputProps()} />
            <div
               style={{ width: '100%', height: height || size }}
               className={cn(
                  'group relative border bg-gray-200 border-primary-dark center p-1 rounded-full overflow-hidden',
                  isDragActive && 'border-2 border-dashed border-primary-dark',
                  imageContainerClassName,
               )}
            >
               {file ? (
                  <Image
                     loading="lazy"
                     src={getImageSrc(file)!}
                     {...(file instanceof File ? { onLoad: () => URL.revokeObjectURL(URL.createObjectURL(file)) } : {})}
                     alt={getFileName(file, 'image')}
                     width={width || size}
                     height={height || size}
                     className="object-cover w-full h-full"
                  />
               ) : (
                  <Upload className="size-7 text-muted-foreground" />
               )}
               {file && (
                  <div className="z-50 absolute inset-1 opacity-0 pointer-events-none group-hover:opacity-100 transition-all group-hover:pointer-events-auto center circle">
                     <Button variant={'destructive'} onClick={removeFile} size={'icon'}>
                        <Trash2 className="size-4" />
                     </Button>
                  </div>
               )}
            </div>
         </div>
      )
   },
)

DragAndDropImage.displayName = 'DNDImage'

export default DragAndDrop
