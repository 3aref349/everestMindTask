import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import Category from '../category/Category';
import Users from '../users/Users';
import TagToProduct from '../tagToProduct/tagToProduct';
import SubCategories from '../sub/SubCategories';
import Products from '../products/Products';
import Tags from '../tags/Tags';

function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 1000,
    },
});

class FullWidthTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label="Categroies" />
                        <Tab label="subCategories" />
                        <Tab label="Products" />
                        <Tab label="Tags" />
                        <Tab label="TagToProdut" />
                       
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}><Category /></TabContainer>
                    <TabContainer dir={theme.direction}><SubCategories /></TabContainer>
                    <TabContainer dir={theme.direction}><Products /></TabContainer>
                    <TabContainer dir={theme.direction}><Tags /></TabContainer>
                    <TabContainer dir={theme.direction}><TagToProduct /></TabContainer>
                </SwipeableViews>
            </div>
        );
    }
}

FullWidthTabs.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
