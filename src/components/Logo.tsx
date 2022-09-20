import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }: any) {
  const navigate = useNavigate();
  return <Box component="img" src="/static/logo.svg" onClick={() => navigate('/')} sx={{ width: 40, height: 40, ...sx }} />;
}
