import { useState, useEffect } from 'react'
import { Container, Stack, ButtonGroup, Button, Typography } from '@mui/material'
import Alert from '@mui/material/Alert';
import NativeSelectDemo from './NativeSelectDemo'
import Bord from './Bord'


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
  const [bordType, setBordType] = useState(3);
  const [status, setStatus] = useState('playing')
  const [errorMassege, setErrorMassege] = useState('')
  const [bord, setBord] =
    useState<(string | null)[]>(Array(16).fill(null))

  useEffect(() => {
    console.log(bordType)
    ResetGame();
    setBord(
      Array(bordType * bordType).fill(null)
    )
  }, [bordType]);





  async function ResetGame() {
    setErrorMassege('')

    try {
      const response = await fetch('http://localhost:5161/game/reaset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          position: 0,
          gameType: bordType,
        }),
      });

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
      <h2>TIC-TAC-TOE</h2>
      <NativeSelectDemo
        bordType={bordType}
        setBordType={setBordType} />

      <Typography variant="h5">
        {getStatusText(status)}
      </Typography>

      {errorMassege &&
        <Alert severity="warning">
          {errorMassege}
        </Alert>
      }
      <Bord
        bordType={bordType}
        setErrorMassege={setErrorMassege}
        bord={bord}
        setBord={setBord}
        setStatus={setStatus}
        status={status}
      />
      <Stack sx={{ alignItems: "center" }} spacing={0}>
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