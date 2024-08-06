import { useState } from 'react';
import validateForm from '../helpers/validate';
import { useAddContactMutation } from '../API';
import InputText from './InputText';
import SubmitButton from './SubmitButton';

const CreateContactForm = () => {
  const [errors, setErrors] = useState({});
  const [addContact, { isLoading }] = useAddContactMutation();

  const createContact = (event) => {
    event.preventDefault();
    if (isLoading) return;
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
    };
    const validationErrors = validateForm(data);
    if (Object.keys(validationErrors).length === 0) {
      console.log(data);
      const contact = {
        avatar_url: 'https://live.devnimble.com/api/avatars/person_default',
        fields: {
          'first name': [
            { value: data.firstName, modifier: '', label: 'first name' },
          ],
          'last name': [
            { value: data.lastName, modifier: '', label: 'last name' },
          ],
          email: [{ value: data.email, modifier: '', label: 'email' }],
        },
        record_type: 'person',
        tags: [],
        type: 'person',
      };
      setErrors({});
      addContact(contact);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-[100%] min535:w-[30%] ">
      <div className="sticky top-[50px]">
        <h1 className="text-[20px]">Create Contact</h1>
        <form onSubmit={createContact}>
          <div>
            <InputText
              title={'First name'}
              type={'text'}
              id={'firstName'}
              error={errors.firstName}
            />
            <InputText
              title={'Last name'}
              type={'text'}
              id={'lastName'}
              error={errors.lastName}
            />
            <InputText
              title={'Email'}
              type={'email'}
              id={'lastName'}
              error={errors.email}
            />
          </div>
          <SubmitButton title="Add contact" isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default CreateContactForm;
