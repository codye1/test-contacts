import { useState } from 'react';
import validateForm from '../helpers/validate';
import { useAddContactMutation, } from '../API';
import Spiner from './Spiner';

const CreateContactForm = () => {
  const [errors, setErrors] = useState({});
  const [addContact,{isLoading}] = useAddContactMutation()


  const createContact = (event) => {
    event.preventDefault();
    if(isLoading) return
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
          avatar_url: "https://live.devnimble.com/api/avatars/person_default",
          fields: {
            "first name": [{ value:data.firstName, modifier:"",label:"first name"}],
            "last name": [{ value:data.lastName, modifier:"",label:"last name"}],
            "email": [{ value:data.email, modifier:"",label:"email"}]
          },
          record_type: "person",
          tags: [],
          type: "person"
        }
        setErrors({})
        addContact(contact)
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
          <label htmlFor="firstName">
            <h2 className="mt-[10px] mb-[10px]">First name</h2>
            <input
              placeholder="First name"
              type="text"
              name="firstName"
              className="pl-[14px] pr-[14px] pt-[12px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%]"
              id="firstName"
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}
          </label>
          <label htmlFor="lastName">
            <h2 className="mt-[10px] mb-[10px]">Last name</h2>
            <input
              placeholder="Last name"
              type="text"
              name="lastName"
              className="pl-[14px] pr-[14px] pt-[12px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%]"
              id="lastName"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
          </label>
          <label htmlFor="email">
            <h2 className="mt-[10px] mb-[10px]">Email</h2>
            <input
              placeholder="Email"
              type="email"
              name="email"
              className="pl-[14px] pr-[14px] pt-[12px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%]"
              id="email"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
          </label>
        </div>
        <button type="submit" className="pl-[14px] pr-[14px] pt-[12px] mt-[20px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%] flex justify-center">
          {isLoading?<Spiner/>:"Add contact"}
        </button>

      </form>
      </div>
    </div>
  );
};

export default CreateContactForm;
