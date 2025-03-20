export default async function fetchPokemons(page, amount) {
	const response = await fetch(
		`https://pokeapi.co/api/v2/pokemon/?offset=${(page-1)*amount}&limit=${amount}`
	)
	if (!response.ok) {
		throw new Error('response is not ok')
	}
	const data = await response.json()

	return {count: data.count, results: data.results.map(obj => {
		return {
			name: obj.name,
			id: obj.url.slice(34, -1),
		}
	})}
}
