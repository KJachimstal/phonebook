import PropTypes from 'prop-types';

export const Section = props => {
  return (
    <div>
      <h1>{props.title}</h1>
      {props.children}
    </div>
  );
};

Section.propTypes = {
  children: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};
