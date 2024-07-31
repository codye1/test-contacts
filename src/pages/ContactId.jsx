import {  useParams } from "react-router-dom";
import { useAddTagMutation, useGetContactByIdQuery } from "../API";
import { useState } from "react";

const ContactId = () => {

  const params = useParams()

  const [errorTag,setErrorTag] = useState(null)

  const {data,error,isLoading} = useGetContactByIdQuery(params.id)

  const [addTag] = useAddTagMutation()

  let email,tags,lastName,avatarUrl,firstName

  if (data) {
    email = data.resources[0].fields["email"]?.[0]?.value || "No email";
    firstName = data.resources[0].fields["first name"]?.[0]?.value || "No first name";
    lastName = data.resources[0].fields["last name"]?.[0]?.value || "No last name";
    avatarUrl = data.resources[0].avatar_url || "No url";
    tags = data.resources[0].tags || []
  }

  const addContact = (event) => {
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
      {isLoading?
        <div>Loading...</div> :
        error?
        <div>Error</div>:
        data &&
        <>
            <div className="flex">
              <div className="m-auto mt-[50px] w-[50%]">
                <div className="flex items-center">
                  <img className="w-[7em] h-[7em] rounded-[50%]"  src={avatarUrl} alt="Avatar person" />
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
          <form className="max-w-[50%] m-auto" onSubmit={addContact}>
            <label htmlFor="tag">
              <h2 className="mt-[10px] mb-[10px]">Write tag</h2>
              <input
                placeholder="Tag"
                type="text"
                name="tag"
                className="pl-[14px] pr-[14px] pt-[12px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%]"
                id="tag"
              />
              {errorTag && <p className="text-red-500">{errorTag}</p>}
            </label>
            <button type="submit" className="pl-[14px] pr-[14px] pt-[12px] mt-[20px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%]">
              Add tag
            </button>
          </form>
        </>
    }
    </>
  );
};

export default ContactId;




