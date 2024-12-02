import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const CardContact = ({ contact }) => {
    const { actions } = useContext(Context);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContact, setEditedContact] = useState({ ...contact });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedContact({ ...editedContact, [name]: value });
    };

    const handleSave = () => {
        actions.editContact(contact.id, editedContact);
        setIsEditing(false);
    };

    return (
        <li className="list-group-item d-flex justify-content-center">
            <div className="d-flex align-items-center w-100">
                <div className="col-md-3 d-flex justify-content-center">
                    <img
                        className="rounded-circle"
                        src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/43YAWLITTZJLZIQTCP2JSS4KSM.jpg"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                </div>
                <div className="col-md-6 ms-4">
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={editedContact.name}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Name"
                            />
                            <input
                                type="text"
                                name="address"
                                value={editedContact.address}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Address"
                            />
                            <input
                                type="text"
                                name="phone"
                                value={editedContact.phone}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Phone"
                            />
                            <input
                                type="email"
                                name="email"
                                value={editedContact.email}
                                onChange={handleChange}
                                className="form-control mb-2"
                                placeholder="Email"
                            />
                        </div>
                    ) : (
                        <div>
                            <h5 className="card-title mb-1">{contact.name}</h5>
                            <p className="card-text mb-1">{contact.address}</p>
                            <p className="card-text mb-1">{contact.phone}</p>
                            <p className="card-text mb-1">{contact.email}</p>
                        </div>
                    )}
                </div>
                <div className="col-md-3 d-flex justify-content-end">
                    {isEditing ? (
                        <>
                            <button
                                className="btn btn-success me-2"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className="btn btn-primary me-2"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger me-3"
                                onClick={() => actions.deleteContact(contact.id)}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </li>
    );
};

export default CardContact;
