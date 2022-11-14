import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);

  // Get Contacts
  const getContacts = async () => {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://contact-keeper-cloud.herokuapp.com/api/contacts`
        : 'http://localhost:5000/api/contacts';

    try {
      const res = await axios.get(url);
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const url =
      process.env.NODE_ENV === 'production'
        ? `https://contact-keeper-cloud.herokuapp.com/api/contacts`
        : 'http://localhost:5000/api/contacts';

    try {
      const res = await axios.post(url, contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const url =
      process.env.NODE_ENV === 'production'
        ? `https://contact-keeper-cloud.herokuapp.com/api/contacts`
        : 'http://localhost:5000/api/contacts';

    try {
      const res = await axios.put(`${url}/${contact._id}`, contact, config);
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {
    const url =
      process.env.NODE_ENV === 'production'
        ? `https://contact-keeper-cloud.herokuapp.com/api/contacts`
        : 'http://localhost:5000/api/contacts';

    try {
      await axios.delete(`${url}/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filter Contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
        clearContacts,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
