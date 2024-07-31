

const ContactsCard = ({id,tags,email,firstName,lastName}) => {
  return (
    <div>
      <h1>{id}</h1>
      <h1>{email}</h1>
    </div>
  );
};

export default ContactsCard;