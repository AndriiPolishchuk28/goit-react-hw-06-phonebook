import { configureStore, createAction } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import { devToolsEnhancer } from '@redux-devtools/extension';

// const addContact = createAction('contact/add');

const initialState = {
  contacts: JSON.parse(localStorage.getItem('contacts')) ?? [],
  filter: '',
};

const enhancer = devToolsEnhancer();

const reducer = (state = initialState, { payload, type }) => {
  switch (type) {
    case 'contact/add':
      return {
        ...state,
        contacts: [...state.contacts, payload],
      };
    case 'contact/delete':
      return {
        ...state,
        contacts: state.contacts.filter(elem => elem.id !== payload),
      };
    case 'filter':
      return {
        ...state,
        filter: payload,
      };

    default:
      return state;
  }
};

export const store = createStore(reducer, enhancer);
