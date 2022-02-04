import { FONTSIZE } from "../../constants"

export default function Input({type, id, name, value, placeholder, onChange, p, br, bc, width, change}) {
    const { px18 } = FONTSIZE

    return(
        <input 
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
                padding: p ?? '.8rem 1rem',
                borderRadius: br ?? '6px',
                backgroundColor: bc ?? '#ffffff',
                width: '100%',
                outline: 0,
                border: '1px solid #808082',
                fontSize: px18
            }}
            onChange={onChange}
        />
    )
}