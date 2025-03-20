
import Pokemon from '../pokemon/Pokemon'
import s from './Gallery.css'

export default function Gallery({ caught, togglePokemon, pokemonList }) {

	const pokemonCardsList = pokemonList.map(pokemon => (
		<Pokemon
			name={pokemon.name}
			id={pokemon.id}
			caught={caught}
			togglePokemon={togglePokemon}
		/>
	))

	return <ul className={s['pokemon-gallery']}>{pokemonCardsList}</ul>
}
