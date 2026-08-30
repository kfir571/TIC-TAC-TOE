import * as React from 'react';
import { useState, useEffect } from 'react'
import { Container, Stack, ButtonGroup, Button, Typography } from '@mui/material'
import Alert from '@mui/material/Alert';

type GameState = {
  bord: (string | null)[],
  status: string
};

type MoveResult =
  {
    success: boolean,
    error: (string | null),
    state: GameState
  }



export default function Bord_3X3({setErrorMassege, bord, setBord, setStatus, status}) {

    async function Play(position: number) {
        if (status != "playing") {
            setErrorMassege('Game is over')
            return
        }

        setErrorMassege('');

        try {
            const respons = await fetch(`http://localhost:5161/game/play/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    position: position,
                    gameType: 3,
                }),
            });

            const data: MoveResult = await respons.json();

            if (!respons.ok || data.success === false) {
                setErrorMassege(data.error ?? "Invalid Move");
                return;
            }

            setBord(data.state.bord);
            setStatus(data.state.status);
        } catch {
            setErrorMassege("Could not connect to the server");
        }
    }

    return (
        <Stack sx={{ alignItems: "center" }} spacing={0}>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button
                    sx={{ height: 80, width: 80, fontSize: 32, }}
                    onClick={() => Play(0)}>
                    {bord[0]}
                </Button>

                <Button
                    sx={{ height: 80, width: 80, fontSize: 32, }}
                    onClick={() => Play(1)}>
                    {bord[1]}
                </Button>

                <Button
                    sx={{ height: 80, width: 80, fontSize: 32, }}
                    onClick={() => Play(2)}>
                    {bord[2]}
                </Button>
            </ButtonGroup>

            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button
                    sx={{ height: 80, width: 80, fontSize: 32, }}
                    onClick={() => Play(3)}>
                    {bord[3]}
                </Button>

                <Button
                    sx={{ height: 80, width: 80, fontSize: 32, }}
                    onClick={() => Play(4)}>
                    {bord[4]}
                </Button>

                <Button
                    sx={{ height: 80, width: 80, fontSize: 32, }}
                    onClick={() => Play(5)}>
                    {bord[5]}
                </Button>
            </ButtonGroup>

            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button
                    sx={{ height: 80, width: 80, fontSize: 32, }}
                    onClick={() => Play(6)}>
                    {bord[6]}
                </Button>

                <Button
                    sx={{ height: 80, width: 80, fontSize: 32, }}
                    onClick={() => Play(7)}>
                    {bord[7]}
                </Button>

                <Button
                    sx={{ height: 80, width: 80, fontSize: 32, }}
                    onClick={() => Play(8)}>
                    {bord[8]}
                </Button>
            </ButtonGroup>
            </Stack>
            );
}
