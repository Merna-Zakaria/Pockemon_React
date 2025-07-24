import type { PokemonListResponse, PokemonDetail } from "@/types/pokemon"

const BASE_URL = "https://pokeapi.co/api/v2"

export async function fetchPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon list: ${response.statusText}`)
  }

  return response.json()
}

export async function fetchPokemonDetail(idOrName: string | number): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${idOrName}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon detail: ${response.statusText}`)
  }

  return response.json()
}
