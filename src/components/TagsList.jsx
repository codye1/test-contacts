import PropTypes from 'prop-types';

const TagsList = ({ tags }) => {
  return (
    <div className="flex mt-[10px] flex-wrap">
      {tags.map((tag) => (
        <div className="bg-[#A6A6A6] rounded pl-2 pr-2 m-1 wrap" key={tag.id}>
          {tag.tag}
        </div>
      ))}
    </div>
  );
};

TagsList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      tag: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TagsList;
