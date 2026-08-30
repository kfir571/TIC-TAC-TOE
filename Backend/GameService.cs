public class GameService
{
    private readonly GameState _gameState = new GameState();
    private HashSet<int> _bordOpsins = new HashSet<int> { 0, 1, 2, 3, 4, 5, 6, 7, 8 };

    const int game3X3 = 3;
    const int game4X4 = 4;


    public GameState GetGameState()
    {
        return _gameState;
    }
    public MoveResult Play_3X3(int position)
    {
                if (_gameState.Status != "playing")
        {
            return new MoveResult(
                false,
                "Game is already over",
                _gameState
            );
        }

        if (position < 0 || position > 8)
        {
            return new MoveResult(
                false,
                "Invalid position",
                _gameState
            );
        }

        if (_gameState.Bord[position] != null)
        {
            Console.WriteLine("cell is already occupied");
            return new MoveResult(
                false,
                "cell is already occupied",
                _gameState
            );
        }

        _gameState.Bord[position] = "X";
        _bordOpsins.Remove(position);

        if (IsWin("X", game3X3))
        {
            // Console.WriteLine("X wins");
            _gameState.Status = "X wins";
            return new MoveResult(
                true,
                "You win",
                _gameState
            );
        }

        if (_bordOpsins.Count == 0)
        {

            _gameState.Status = "Draw";
            return new MoveResult(
                true,
                "Game is a draw",
                _gameState
            );
        }

        ComputerMove();

        if (IsWin("O", game3X3))
        {
            _gameState.Status = "You Loss";
            return new MoveResult(
                true,
                "You Loss",
                _gameState
            );
        }

        if (_bordOpsins.Count == 0)
        {
            _gameState.Status = "Draw";
            return new MoveResult(
                true,
                "Game is a draw",
                _gameState
            );
        }

        return new MoveResult(
            true,
            "Move accepted",
            _gameState
        );
    }

        public MoveResult Play_4X4(int position)
    {
                if (_gameState.Status != "playing")
        {
            return new MoveResult(
                false,
                "Game is already over",
                _gameState
            );
        }

        if (position < 0 || position > 15)
        {
            return new MoveResult(
                false,
                "Invalid position",
                _gameState
            );
        }

        if (_gameState.Bord[position] != null)
        {
            Console.WriteLine("cell is already occupied");
            return new MoveResult(
                false,
                "cell is already occupied",
                _gameState
            );
        }

        // Console.WriteLine($"befor change bord at index{position} to X");
        _gameState.Bord[position] = "X";
        // Console.WriteLine($"after change bord at index{position} to X");

        _bordOpsins.Remove(position);

        if (IsWin("X", game4X4))
        {
            // Console.WriteLine("X wins");
            _gameState.Status = "X wins";
            return new MoveResult(
                true,
                "You win",
                _gameState
            );
        }

        if (_bordOpsins.Count == 0)
        {

            _gameState.Status = "Draw";
            return new MoveResult(
                true,
                "Game is a draw",
                _gameState
            );
        }

        ComputerMove();

        if (IsWin("O", game4X4))
        {
            _gameState.Status = "You Loss";
            return new MoveResult(
                true,
                "You Loss",
                _gameState
            );
        }

        if (_bordOpsins.Count == 0)
        {
            _gameState.Status = "Draw";
            return new MoveResult(
                true,
                "Game is a draw",
                _gameState
            );
        }

        return new MoveResult(
            true,
            "Move accepted",
            _gameState
        );
    }
    public MoveResult Play(MoveRequest moveRequest)
    {
        if (moveRequest.gameType == 3)
        {
            return Play_3X3(moveRequest.position);
        } else
        {
            return Play_4X4(moveRequest.position);
        }
    }

    public void Reset(int gameType)
    {
        int lenth = gameType * gameType;

        _gameState.Bord = new string?[lenth];
        _gameState.Status = "playing";
        _bordOpsins.Clear();
        for (int i = 0; i < lenth; i++)
        {
            _bordOpsins.Add(i);
        }
    }

    void ComputerMove()
    {
        if (_bordOpsins.Count == 0)
        {
            return;
        }

        int randomIndex = new Random().Next(_bordOpsins.Count);
        int position = _bordOpsins.ElementAt(randomIndex);

        _gameState.Bord[position] = "O";
        _bordOpsins.Remove(position);
    }

    public bool IsWin(string player, int bordType)
    {
        string?[] bord = _gameState.Bord;
        if (bordType == game3X3 && 
        (
            (bord[0] == player && bord[1] == player && bord[2] == player) ||
            (bord[3] == player && bord[4] == player && bord[5] == player) ||
            (bord[6] == player && bord[7] == player && bord[8] == player) ||
            (bord[0] == player && bord[3] == player && bord[6] == player) ||
            (bord[1] == player && bord[4] == player && bord[7] == player) ||
            (bord[2] == player && bord[5] == player && bord[8] == player) ||
            (bord[0] == player && bord[4] == player && bord[8] == player) ||
            (bord[2] == player && bord[4] == player && bord[6] == player)))
        {
            return true;
        } else if (bordType == game4X4 &&
            (
                (bord[0] == player && bord[1] == player && bord[2] == player && bord[3] == player) ||
                (bord[4] == player && bord[5] == player && bord[6] == player && bord[7] == player) ||
                (bord[8] == player && bord[9] == player && bord[10] == player && bord[11] == player) ||
                (bord[12] == player && bord[13] == player && bord[14] == player && bord[15] == player) ||

                (bord[0] == player && bord[4] == player && bord[8] == player && bord[12] == player) ||
                (bord[1] == player && bord[5] == player && bord[9] == player && bord[13] == player) ||
                (bord[2] == player && bord[6] == player && bord[10] == player && bord[14] == player) ||
                (bord[3] == player && bord[7] == player && bord[11] == player && bord[15] == player) ||

                (bord[0] == player && bord[5] == player && bord[10] == player && bord[15] == player) ||
                (bord[3] == player && bord[6] == player && bord[9] == player && bord[12] == player)))
        {
           return true; 
        }
        return false;
    }
}