import classNames from 'classnames'
import s from './Pokemon.css'

export default function Pokemon({ name, id, caught, togglePokemon }) {
	const isCaught = caught.includes(id)

	function handleClick() {
		togglePokemon(id);
	}

	return (
		<li
			key={id}
			className={
				classNames(s['pokemon-card'], isCaught && s['pokemon-card-caught'])	
			}
		>
			<span>{name} #{id}</span> 
			<img
				src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
			/>
			<button className={s.button} onClick={handleClick}>
				{isCaught ? 'Отпустить' : 'Поймать'}
			</button>
		</li>
	)
}
