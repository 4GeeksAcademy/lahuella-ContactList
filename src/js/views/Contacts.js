import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import CardContact from "../component/CardContact.jsx";

const Contacts = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getInfoContacts();
    }, []);

    return (
        <div className="w-75 mx-auto mt-4">
            <div className="d-flex justify-content-end">
                <Link to="/AddContact">
                    <button className="btn btn-success">Add New contact</button>
                </Link>
            </div>
            <ul className="list-group mt-3">
                {store.listContacts && store.listContacts.length > 0 ? (
                    store.listContacts.map((contact, index) => {
                        return <CardContact contact={contact} key={index} />;
                    })
                ) : (
                    <h1 className="m-auto">No contacts available</h1>
                )}
            </ul>
        </div>
    );
};

export default Contacts;
