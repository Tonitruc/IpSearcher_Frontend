import React, { useEffect, useState } from 'react';
import { listVpns, deleteVpn, removeIp, addIP} from '../service/VpnService';
import { useNavigate } from 'react-router-dom';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import Modal from './IpInfo';
import { getIpEntity } from '../service/IpEntityService';
import ModalVpnIp from './AddVpnIp';

const VpnListComponent = () => {
    const [vpns, setVpns] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIpIsOpen, setModalIpIsOpen] = useState(false);
    const [selectedIp, setSelectedIp] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigator = useNavigate();

    useEffect(() => {
        listVpns().then((response) => {
            setVpns(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    function ipsSize(vpn) {
        return Array.from(vpn.ips).length;
    }

    function addNewVpn() {
        navigator('/add-vpn');
    }

    function updateVpn(id) {
        navigator(`/edit-vpn/${id}`);
    }

    function removeVpn(id) {
        deleteVpn(id).then(() => {
            window.location.reload();
        })
    }

    function removeVpnIp(id, ip) {
        removeIp(id, ip).then(() => {
            window.location.reload();
        });
    }

    const openModalAddVpnIp = () => {
        setModalIpIsOpen(true);
    }

    const closeModalAddVpnIp = () => {
        setModalIpIsOpen(false);
    }

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    function selectIp(ip) {
        getIpEntity(ip).then(data => {
            setSelectedIp(data);
            openModal();
        });
    }

    function clearSelectedIp() {
        setSelectedIp(null);
    }

    function handleSearch(event) {
        setSearchTerm(event.target.value);
    }

    
    const filteredVpns = vpns.filter(vpn =>
        vpn.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container'>
            <h2 className='text-center'>List of VPN's</h2>
            <div className="d-flex justify-content-between mb-3">
                <button type="button" className="btn btn-dark add-button" onClick={addNewVpn}>Add new VPN</button>
                <InputGroup className="search-bar">
                    <FormControl
                        type="text"
                        placeholder="Search VPN"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </InputGroup>
            </div>
            <table className='table table-striped table-bordered table-container'>
                <thead>
                    <tr>
                        <th>VPN name</th>
                        <th>Servers</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {filteredVpns.map(vpn =>
                    <tr key={vpn.name}>
                        <td>{vpn.name}</td>
                        <td>
                            <details>
                                <summary>{ipsSize(vpn)} Servers</summary>
                                <ul>
                                    {vpn.ips.map((ip, index) => (
                                        <li key={index} className="server-item">
                                        <span className="server-text">{ip}</span> 
                                        <div className="button-group">
                                            <button className="info-button" onClick={(e) => selectIp(ip)}>Info</button>
                                            <button className="remove-button" onClick={(e) => removeVpnIp(vpn.id, ip)}>Remove</button>
                                        </div>
                                        </li>
                                    ))}
                                    <button className="info-button add-ip-button" onClick={() => openModalAddVpnIp()}>Add IP</button>
                                </ul>
                                {modalIpIsOpen && (<ModalVpnIp onClose={closeModalAddVpnIp} vpnId={vpn.id} />
)}
                            </details>
                        </td>
                        <td>
                            <div className="button-group">
                                <button className="info-button" onClick={() => updateVpn(vpn.id)}>Update</button>
                                <button className="remove-button" onClick={() => removeVpn(vpn.id)}>Remove</button>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
            </table>
            {modalIsOpen && <Modal onClose={closeModal} ip={selectedIp} />}      
        </div>
    );
};

export default VpnListComponent;
