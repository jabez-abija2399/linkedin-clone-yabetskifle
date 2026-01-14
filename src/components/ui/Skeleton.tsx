export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

export function PostSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-border p-4 space-y-3">
      {/* Header */}
      <div className="flex gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      
      {/* Content */}
      <div className="space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
      
      {/* Actions */}
      <div className="flex gap-4 pt-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header Card */}
      <div className="bg-white rounded-lg border border-border overflow-hidden">
        <Skeleton className="h-32 w-full" />
        <div className="p-6 pt-20">
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-5 w-64 mb-4" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      
      {/* Posts */}
      <div className="space-y-4">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </div>
  );
}