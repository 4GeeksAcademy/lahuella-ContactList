const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listContacts: [],
        },
        actions: {
            createUser: () => {
                fetch("https://playground.4geeks.com/contact/agendas/lahuella", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ slug: "lahuella" }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Usuario creado:", data);
                    })
            },

            getInfoContacts: () => {
                fetch("https://playground.4geeks.com/contact/agendas/lahuella/contacts", {
                    method: "GET",
                })
                    .then((response) => {
                        if (response.status === 404) {
                            console.log("Usuario no encontrado, creando usuario...");
                            getActions().createUser();
                        }
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then((data) => {
                        if (data && data.contacts) {
                            setStore({ listContacts: data.contacts });
                            console.log("Contactos recibidos:", data.contacts);
                        } else {
                            console.log("No hay contactos disponibles.");
                        }
                    })
            },
            createContact: (payload) => {
                fetch("https://playground.4geeks.com/contact/agendas/lahuella/contacts", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const actions = getActions();
                        actions.addContactToList(data);
                    })
            },

            addContactToList: (contact) => {
                const store = getStore();
                setStore({ listContacts: [...store.listContacts, contact] });
            },

            deleteContact: (id) => {
                fetch(`https://playground.4geeks.com/contact/agendas/lahuella/contacts/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => {
                        if (response.ok) {
                            const store = getStore();
                            const updatedContacts = store.listContacts.filter(
                                (contact) => contact.id !== id
                            );
                            setStore({ listContacts: updatedContacts });
                        }
                    })
            },

            editContact: (id, contact) => {
                const store = getStore();
                fetch(`https://playground.4geeks.com/contact/agendas/lahuella/contacts/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                })
                    .then((response) => {
                        if (response.ok) {
                            return response.json();
                        }
                    })
                    .then((data) => {
                        if (data) {
                            const updatedContacts = store.listContacts.map((existingContact) => {
                                if (existingContact.id === id) {
                                    return data;
                                }
                                return existingContact;
                            });
                            setStore({ listContacts: updatedContacts });
                        }
                    })
            },
        },
    };
};

export default getState;
