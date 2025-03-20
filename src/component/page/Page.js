import { useState, useEffect } from 'react'
import s from './Page.css'
import PageSize from './page-size/PageSize'
import PageNumber from './page-number/PageNumber'
import Gallery from '../gallery/Gallery'
import fetchPokemons from '../../api/api'

export default function Page() {
	const [caught, setCaught] = useState([])
	const [pokemonList, setPokemonList] = useState([])
	const [status, setStatus] = useState('idle') // "idle" | "loading" | "success" | "failure"
	const [page, setPage] = useState(1)
	const [pokemonsOnPageAmount, setPokemonsOnPageAmount] = useState(8)
	const [pokemonsAmount, setPokemonsAmount] = useState(0)

	useEffect(() => {
		async function getPokemonData() {
			setStatus('loading')
			try {
				const pokemons = await fetchPokemons(page, pokemonsOnPageAmount)
				setPokemonList(pokemons.results)
				setPokemonsAmount(pokemons.count)
				setStatus('success')
			} catch (e) {
				setStatus('failure')
			}
		}
		getPokemonData(page, pokemonsOnPageAmount);
	}, [page, pokemonsOnPageAmount]);


	function togglePokemon(id) {
		new Promise(r => setTimeout(r, 500)).then(() => {
			setCaught(prev =>
				prev.includes(id)
					? prev.filter(currentId => currentId !== id)
					: [...prev, id]
			)
		})
	}

	// async function handleInitialClick() {
	// 	await getPokemonData(page, pokemonsOnPageAmount)
	//  }

	// if (status === 'idle') {
	// 	return (
	// 		<div>
	// 			{ <button
	// 				className={s['upload-button']}
	// 				onClick={handleInitialClick}
	// 				disabled={status === 'loading'}
	// 			>
	// 				Загрузить покемонов
	// 			</button> }
	// 			{status === 'failure' && <p>Ошибка при загрузке</p>}
	// 		</div>
	// 	)
	// }

	if (status === 'failure') {
		return <p>Ошибка при загрузке</p>
	}

	return (
		<>
			<PageSize
				value={pokemonsOnPageAmount}
				min={4}
				max={pokemonsAmount}
				onChange={setPokemonsOnPageAmount}
			/>
			<h1 className={s.title}>Поймано покемонов</h1>
			<p>стр. {page}, покемонов на стр. {pokemonsOnPageAmount}</p>
			<span className={s.counter}>
				{caught.length}/{pokemonsAmount}
			</span>
			<div className={s['gallery-container']}>
				<PageNumber
					onChange={setPage}
					page={page}
					lastPage={Math.ceil(pokemonsAmount / pokemonsOnPageAmount)}
				>
					<Gallery
						caught={caught}
						togglePokemon={togglePokemon}
						pokemonList={pokemonList}
					/>
				</PageNumber>
			</div>
		</>
	)
}
