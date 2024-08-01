import {  useParams } from "react-router-dom";
import { useAddTagMutation, useGetContactByIdQuery } from "../API";
import { useState } from "react";
import Spiner from "../components/Spiner";

const ContactId = () => {

  const params = useParams()

  const [errorTag,setErrorTag] = useState(null)

  const {data:person,error:personError,isLoading:personLoading} = useGetContactByIdQuery(params.id)

  const [addTag,{isLoading:tagLoading}] = useAddTagMutation()

  let email,tags,lastName,avatarUrl,firstName

  if (person) {
    email = person.resources[0].fields["email"]?.[0]?.value || "No email";
    firstName = person.resources[0].fields["first name"]?.[0]?.value || "No first name";
    lastName = person.resources[0].fields["last name"]?.[0]?.value || "No last name";
    avatarUrl = person.resources[0].avatar_url || "No url";
    tags = person.resources[0].tags || []
  }

  const addContact = (event) => {
    if(tagLoading) return
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      tag: formData.get('tag'),
    };
    if (data.tag.length > 0) {
      console.log([...tags,data.tag]);
      addTag({id:params.id,tags:[...tags.map(tag=>tag.tag),data.tag]})
    } else {
      setErrorTag("Write tag");
    }
  };

  return (
    <>
      {personLoading?

        <div className="flex justify-center items-center h-[100vh]">
          <Spiner/>
        </div> :
        personError?
        <div>Error,maybe someone deleted this contact</div>:
        person &&
        <>
            <div className="flex font-PoppinsBold  font-bold">
              <div className="m-auto min535:mt-[50px] mt-[20px] min535:w-[50%] w-[90%]">
                <div className="flex items-center">
                  <img className="min535:w-[7em] min535:h-[7em] h-[5em] rounded-[50%]"  src={avatarUrl} alt="Avatar person" />
                  <div className="ml-[10px]">
                    <p className="flex text-base">
                      {lastName}&nbsp;{firstName}
                    </p>
                    <h2>{email}</h2>
                  </div>
                </div>
              <h1>Tags</h1>
              <div className="flex mt-[10px] flex-wrap">
                {tags.map(
                  (tag)=><div className="bg-[#A6A6A6] rounded pl-2 pr-2 m-1 wrap" key={tag.id}>{tag.tag}</div>
                )}
              </div>
            </div>

          </div>
          <form className="min535:max-w-[50%] w-[90%] m-auto" onSubmit={addContact}>
            <label htmlFor="tag">
              <input
                placeholder="Add new Tag"
                type="text"
                name="tag"
                className="pl-[14px] pr-[14px] pt-[12px] mt-[20px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%]"
                id="tag"
              />
              {errorTag && <p className="text-red-500">{errorTag}</p>}
            </label>
            <button type="submit" className="font-PoppinsBold font-bold antialiased  pl-[14px] pr-[14px] pt-[12px] mt-[20px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%] flex justify-center">
            {tagLoading?<Spiner/>:"Add tag"}
            </button>
          </form>
        </>
    }
    </>
  );
};

export default ContactId;




