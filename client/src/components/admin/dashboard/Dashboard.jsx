import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Category from '../category/Category';
import Users from '../users/Users';
import TagToProduct from '../tagToProduct/tagToProduct';
import SubCategories from '../sub/SubCategories';
import Products from '../products/Products';
import Tags from '../tags/Tags';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 4,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 568,
    width:500
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
<div>
  <h1 className="title">Admmin Dashboard</h1>
</div>

<div className={classes.root}>

<Tabs
  orientation="vertical"
  variant="scrollable"
  value={value}
  onChange={handleChange}
  aria-label="Vertical tabs example"
  className={classes.tabs}
>
  <Tab label="Users" {...a11yProps(0)} />
  <Tab label="Categories" {...a11yProps(1)} />
  <Tab label="SuCategories" {...a11yProps(2)} />
  <Tab label="Products" {...a11yProps(3)} />
  <Tab label="Tags" {...a11yProps(4)} />
  <Tab label="tag Product" {...a11yProps(5)} />

</Tabs>
<TabPanel value={value} index={0}>
  <Users />
</TabPanel>
<TabPanel value={value} index={1}>
<Category />
</TabPanel>
<TabPanel value={value} index={2}>
  <SubCategories />
</TabPanel>
<TabPanel value={value} index={3}>
  <Products />
</TabPanel>
<TabPanel value={value} index={4}>
<Tags />
</TabPanel>
<TabPanel value={value} index={5}>
  <TagToProduct />
</TabPanel>

</div>
    </div>
   
  );
}