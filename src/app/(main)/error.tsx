'use client'

import { useEffect } from 'react'
import Button from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card className="max-w-md">
        <CardContent className="p-6 text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="text-xl font-bold">Something went wrong!</h2>
          <p className="text-muted">
            {error.message || "An unexpected error occurred"}
          </p>
          <Button onClick={reset}>
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}