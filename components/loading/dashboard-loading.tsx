import { Skeleton } from "../ui/skeleton"

const DashboardLoading = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-1">
          <Skeleton className="h-40 w-full" />
        </div>
        <div className="p-1">
          <Skeleton className="h-40 w-full" />
        </div>
        <div className="p-1">
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
        <div className="p-1">
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="p-1">
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    </div>
  )
}

export default DashboardLoading
