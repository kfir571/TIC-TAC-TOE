public class MoveResult
{
    public bool Success {get;  set;}
    public string? Error {get;  set;}
    public GameState State {get;  set;}

    public MoveResult(bool success, string? error, GameState state)
    {
        Success = success;
        Error = error;
        State = state;
    }
}