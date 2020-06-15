import React from 'react';
// import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';

import PlacesAutocomplete, { getLatLng, geocodeByAddress } from 'react-places-autocomplete'
import { makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';



const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        height: '100%',
    },
}));


export default function InputContainer() {
    const classes = useStyles();
    // const [coordinates, setCoordinates] = React.useState({ lat: null, lng: null })
    const [address, setAddress] = React.useState('');

    const handleSelect = async (value: string) => {
        const results = await geocodeByAddress(value);
        const LatLng = await getLatLng(results[0]);
        console.log(LatLng);
        console.log(results);


        // setCoordinates({LatLng});
        // setAddress({results});
    }

    
    return (

        <PlacesAutocomplete

            value={address}
            onChange={setAddress}
            onSelect={handleSelect}

        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <Paper component="form" className={classes.root}>
                    <InputBase {...getInputProps()}

                        placeholder="Search for Hospitals"
                        inputProps={{ 'aria-label': 'search google maps' }}
                    />

                    <Paper>
                        {loading ? <div>...loading</div> : null}
                        {suggestions.map(suggestion => {
                            const style = {
                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                            };
                            return (
                                <div {...getSuggestionItemProps(suggestion, { style })}>
                                    {suggestion.description}
                                </div>
                            );
                        })}
                    </Paper>
                </Paper>)


            }

        </PlacesAutocomplete>
    );
}


