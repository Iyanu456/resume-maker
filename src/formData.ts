// form-data.js
import { ChangeEvent } from 'react';

export const generateFormData = (userDisplayedInfo: any, handleChange: (e: ChangeEvent<HTMLInputElement>, field: string) => void) => [
  {
    label: 'First Name',
    id: 'firstnameInput',
    value: userDisplayedInfo.firstname,
    type: 'text',
    handleChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'firstname'),
  },
  {
    label: 'Last Name',
    id: 'lastnameInput',
    value: userDisplayedInfo.lastname,
    type: 'text',
    handleChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'lastname'),
  },
  {
    label: 'Email',
    id: 'emailInput', // Corrected id for uniqueness
    value: userDisplayedInfo.email,
    type: 'text',
    handleChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'email'),
  },
  {
    label: 'Phone No',
    id: 'phoneNoInput', // Corrected id for uniqueness
    value: userDisplayedInfo.phoneNo,
    type: 'text',
    handleChange: (e: ChangeEvent<HTMLInputElement>) => handleChange(e, 'phoneNo'),
  },
];
