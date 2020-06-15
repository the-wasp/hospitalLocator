import React, { useState } from 'react';
import SwipeableViews from 'react-swipeable-views';

import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import StreetviewIcon from '@material-ui/icons/Streetview';
import ViewListIcon from '@material-ui/icons/ViewList';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import MapContainer from './MapContainer';
import ListContainer from './ListContainer';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={2} >
                    <Typography component="div">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100vw',
        Height: '100vh',
    },
}));

interface MainProps {
    currentPosition: {}
};

export default function Main(props: MainProps) {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [radius, setRadius] = useState(10000);
    

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    function handleClick(e: any) {
        console.log(e.currentTarget.value)
        setRadius(e.currentTarget.value);
    }

    return (
        <div className={classes.root} >
            <AppBar color="default" position="static">
                <ToggleButtonGroup color="primary" className={classes.root} aria-label="outlined primary button group center">
                    <Button variant="contained" disabled>
                        Distance in Kilo Meter:
                    </Button>
                    <ToggleButton onClick={handleClick} size="small" value={10000}>10Km</ToggleButton>
                    <ToggleButton onClick={handleClick} size="medium" value={20000}>20Km</ToggleButton>
                    <ToggleButton onClick={handleClick} size="medium" value={30000}>30Km</ToggleButton>
                    <ToggleButton onClick={handleClick} size="large" value={40000}>40Km</ToggleButton>
                </ToggleButtonGroup>
            </AppBar>
            <AppBar color="default" position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs"
                    centered
                >
                    <Tab icon={<StreetviewIcon />} label="Map View" {...a11yProps(0)} />
                    <Tab icon={<ViewListIcon />} label="List View" {...a11yProps(1)} />

                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                    <MapContainer location={props.currentPosition} radius={radius}  />
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                    <ListContainer  />
                </TabPanel>
            </SwipeableViews>
        </div >
    );
}
