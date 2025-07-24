import { useEffect, useState } from "react"
import { PokemonCard } from "./pokemon-card"
import { PaginationControls } from "./pagination-controls"
import { LoadingGrid } from "./loading-grid"
import { ErrorState } from "./error-state"
import type { Pokemon } from "@/types/pokemon"
import { fetchPokemonList, fetchPokemonDetail } from "@/lib/api"

const ITEMS_PER_PAGE = 20

export function PaginationView() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  useEffect(() => {
    loadPokemonPage(currentPage)
  }, [currentPage])

  const loadPokemonPage = async (page: number) => {
    try {
      setLoading(true)
      setError(null)

      const offset = (page - 1) * ITEMS_PER_PAGE
      const listResponse = await fetchPokemonList(ITEMS_PER_PAGE, offset)

      // Fetch detailed data for each Pokemon
      const detailedPokemon = await Promise.all(
        listResponse.results.map(async (pokemon) => {
          const id = pokemon.url.split("/").slice(-2, -1)[0]
          const detail = await fetchPokemonDetail(id)
          return {
            id: detail.id,
            name: detail.name,
            url: pokemon.url,
            sprites: detail.sprites,
            types: detail.types,
          }
        }),
      )

      setPokemon(detailedPokemon)
      setTotalCount(listResponse.count)
    } catch (err) {
      setError("Failed to load Pokémon. Please try again.")
      console.error("Error fetching Pokemon list:", err)
    } finally {
      setLoading(false)
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleRetry = () => {
    loadPokemonPage(currentPage)
  }

  if (loading) {
    return <LoadingGrid />
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRetry} />
  }

  return (
    <div className="space-y-8">
      {/* Pokemon Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {pokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      {/* Pagination Controls */}
      <PaginationControls currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
