import { useParams } from 'react-router-dom';
import { useAddTagMutation, useGetContactByIdQuery } from '../API';
import { useState } from 'react';
import Spiner from '../components/Spiner';
import SubmitButton from '../components/SubmitButton';
import InputText from '../components/InputText';
import TagsList from '../components/TagsList';

const ContactId = () => {
  const params = useParams();

  const [errorTag, setErrorTag] = useState(null);

  const {
    data: person,
    error: personError,
    isLoading: personLoading,
  } = useGetContactByIdQuery(params.id);

  const [addTag, { isLoading: tagLoading }] = useAddTagMutation();

  let email, tags, lastName, avatarUrl, firstName;

  if (person) {
    email = person.resources[0].fields['email']?.[0]?.value || 'No email';
    firstName =
      person.resources[0].fields['first name']?.[0]?.value || 'No first name';
    lastName =
      person.resources[0].fields['last name']?.[0]?.value || 'No last name';
    avatarUrl = person.resources[0].avatar_url || 'No url';
    tags = person.resources[0].tags || [];
  }

  const addTags = (event) => {
    if (tagLoading) return;
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      tag: formData.get('tag'),
    };
    if (data.tag.length > 0) {
      addTag({
        id: params.id,
        tags: [...tags.map((tag) => tag.tag), ...data.tag.split(',')],
      });
    } else {
      setErrorTag('Write tag');
    }
  };
  console.log(tags);

  return (
    <>
      {personLoading ? (
        <div className="flex justify-center items-center h-[100vh]">
          <Spiner />
        </div>
      ) : personError ? (
        <div>Error,maybe someone deleted this contact</div>
      ) : (
        person && (
          <>
            <div className="flex font-PoppinsBold  font-bold">
              <div className="m-auto min535:mt-[50px] mt-[20px] min535:w-[50%] w-[90%]">
                <div className="flex items-center">
                  <img
                    className="min535:w-[7em] min535:h-[7em] h-[5em] rounded-[50%]"
                    src={avatarUrl}
                    alt="Avatar person"
                  />
                  <div className="ml-[10px]">
                    <p className="flex text-base">
                      {lastName}&nbsp;{firstName}
                    </p>
                    <h2>{email}</h2>
                  </div>
                </div>
                <h1>Tags</h1>
                <div className="flex mt-[10px] flex-wrap">
                  <TagsList tags={tags} />
                </div>
              </div>
            </div>
            <form
              className="min535:max-w-[50%] w-[90%] m-auto"
              onSubmit={addTags}
            >
              <InputText title={''} type={'text'} id={'tag'} error={errorTag} />
              <SubmitButton title="Add tags" isLoading={tagLoading} />
            </form>
          </>
        )
      )}
    </>
  );
};

export default ContactId;
