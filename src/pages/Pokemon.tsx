import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Loader2 } from "lucide-react"
import type { PokemonDetail } from "@/types/pokemon"
import { fetchPokemonDetail } from "@/lib/api"

export default function PokemonDetailPage() {
  const params = useParams()
  const router = useNavigate()
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const pokemonId = params.id as string

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPokemonDetail(pokemonId)
        setPokemon(data)
      } catch (err) {
        setError("Failed to load Pokémon details. Please try again.")
        console.error("Error fetching Pokemon detail:", err)
      } finally {
        setLoading(false)
      }
    }

    if (pokemonId) {
      loadPokemon()
    }
  }, [pokemonId])

  const handleRetry = () => {
    const loadPokemon = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchPokemonDetail(pokemonId)
        setPokemon(data)
      } catch (err) {
        setError("Failed to load Pokémon details. Please try again.")
        console.error("Error fetching Pokemon detail:", err)
      } finally {
        setLoading(false)
      }
    }
    loadPokemon()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router(-1)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
              <p className="text-gray-600">Loading Pokémon details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router(-1)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="p-8 text-center max-w-md">
              <CardContent>
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={handleRetry}>Try Again</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (!pokemon) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => router(-1)} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex items-center justify-center min-h-[400px]">
            <Card className="p-8 text-center max-w-md">
              <CardContent>
                <p className="text-gray-600">Pokémon not found</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => router(-1)} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="relative w-48 h-48 mx-auto mb-4">
                      <img
                        src={
                          pokemon.sprites.other?.["official-artwork"]?.front_default ||
                          pokemon.sprites.front_default ||
                          "/placeholder.svg?height=192&width=192"
                        }
                        alt={pokemon.name}
                        // fill
                        className="object-contain"
                      />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 capitalize mb-2">{pokemon.name}</h1>
                    <p className="text-gray-600">#{pokemon.id.toString().padStart(3, "0")}</p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-8">
                  <div className="space-y-6">
                    {/* Types */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Types</h3>
                      <div className="flex gap-2">
                        {pokemon.types.map((type) => (
                          <Badge key={type.type.name} variant="secondary" className="capitalize px-3 py-1">
                            {type.type.name}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Physical Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Height</h4>
                        <p className="text-2xl font-bold text-blue-600">{(pokemon.height / 10).toFixed(1)}m</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="text-sm font-medium text-gray-600 mb-1">Weight</h4>
                        <p className="text-2xl font-bold text-green-600">{(pokemon.weight / 10).toFixed(1)}kg</p>
                      </div>
                    </div>

                    {/* Base Stats */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Base Stats</h3>
                      <div className="space-y-3">
                        {pokemon.stats.map((stat) => (
                          <div key={stat.stat.name}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-gray-600 capitalize">
                                {stat.stat.name.replace("-", " ")}
                              </span>
                              <span className="text-sm font-bold text-gray-900">{stat.base_stat}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${Math.min((stat.base_stat / 150) * 100, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Abilities */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Abilities</h3>
                      <div className="flex flex-wrap gap-2">
                        {pokemon.abilities.map((ability) => (
                          <Badge key={ability.ability.name} variant="outline" className="capitalize">
                            {ability.ability.name.replace("-", " ")}
                            {ability.is_hidden && " (Hidden)"}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
