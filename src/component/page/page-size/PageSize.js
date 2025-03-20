import s from '../Page.css'

export default function PageSize({ value, min, max, onChange }) {
	function handleScaleChange(operation) {
		const updatedValue = operation === 'addition' ? value + 4 : value - 4
		onChange(updatedValue)
	}

	return (
		<div className={s['scope-button']}>
			<button
				className={s['decrease']}
				onClick={() => handleScaleChange('subtraction')}
				disabled={value === min}
				style={value === min ? { pointerEvents: 'none', opacity: '0.5' } : {}}
			>
				−
			</button>
			<button
				className={s['increase']}
				onClick={() => handleScaleChange('addition')}
				disabled={value >= max}
				style={value >= max ? { pointerEvents: 'none', opacity: '0.5' } : {}}
			>
				+
			</button>
		</div>
	)
}
