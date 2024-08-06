import Spiner from './Spiner';
import TagsList from './TagsList';
import close from '/close.svg';
import PropTypes from 'prop-types';

const ContactsCard = ({
  id,
  tags,
  email,
  firstName,
  lastName,
  avatarUrl,
  deleteContact,
  onClick,
  deleteLoading,
}) => {
  return (
    <div
      className="bg-[#EDEDED] rounded min-w-[259px] p-2 m-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start">
        <img
          className="w-[59px] h-[59px] rounded-[50%]"
          src={avatarUrl}
          alt="Avatar person"
        />
        <div className="ml-[10px]">
          <p className="flex">
            {firstName}&nbsp;{lastName}
          </p>
          <h2>{email}</h2>
        </div>
        {deleteLoading ? (
          <div className="ml-auto">
            <Spiner />
          </div>
        ) : (
          <img
            onClick={(event) => {
              if (deleteLoading) {
                return;
              }
              event.preventDefault();
              event.stopPropagation();
              deleteContact(id);
            }}
            className="ml-auto cursor-pointer"
            src={close}
            alt=""
          />
        )}
      </div>
      <div className="flex mt-[10px] flex-wrap">
        <TagsList tags={tags} />
      </div>
    </div>
  );
};

ContactsCard.propTypes = {
  id: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    })
  ).isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string,
  deleteContact: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  deleteLoading: PropTypes.bool.isRequired,
};

export default ContactsCard;
