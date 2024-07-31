import close from "/close.svg"

const ContactsCard = ({id,tags,email,firstName,lastName,avatarUrl,deleteContact}) => {


  return (
    <div className="bg-[#EDEDED] rounded p-2 min-w-[328px] m-1">
        <div className="flex items-start">
          <img className="w-[59px] h-[59px] rounded-[50%]"  src={avatarUrl} alt="Avatar person" />
          <div className="ml-[10px]">
            <p className="flex">
              <h1>{firstName}</h1>&nbsp;<h1>{lastName}</h1>
            </p>
            <h2>{email}</h2>
          </div>
          <img onClick={()=>{
            console.log("delete",id);
            deleteContact(id)}} className="ml-auto cursor-pointer" src={close} alt="" />
        </div>
      <div className="flex mt-[10px] flex-wrap">
        {tags.map(
          (tag)=><div className="bg-[#A6A6A6] rounded pl-2 pr-2 m-1 wrap" key={tag.id}>{tag.tag}</div>
        )}
      </div>
    </div>
  );
};

export default ContactsCard;