import { useState } from 'react'
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


function App() {
  const [status, setStatus] = useState('playing')
  const [errorMassege, setErrorMassege] = useState('')
  const [bord, setBord] =
    useState<(string | null)[]>(Array(9).fill(null))


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

  
  async function ResetGame() {
    setErrorMassege('')

    try {
      const response = await fetch('http://localhost:5161/game/reaset', {
        method: 'POST',
      })

      if (!response.ok) {
        setErrorMassege('Could not reset the game')
        return
      }

      const data: GameState = await response.json()
      // console.log(data);
      setBord(data.bord)
      setStatus(data.status)
      // console.log(data.bord)
    } catch {
      setErrorMassege('Could not connect to the server')
    }
  }

  function getStatusText(status: string) {
    if (status === 'X wins') return 'You won!'
    if (status === 'You Loss') return 'Computer won!'
    if (status === 'Draw') return status
    // console.log(status);

    return 'Your turn'
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h5">
        {getStatusText(status)}
      </Typography>

      {errorMassege &&
        <Alert severity="warning">
          {errorMassege}
        </Alert>
      }

      <Stack sx={{ alignItems: "center"}} spacing={0}>
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
        <Button
          variant="outlined"
          onClick={ResetGame}
        >
          Reset Game
        </Button>
      </Stack>
    </Container >
  )
}

export default App