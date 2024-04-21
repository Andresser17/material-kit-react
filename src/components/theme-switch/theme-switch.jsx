import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';

import { useTheme } from '@mui/material/styles';

import { StyledSwitch } from './styles';

// ----------------------------------------------------------------------

const ThemeSwitch = forwardRef((props, ref) => {
  const theme = useTheme();
  const [checked, setChecked] = useState(false);

  const handleChange = (e) => {
    setChecked(!e.checked);
  };

  return (
    <StyledSwitch onChange={handleChange} checked={checked} ref={ref} theme={theme} {...props} />
  );
});

ThemeSwitch.propTypes = {
  sx: PropTypes.object,
};

export default ThemeSwitch;
