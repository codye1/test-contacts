import PropTypes from 'prop-types';

const InputText = ({ title, type, id, error }) => {
  return (
    <label htmlFor={id}>
      <h2 className="mt-[10px] mb-[10px]">{title}</h2>
      <input
        placeholder={title}
        type={type}
        name={id}
        className="pl-[14px] pr-[14px] pt-[12px] pb-[12px] border-[#AAAAAA] border-[1px] rounded w-[100%]"
        id={id}
      />
      {error && <p className="text-red-500">{error}</p>}
    </label>
  );
};

InputText.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
};

export default InputText;
