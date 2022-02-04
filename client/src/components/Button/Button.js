import { COLORS, FONTSIZE } from "../../constants"

export default function Button({name, bc, p, tc, width, margin}) {
    const { primary } = COLORS
    const { px18 } = FONTSIZE

    return(
        <button 
            style={{
                backgroundColor: bc ?? primary,
                outline: 0,
                border: 0,
                borderRadius: '5px',
                padding: p ?? '1rem',
                color: '#ffffff' ?? tc,
                fontSize: px18,
                width: width ?? '100%',
                margin: margin ?? 0,
                cursor: 'pointer'
            }}
        >
            {name}
        </button>
    )
}