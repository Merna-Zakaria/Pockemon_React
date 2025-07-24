
import { useState } from "react"
import { PaginationView } from "@/components/pagination-view"
import { LoadMoreView } from "@/components/load-more-view"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"pagination" | "loadmore">("pagination")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Pokémon Browser</h1>
          <p className="text-gray-600 mb-6">Discover and explore your favorite Pokémon</p>

          {/* View Mode Toggle */}
          <div className="flex justify-center gap-2 mb-8">
            <Button
              variant={viewMode === "pagination" ? "default" : "outline"}
              onClick={() => setViewMode("pagination")}
              className="px-6"
            >
              Pagination View
            </Button>
            <Button
              variant={viewMode === "loadmore" ? "default" : "outline"}
              onClick={() => setViewMode("loadmore")}
              className="px-6"
            >
              Load More View
            </Button>
          </div>
        </header>

        {/* Render the selected view */}
        {viewMode === "pagination" ? <PaginationView /> : <LoadMoreView />}
      </div>
    </div>
  )
}
