import { PostSkeleton } from "@/components/ui/Skeleton";
import { Card } from "@/components/ui/Card";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {/* Left Sidebar Skeleton */}
      <div className="md:col-span-3">
        <Card className="p-4 space-y-3">
          <div className="h-14 bg-gray-200 rounded animate-pulse" />
          <div className="h-20 bg-gray-200 rounded animate-pulse" />
        </Card>
      </div>

      {/* Middle Feed Skeleton */}
      <div className="md:col-span-6 space-y-4">
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </div>

      {/* Right Sidebar Skeleton */}
      <div className="hidden md:block md:col-span-3">
        <div className="h-32 bg-gray-200 rounded animate-pulse" />
      </div>
    </div>
  );
}