import { Box, useTheme } from '@mui/material';

interface Props {
  index: any;
  value: any;
  children?: React.ReactNode;
  spacing?: number;
  spacingX?: number;
  spacingY?: number;
}

const TabPanel: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { children, value, index, spacing, spacingX, spacingY, ...other } = props;

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: theme.shadows[2],
      }}
      role='tabpanel'
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box p={spacing} py={spacingY} px={spacingX}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
