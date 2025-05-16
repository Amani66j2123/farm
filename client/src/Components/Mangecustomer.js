import React, { useState } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './ManageCustomers.css';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([
        { id: 1, name: 'ALYAZIA', email: 'alyazia@example.com', phone: '99887766' },
        { id: 2, name: 'AMANI', email: 'amani@example.com', phone: '92345619' },
    ]);
    const [modal, setModal] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);

    const toggleModal = () => setModal(!modal);

    const handleEdit = (customer) => {
        setCurrentCustomer(customer);
        toggleModal();
    };

    const handleDelete = (id) => {
        setCustomers(customers.filter(customer => customer.id !== id));
    };

    const handleSave = () => {
        if (currentCustomer) {
            setCustomers(customers.map(customer => 
                customer.id === currentCustomer.id ? currentCustomer : customer
            ));
        }
        setCurrentCustomer(null);
        toggleModal();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentCustomer({ ...currentCustomer, [name]: value });
    };

    return (
        <div>
            <header className="bg-gradient text-white text-center p-3">
                <h1>Farm Rental System</h1>
                <nav>
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href="index.html" className="text-white">Home</a></li>
                        <li className="list-inline-item"><a href="services.html" className="text-white">Services</a></li>
                        <li className="list-inline-item"><a href="about.html" className="text-white">About</a></li>
                        <li className="list-inline-item"><a href="contact.html" className="text-white">Contact</a></li>
                        <li className="list-inline-item"><a href="index.html" className="text-white">Login</a></li>
                        <li className="list-inline-item"><a href="index.html" className="text-white">LogOut</a></li>
                        <li className="list-inline-item"><a href="index.html" className="text-white">Profile</a></li>
                    </ul>
                </nav>
            </header>

            <Container className="my-5">
                <h2 className="text-center">Customer List</h2>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map(customer => (
                            <tr key={customer.id}>
                                <td>{customer.name}</td>
                                <td>{customer.email}</td>
                                <td>{customer.phone}</td>
                                <td>
                                    <Button color="primary" className="me-2" onClick={() => handleEdit(customer)}>Edit</Button>
                                    <Button color="danger" onClick={() => handleDelete(customer.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Customer</ModalHeader>
                <ModalBody>
                    {currentCustomer && (
                        <div>
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={currentCustomer.name}
                                onChange={handleChange}
                                className="form-control"
                            />
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={currentCustomer.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                            <label>Phone:</label>
                            <input
                                type="text"
                                name="phone"
                                value={currentCustomer.phone}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ManageCustomers;