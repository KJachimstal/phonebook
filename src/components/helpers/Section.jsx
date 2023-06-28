import PropTypes from 'prop-types';

export const Section = props => {
  return (
    <div className="container mx-auto">
      <div className="">
        <h1 className="flex items-center mb-6 text-2xl font-bold text-white">
          {props.title}
        </h1>
        {props.children}
      </div>
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};
