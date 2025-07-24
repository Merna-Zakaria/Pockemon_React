"use client"

import { useState } from "react"
import { Link } from 'react-router-dom'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Pokemon } from "@/types/pokemon"

interface PokemonCardProps {
  pokemon: Pokemon
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false)

  const imageUrl =
    pokemon.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon.sprites?.front_default ||
    "/placeholder.svg?height=150&width=150"

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden">
        <CardContent className="p-4">
          <div className="aspect-square relative mb-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
            {!imageError ? (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={pokemon.name}
                // fill
                className="object-contain p-2 group-hover:scale-110 transition-transform duration-200"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <span className="text-4xl">?</span>
              </div>
            )}
          </div>

          <div className="text-center space-y-2">
            <h3 className="font-semibold text-gray-900 capitalize text-lg">{pokemon.name}</h3>

            <p className="text-sm text-gray-500">#{pokemon.id.toString().padStart(3, "0")}</p>

            {pokemon.types && (
              <div className="flex justify-center gap-1 flex-wrap">
                {pokemon.types.map((type) => (
                  <Badge key={type.type.name} variant="secondary" className="text-xs capitalize">
                    {type.type.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
