const Notification = ({ message }) => {
    if (message.includes(`Error`)) {
        return (
            <div className="error">
                {message}
            </div>
        )
    } else if (message.includes(`Añadido`)) {
        return (
            <div className="added">
                {message}
            </div>
        )
    } else {
        return null
    }
}
export default Notification