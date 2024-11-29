const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            listContacts: [],
        },
        actions: {
            // Crear un nuevo usuario si no existe
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
                    .catch((error) => console.error("Error creando usuario:", error));
            },

            // Obtener contactos desde la API
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
                            return response.json();  // Si la respuesta es OK, convertirla a JSON
                        }
                        throw new Error("Error en la solicitud de contactos: " + response.statusText);
                    })
                    .then((data) => {
                        if (data && data.contacts) {
                            setStore({ listContacts: data.contacts });
                            console.log("Contactos recibidos:", data.contacts);
                        } else {
                            console.log("No hay contactos disponibles.");
                        }
                    })
                    .catch((error) => {
                        console.error("Error al obtener contactos:", error);
                    });
            },

            // Función para agregar un nuevo contacto
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
                        console.log("Nuevo contacto creado:", data);
                        const actions = getActions();
                        actions.addContactToList(data);
                    })
                    .catch((error) => console.error("Error creando contacto:", error));
            },

            // Agregar contacto a la lista en el store
            addContactToList: (contact) => {
                const store = getStore();
                setStore({ listContacts: [...store.listContacts, contact] });
            },

            // Eliminar un contacto
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
                            console.log(`Contacto con ID ${id} eliminado`);
                        } else {
                            console.error("Error al eliminar contacto");
                        }
                    })
                    .catch((error) => console.error("Error al eliminar contacto:", error));
            },

            // Editar un contacto
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
                        throw new Error("Error al actualizar el contacto");
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
                            console.log("Contacto actualizado:", data);
                        }
                    })
                    .catch((error) => console.error("Error al actualizar contacto:", error));
            },
        },
    };
};

export default getState;
