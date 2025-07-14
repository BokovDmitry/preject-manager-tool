import "../Styles/ConfirmationModal.scss"

interface ConfirmationModalDetails {
    onClose : () => void;
    onAction : () => void;
    text : string;
    color : string; 
    action : string
}

export default function ConfirmationModal({onClose, onAction, text, color, action} : ConfirmationModalDetails) {
    return(
        <div className="confirmation-modal-container">
            <p className="confirmation-modal-text">{text}</p>
            <div className="confirmation-modal-buttons-container">
                <button className="confirmation-modal-button" onClick={onClose}>Close</button>
                <button 
                        className="confirmation-modal-button" 
                        onClick={onAction}
                        style={{ backgroundColor : color, borderColor : color, color: "white" }}>
                    {action}
                </button>
            </div>
        </div>
    )
} 