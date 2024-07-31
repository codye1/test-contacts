import { useGetContactsQuery } from "../API";
import ContactsCard from "./ContactsCard";



const ContactsList = () => {
  const { data, error, isLoading } = useGetContactsQuery()
  if (data && "resources" in data) {
    data.resources.forEach(element => {
      console.log(element.fields);
    });
  }

  return (
    <div>
      <ContactsCard
            key={"1"}
            id={"1"}
            email={"1"}
            firstName={"1"}
            lastName={"1"}
          />
    </div>
  );
};

export default ContactsList;

/*
{data && "resources" in data && data.resources.map((contact) => {
        const email = contact.fields["email"]?.[0]?.value || "No email";
        const firstName = contact.fields["first name"]?.[0]?.value || "No first name";
        const lastName = contact.fields["last name"]?.[0]?.value || "No last name";

        return (
          <ContactsCard
            key={contact.id}
            id={contact.id}
            email={email}
            firstName={firstName}
            lastName={lastName}
          />
        );
      })}
*/