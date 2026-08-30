import * as React from 'react';
import { useState, useEffect } from 'react'
import { Container, Stack, ButtonGroup, Button, Typography } from '@mui/material'
import Alert from '@mui/material/Alert';

import Bord_3X3 from './Bord_3X3'
import Bord_4X4 from './Bord_4X4'



export default function Bord({bordType, setErrorMassege, bord, setBord, setStatus, status}) {
    return (
        <>
        {bordType == 3 && 
            <Bord_3X3
            setErrorMassege={setErrorMassege}
            bord={bord}
            setBord={setBord}
            setStatus={setStatus}
            status={status}
            />
        }

        {bordType == 4 && 
             <Bord_4X4
            setErrorMassege={setErrorMassege}
            bord={bord}
            setBord={setBord}
            setStatus={setStatus}
            status={status}
            />
        }
        </>
    );
}
