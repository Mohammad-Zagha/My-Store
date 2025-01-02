'use client'

import * as React from 'react'
import {
   ColumnDef,
   ColumnFiltersState,
   SortingState,
   VisibilityState,
   flexRender,
   getCoreRowModel,
   getSortedRowModel,
   useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import Loop from '../common/Loop'
import { Skeleton } from './Skeletons'

type T_AssetTableProps<T> = {
   columns: ColumnDef<T>[]
   data: T[]
   renderAccordionContent?: (row: T) => React.ReactNode
   modalContent?: (row: T) => React.ReactNode
   isPending?: boolean
   onSelectRow?: (row: T) => void
   rowClassName?: string
   cellClassName?: string
   customRowClassName?: (row: T) => string
   headerClassName?: string
}

const DataTable = <T,>({
   columns,
   data,
   renderAccordionContent,
   isPending,
   rowClassName,
   cellClassName,
   headerClassName,
   onSelectRow,
   customRowClassName,
   modalContent,
}: T_AssetTableProps<T>) => {
   const [sorting, setSorting] = React.useState<SortingState>([])
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
   const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
   const [expandedRows, setExpandedRows] = React.useState<Record<number, boolean>>({})

   const table = useReactTable({
      data,
      columns,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
         sorting,
         columnFilters,
         columnVisibility,
      },
   })

   const toggleRowExpansion = (index: number) => {
      setExpandedRows((prevState) => ({
         ...prevState,
         [index]: !prevState[index],
      }))
   }

   return (
      <Table className="w-full overflow-y-auto" dir="rtl">
         <TableHeader className={cn('bg-gray-100', headerClassName)}>
            {table.getHeaderGroups().map((headerGroup) => (
               <TableRow key={headerGroup.id}>
                  <Loop
                     items={headerGroup.headers}
                     render={(header) => (
                        <TableHead key={header.id}>
                           {header.isPlaceholder ? null : (
                              <div
                                 className="flex items-center gap-2 font-semibold"
                                 onClick={header.column.getToggleSortingHandler()}
                              >
                                 {flexRender(header.column.columnDef.header, header.getContext())}
                                 {
                                    header.column.getIsSorted() ? (
                                       header.column.getIsSorted() === 'desc' ? (
                                          <ChevronDown />
                                       ) : (
                                          <ArrowUpDown />
                                       )
                                    ) : null /* Remove MoreHorizontal */
                                 }
                              </div>
                           )}
                        </TableHead>
                     )}
                  />
                  {renderAccordionContent && <TableHead />}
                  {modalContent && <TableHead />}
               </TableRow>
            ))}
         </TableHeader>
         <TableBody className="bg-transparent">
            <Loop
               loading={{
                  isLoading: !!isPending,
                  loadingSkeleton: (
                     <TableSkeleton columnsLength={renderAccordionContent ? columns.length + 1 : columns.length} />
                  ),
               }}
               items={table.getRowModel().rows}
               render={(row, index) => (
                  <React.Fragment key={index}>
                     {/* Main Table Row */}
                     <TableRow
                        className={cn(
                           'hover:bg-gray-50 cursor-pointer',
                           rowClassName,
                           customRowClassName?.(row.original),
                        )}
                        onClick={(e) => {
                           e.stopPropagation() // Prevents the row click from triggering the accordion
                           onSelectRow?.(row.original)
                        }}
                     >
                        <Loop
                           items={row.getVisibleCells()}
                           render={(cell) => (
                              <TableCell key={cell.id} className={cn('', cellClassName)}>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           )}
                        />
                        {renderAccordionContent && (
                           <TableCell
                              key={'accordion' + index}
                              className={cn('shrink-0 cursor-pointer  h-full', cellClassName)}
                              onClick={() => toggleRowExpansion(index)}
                           >
                              <div className="size-full center ">
                                 <ChevronDown
                                    className={cn(
                                       'transition-transform',
                                       expandedRows[index] ? 'rotate-180 text-primary-dark' : 'text-primary-light',
                                    )}
                                 />
                              </div>
                           </TableCell>
                        )}
                        {modalContent && (
                           <TableCell
                              key={'modal-content' + index}
                              className={cn('shrink-0 cursor-pointer h-full', cellClassName)}
                           >
                              {modalContent(row.original)}
                           </TableCell>
                        )}
                     </TableRow>

                     {/* Expanded Row with Framer Motion */}
                     {expandedRows[index] && renderAccordionContent && (
                        <TableRow>
                           <TableCell className="p-0" colSpan={columns.length + 2}>
                              {renderAccordionContent(row.original)}
                           </TableCell>
                        </TableRow>
                     )}
                  </React.Fragment>
               )}
            >
               <TableRow>
                  <TableCell
                     className="text-center py-8"
                     colSpan={renderAccordionContent ? columns.length + 1 : columns.length}
                  >
                     <h5>No results.</h5>
                  </TableCell>
               </TableRow>
            </Loop>
         </TableBody>
      </Table>
   )
}

export default DataTable

export function TableSkeleton({ columnsLength }: { columnsLength: number }) {
   return (
      <Loop
         items={Array.from({ length: 6 }, (_, i) => i + 1)}
         render={(ele) => (
            <TableRow key={ele}>
               <TableCell colSpan={columnsLength}>
                  <Skeleton className="h-[50px]" />
               </TableCell>
            </TableRow>
         )}
      />
   )
}
