import React from "react";
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../store/appContext'

const CardContact = ({ contact }) => {
    const { store, actions } = useContext(Context)

    const eliminarContacto = () => {
        console.log(contact)
        actions.deleteContact(contact.id);
    };

    return (
        <li className="list-group-item d-flex justify-content-center">
            <div className="d-flex align-items-center w-75">
                <div className="col-md-3 d-flex justify-content-center">
                    <img
                        className="rounded-circle"
                        src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </div>
                <div className="col-md-6 ms-4">
                    <h5 className="card-title mb-1">{contact.name}</h5>
                    <p className="card-text mb-1">{contact.address}</p>
                    <p className="card-text mb-1">{contact.phone}</p>
                    <p className="card-text mb-1">{contact.email}</p>
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                    <Link to={"/editContact/" + contact.id} className="btn btn-link p-0 me-3">
                        <i className="fa fa-eraser"></i>
                    </Link>
                    <button type="button" data-bs-toggle="modal" data-bs-target={"#delete-contact-" + contact.id} >
                        <i className="fa fa-trash fa-lg"></i>
                    </button>
                    <div className="modal fade" id={"delete-contact-" + contact.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure?</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {contact.name} its going to dissapear from your life!
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Oh no!</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={eliminarContacto}>Fck yes!</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}
export default CardContact