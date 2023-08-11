import { Skeleton } from "../ui/skeleton"

const TableLoading = () => {
  return (
    <div className="">
      <div className="mb-3 flex gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Skeleton className="h-96 w-full" />
    </div>
  )
}

export default TableLoading
