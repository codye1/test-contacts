import { useState } from 'react';
import validateForm from '../helpers/validate';
import { useAddContactMutation, } from '../API';

const CreateContactForm = () => {
  const [errors, setErrors] = useState({});
  const [addContact] = useAddContactMutation()


  const createContact = (event) => {
    event.preventDefault();
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
    <div className="w-[30%] ">
      <div className="sticky top-[50px]">
      <h1>Create Contact</h1>
      <form onSubmit={createContact}>
        <div>
          <label htmlFor="firstName">
            <h2 className="mt-[10px] mb-[10px]">Write first name</h2>
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
            <h2 className="mt-[10px] mb-[10px]">Write last name</h2>
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
            <h2 className="mt-[10px] mb-[10px]">Write email</h2>
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
        <button type="submit" className="pl-[14px] pr-[14px] pt-[12px] mt-[20px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%]">
          Add contact
        </button>
      </form>
      </div>
    </div>
  );
};

export default CreateContactForm;
