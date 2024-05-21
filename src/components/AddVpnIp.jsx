import React, { useState } from 'react';
import { addIP } from '../service/VpnService';
import './AddVpnIpStyle.css';
import {addServerTraffic} from '../service/ServerTrafficServer';
import { addIpWithTraffic } from '../service/IpEntityService';

const ModalVpnIp = ({ vpnId, onClose }) => {
    const [trafficName, setTrafficName] = useState('');
    const [ip, setIp] = useState('');

    const handleSave = () => {
        const traffic = {trafficName};
        addServerTraffic({ trafficName }).then((response) => {
            addIpWithTraffic(ip, response.id).then(() => {
                addIP(vpnId, ip)
                .then(() => {
                    setTrafficName('');
                    setIp('');
                    onClose();
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Error adding IP:', error);
                });
            })
        })
    };

    return (
        <div className="ip-modal-wrapper">
            <div className="ip-modal" tabIndex="-1">
            <div className="modal-content">
                <h3>Add VPN IP</h3>
                <div>
                    <input type="text" placeholder="Enter IP" value={ip} onChange={e => setIp(e.target.value)} />
                </div>
                <div>
                    <input type="text" placeholder="Enter traffic name" value={trafficName} onChange={e => setTrafficName(e.target.value)} />
                </div>
                <div className="button-group">
                    <button type="button" className="btn btn-primary" onClick={handleSave}>Save</button>
                    <button type="button" className="btn btn-warning" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ModalVpnIp;
