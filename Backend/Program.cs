var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSingleton<GameService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5174")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("Frontend");

app.MapGet("/game/", () =>
{
    var gameService = app.Services.GetRequiredService<GameService>();
    return Results.Ok(gameService.GetGameState());
});

app.MapPost("game/play",(
    GameService gameService, 
    MoveRequest request) =>
{
    MoveResult result = gameService.Play(request.position);
    return Results.Ok(result);
});

app.MapPost("/game/reaset", (GameService gameService) =>
{
    gameService.Reset();
    return Results.Ok(gameService.GetGameState());
});



app.Run();