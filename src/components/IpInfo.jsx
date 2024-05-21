import React from 'react';
import './TableStyle.css';
import './IpInfoStyle.css';

const Modal = ({ onClose, ip }) => {
    return (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">IP: {ip.query}</h5>
                        <span className="server-text"></span>
                        <button type="button" className="remove-button" onClick={onClose} aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Location: <br />
                            Country: {ip.country} <br />
                            City: {ip.city} <br />
                            Region name: {ip.regionName} <br /> <br />
                            Traffic: <br />
                            Name: {ip.trafficName}
                        </p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
