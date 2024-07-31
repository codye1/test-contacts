import { useDeleteContactMutation, useGetContactsQuery } from "../API";
import ContactsCard from "./ContactsCard";



const ContactsList = () => {
  const { data, error, isLoading } = useGetContactsQuery()


  const [deleteContact] = useDeleteContactMutation()
  console.log(data
  );
  if (data && "resources" in data) {
    data.resources.forEach(element => {
      console.log(element.tags.map(tag=>tag.tag) );
    });
  }

  return (
    <div className="pl-[30px] pr-[10px] w-[70%] ">
      <h1>Contacts</h1>
      <div className="">
        {
        isLoading?
          <div>Loading...</div>:
        error?
          <div>Error...</div>:
        data && "resources" in data && data.resources.map((contact) => {
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
              deleteContact={deleteContact}
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