import React from 'react';

const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Confirm Delete</h2>
                <p>Are you sure you want to delete this product?</p>
                <button onClick={onConfirm} className="confirm-button">Yes</button>
                <button onClick={onClose} className="cancel-button">No</button>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
