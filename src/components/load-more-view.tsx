"use client"

import { useEffect, useState } from "react"
import { PokemonCard } from "./pokemon-card"
import { LoadingGrid } from "./loading-grid"
import { ErrorState } from "./error-state"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import type { Pokemon } from "@/types/pokemon"
import { fetchPokemonList, fetchPokemonDetail } from "@/lib/api"

const ITEMS_PER_LOAD = 20

export function LoadMoreView() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    loadInitialPokemon()
  }, [])

  const loadInitialPokemon = async () => {
    try {
      setLoading(true)
      setError(null)

      const listResponse = await fetchPokemonList(ITEMS_PER_LOAD, 0)

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
      setOffset(ITEMS_PER_LOAD)
      setHasMore(listResponse.next !== null)
    } catch (err) {
      setError("Failed to load Pokémon. Please try again.")
      console.error("Error fetching Pokemon list:", err)
    } finally {
      setLoading(false)
    }
  }

  const loadMorePokemon = async () => {
    if (loadingMore || !hasMore) return

    try {
      setLoadingMore(true)
      setError(null)

      const listResponse = await fetchPokemonList(ITEMS_PER_LOAD, offset)

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

      // Avoid duplicates by filtering out Pokemon that already exist
      const existingIds = new Set(pokemon.map((p) => p.id))
      const newPokemon = detailedPokemon.filter((p) => !existingIds.has(p.id))

      setPokemon((prev) => [...prev, ...newPokemon])
      setOffset((prev) => prev + ITEMS_PER_LOAD)
      setHasMore(listResponse.next !== null)
    } catch (err) {
      setError("Failed to load more Pokémon. Please try again.")
      console.error("Error fetching more Pokemon:", err)
    } finally {
      setLoadingMore(false)
    }
  }

  const handleRetry = () => {
    if (pokemon.length === 0) {
      loadInitialPokemon()
    } else {
      loadMorePokemon()
    }
  }

  if (loading) {
    return <LoadingGrid />
  }

  if (error && pokemon.length === 0) {
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

      {/* Load More Button */}
      <div className="flex flex-col items-center gap-4">
        {error && <p className="text-red-600 text-center">{error}</p>}

        {hasMore ? (
          <Button onClick={loadMorePokemon} disabled={loadingMore} size="lg" className="px-8">
            {loadingMore ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading More...
              </>
            ) : (
              "Load More Pokémon"
            )}
          </Button>
        ) : (
          <p className="text-gray-600 text-center">You've seen all {pokemon.length} Pokémon!</p>
        )}
      </div>
    </div>
  )
}
