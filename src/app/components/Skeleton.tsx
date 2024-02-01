import { Skeleton } from "@/app/components/ui/skeleton"

export default function SkeletonCard ()  {
  return (
    <div className="flex relative flex-col space-y-3">
      <Skeleton className="h-[125px] w-[500px] rounded-xl" />
    </div>
  )
}
