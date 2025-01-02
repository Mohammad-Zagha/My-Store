import CustomAvatar from '@/components/ui/ImageHandler'
import { T_Category } from '@/types/objects'
import CategoryEditDialog from '../CategoryEditDialog'
import EditBannerDialog from '../BannerEditDialog'

export function CategoryCard({ category }: { category: T_Category }) {
   if (!category) return null
   return (
      <div className="h-[380px] w-full rounded-lg shadow-card flex flex-col justify-between  relative">
         <CustomAvatar
            src={(category?.image as string) ?? ''}
            alt={category.name}
            className="w-full !rounded-lg h-[200px] "
         />
         <div className="w-full h-full p-2 mt-10 flex flex-col gap-2">
            <span className="font-Cairo text-sm font-semibold text-primary-dark">{category.name}</span>
            <span className="font-Cairo text-xs text-primary-dark/70 line-clamp-2   ">{category.description}</span>
         </div>
         <div className="flex justify-between items-center p-2">
            <CategoryEditDialog category={category} />
            <EditBannerDialog category={category} />
         </div>
      </div>
   )
}
