interface buttonProps {
    text : string,
    action : () => void
}

export default function Button({text, action} : buttonProps) {
    return (
        <div className="button" onClick={action}>
            {text}
        </div>
    )
}