import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Form, Row, Col } from 'react-bootstrap';
import { addVpn, listVpns, getVpnById, updateVpn } from '../service/VpnService';
import { useNavigate, useParams } from 'react-router-dom';
import './TableStyle.css';

const VpnComponent = () => {
    const [vpns, setVpns] = useState([]);
    const [name, setName] = useState('');
    const [ipEntities, setIpEntities] = useState(['']);

    const [errors, setErrors] = useState({ name: '',});
    const [ipErrors, setIpErrors] = useState([]);

    const navigator = useNavigate();

    const {vpnId} = useParams();
    useEffect(() => {
        listVpns().then((response) => {
            setVpns(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        if(vpnId) {
            getVpnById(vpnId).then((response) => {
                console.log(response.data);
                setName(response.data.name);
                setIpEntities(response.data.ips);
            });
        } 
    }, [vpnId])

    
    function validateName() {
        let valid = true;

        const errorsCopy = {... errors}
        if(!vpns.every(vpn => vpn.name != name)) {
            errorsCopy.name = 'The name is already taken';
            valid = false;
        }
        else if(name.trim()) {
            errorsCopy.name = '';
        } 
        else {
            errorsCopy.name = 'Name is required';
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function validateIps() {
        let valid = true;

        const ipErrorsCopy = {... ipErrors}
        ipEntities.forEach((ip, index) => {
            ipErrorsCopy[index] = '';
            if (!/^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)(\.(?!$)|$)){4}$/.test(ip)) {
                ipErrorsCopy[index] = 'Invalid IP';
                valid = false; 
            }
            console.log(ipErrorsCopy[index]);
        });
        setIpErrors(ipErrorsCopy);

        return valid;
    }

    const handleVpnName = (e) => {
        setName(e.target.value);
    };

    const validIps = (index, value) => {
        const validInput = /^[0-9.]*$/.test(value);
        if ((validInput || value === '') && value.length <= 15) {
            const newIp = [...ipEntities];
            newIp[index] = value;
            setIpEntities(newIp);
        } 
    };

    const addIp = () => {
        if(validateIps()) {
            setIpEntities([...ipEntities, '']);
        } 
    };

    const removeIp = (index) => {
        if(Array.from(ipEntities).length != 1) {
            const newIp = [...ipEntities];
            newIp.splice(index, 1);
            setIpEntities(newIp);
        }
    };

    const saveVpn = (e) => {
        e.preventDefault();
        
        if(validateName() && validateIps()) {
            const vpn = {name, ipEntities}
            
            if(vpnId) {
                updateVpn(vpnId, vpn).then((response) => {
                    console.log(response.data);
                    navigator('/vpns')
                })
            } else {
                addVpn(vpn).then((response) => {
                    console.log(response.data);
                    navigator('/vpns')
                })
            }
        }
    };

    function pageTitle() {
        if(vpnId) {
            return <h2 className='text-center'>Update VPN</h2>
        } else {
            return <h2 className='text-center'>Add VPN</h2>
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                <div className='card'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <Form onSubmit={(e) => saveVpn(e)}>
                            <Form.Group className='mb-2'>
                                <Form.Label>VPN name</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Enter vpn name'
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                    value={name}
                                    onChange={handleVpnName}
                                />
                                {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Label>List of IP Addresses</Form.Label>
                                {ipEntities.map((ipAddress, index) => (
                                    <Row key={index}>
                                        <Col xs={10}>
                                            <Form.Control 
                                                type='text'
                                                placeholder='Enter IP address'
                                                className={`form-control ${ipErrors[index] ? 'is-invalid' : ''} mt-2`}
                                                value={ipAddress}
                                                onChange={(e) => validIps(index, e.target.value)}
                                                maxLength={15}
                                            />
                                            {ipErrors[index] && <div className='invalid-feedback'>{ipErrors[index]}</div>}
                                        </Col>
                                        <Col xs={2}>
                                            <Button variant='danger' onClick={() => removeIp(index)}>
                                                Remove
                                            </Button>
                                        </Col>
                                    </Row>
                                ))}
                                <Button variant='primary' className='mt-2' onClick={() => addIp()}>
                                    Add IP Address
                                </Button>
                            </Form.Group>
                            <Button variant='primary' type='submit' onClick={() => saveVpn()}>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default VpnComponent;
