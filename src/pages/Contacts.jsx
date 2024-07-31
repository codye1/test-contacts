import ContactsList from "../components/ContactsList";
import CreateContactForm from "../components/CreateContactForm";


const Contacts = () => {
  return (
    <div className="flex">
      <div className="flex justify-center w-[1280px] m-auto pl-[10px] pr-[10px] mt-[50px] ">
        <CreateContactForm/>
        <ContactsList/>
      </div>
    </div>
  );
};

export default Contacts;