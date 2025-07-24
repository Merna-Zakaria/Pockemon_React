import { Card, CardContent } from "@/components/ui/card"

export function LoadingGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 20 }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="aspect-square bg-gray-200 rounded-lg mb-3 animate-pulse" />
            <div className="space-y-2">
              <div className="h-5 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-16 mx-auto animate-pulse" />
              <div className="flex justify-center gap-1">
                <div className="h-5 bg-gray-200 rounded w-12 animate-pulse" />
                <div className="h-5 bg-gray-200 rounded w-12 animate-pulse" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
