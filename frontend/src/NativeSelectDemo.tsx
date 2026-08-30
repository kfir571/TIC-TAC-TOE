import * as React from 'react';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';



export default function NativeSelectDemo({ bordType, setBordType }) {

    const id = React.useId();
    const handleChange = (event: SelectChangeEvent) => {
        setBordType(event.target.value);
    };

    return (
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <Select
                value={bordType}
                onChange={handleChange}
            >
                <MenuItem value={3}>3 X 3</MenuItem>
                <MenuItem value={4}>4 X 4</MenuItem>
            </Select>
        </FormControl>
    );
}
