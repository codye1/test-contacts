import ContactsList from "../components/ContactsList";
import CreateContactForm from "../components/CreateContactForm";


const Contacts = () => {
  return (
    <div className="flex justify-center items-center w-[100%] h-[100vh]">
      <CreateContactForm/>
      <ContactsList/>
    </div>
  );
};

export default Contacts;