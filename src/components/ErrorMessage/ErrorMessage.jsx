import PropTypes from 'prop-types';
import { Text } from './ErrorMessage.styled';

export const ErrorMessage = ({ children }) => {
  return <Text>Oops! {children}</Text>;
};
ErrorMessage.propTypes = {
  children: PropTypes.string.isRequired,
};
