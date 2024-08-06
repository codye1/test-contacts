import Spiner from './Spiner';
import PropTypes from 'prop-types';

const SubmitButton = ({ isLoading, title }) => {
  return (
    <button
      type="submit"
      className="pl-[14px] pr-[14px] pt-[12px] mt-[20px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%] flex justify-center"
    >
      {isLoading ? <Spiner /> : title}
    </button>
  );
};

SubmitButton.propTypes = {
  title: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SubmitButton;
