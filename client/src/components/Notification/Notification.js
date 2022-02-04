import styles from './Notification.module.css'

export default function Notification({ message, setMessage }) {
    if(message) {
        setTimeout(() => {
            setMessage('')
        }, 5000)
    }

    return(
        <div className={styles.container} style={{display: message ? 'block' : 'none', position: 'absolute', zIndex: 6, top: '4rem', backgroundColor: '#c3b190', color: '#000000', padding: '.5rem 1rem', maxWidth: '400px', wordWrap: 'break-word', borderRadius: '6px'}}>
            {message}
        </div>
    )
}