import { useNavigate } from "react-router-dom";
import { useDeleteContactMutation, useGetContactsQuery } from "../API";
import ContactsCard from "./ContactsCard";
import Spiner from "./Spiner";



const ContactsList = () => {
  const { data:persons, error:personsError, isLoading:personLoading } = useGetContactsQuery()


  const [deleteContact,{isLoading:deleteLoading}] = useDeleteContactMutation()
  console.log(persons);
  if (persons && "resources" in persons) {
    persons.resources.forEach(element => {
      console.log(element.tags.map(tag=>tag.tag) );
    });
  }

  const navigate = useNavigate()

  return (
    <div className="min535:pl-[30px] pr-[10px] w-[100%] min535:w-[70%] ">
      <h1>Contacts</h1>
      <div className="">
        {
        personLoading?
          <div className="flex justify-center items-center h-[50vh]">
            <Spiner/>
        </div>:
        personsError?
          <div>Error...</div>:
        persons && "resources" in persons && persons.resources.map((contact) => {
          const email = contact.fields["email"]?.[0]?.value || "No email";
          const firstName = contact.fields["first name"]?.[0]?.value || "No first name";
          const lastName = contact.fields["last name"]?.[0]?.value || "No last name";
          const avatarUrl = contact.avatar_url || "No url";
          const tags = contact.tags || []

          return (
            <ContactsCard
              key={contact.id}
              id={contact.id}
              email={email}
              firstName={firstName}
              lastName={lastName}
              avatarUrl={avatarUrl}
              tags={tags}
              deleteLoading={deleteLoading}
              deleteContact={deleteContact}
              onClick={()=>{
                console.log("click");
                navigate(`/contacts/${contact.id}`)
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ContactsList;

/*

*/