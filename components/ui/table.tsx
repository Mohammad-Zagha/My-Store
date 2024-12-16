import * as React from 'react'

import { cn } from '@/lib/utils'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
   ({ className, ...props }, ref) => (
      <div className="relative w-full overflow-auto">
         {/* Apply border spacing and table layout to manage spacing and round the table */}
         <table
            ref={ref}
            className={cn('w-full caption-bottom text-sm border-separate border-spacing-y-1', className)} // Adds vertical spacing between rows
            {...props}
         />
      </div>
   ),
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
   ({ className, ...props }, ref) => (
      <thead ref={ref} className={cn('[&_tr]:border-b ', 'mb-2  ', className)} {...props} />
   ),
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
   ({ className, ...props }, ref) => (
      <tbody
         ref={ref}
         className={cn('[&_tr:last-child]:border-0 [&_tr]:mb-2 ', className)} // Adds margin-bottom to rows
         {...props}
      />
   ),
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
   ({ className, ...props }, ref) => (
      <tfoot
         ref={ref}
         className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)}
         {...props}
      />
   ),
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
   ({ className, ...props }, ref) => (
      <tr
         ref={ref}
         className={cn(
            'border-b transition-colors rounded-xl', // Keeps the existing border and transition styles
            'data-[state=selected]:bg-gray-50 min-w-fit', // Maintains existing styles for the selected state
            className,
         )}
         {...props}
      />
   ),
)

TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
   ({ className, ...props }, ref) => (
      <th
         ref={ref}
         className={cn(
            'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 first:rounded-br-2xl last:rounded-bl-2xl first:rounded-tr-2xl last:rounded-tl-2xl min-w-fit whitespace-nowrap', // Rounds the left and right corners of the header
            className,
         )}
         {...props}
      />
   ),
)
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
   ({ className, ...props }, ref) => (
      <td
         ref={ref}
         className={cn(
            'p-2 align-middle [&:has([role=checkbox])]:pr-0   min-w-fit', // Rounds the bottom corners of the cells in the last row
            className,
         )}
         {...props}
      />
   ),
)
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
   ({ className, ...props }, ref) => (
      <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground min-w-fit', className)} {...props} />
   ),
)
TableCaption.displayName = 'TableCaption'

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
