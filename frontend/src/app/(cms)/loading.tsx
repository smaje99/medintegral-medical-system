import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading(): React.JSX.Element {
  return (
    <div className='m-4 space-y-2'>
      <Skeleton className="w-full h-9" />
      <Separator />
      <Skeleton className="w-full h-32" />
    </div>
  )
}
