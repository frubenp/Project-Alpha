module Program

open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Microsoft.AspNetCore.Cors.Infrastructure
open Giraffe
open CipherCracker.Handlers

let createApp () =
    let builder = WebApplication.CreateBuilder()


    builder.Services.AddGiraffe() |> ignore


    builder.Services.AddCors(fun options ->
        options.AddDefaultPolicy(fun policy ->
            policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader() |> ignore)
        ) |> ignore

    let app = builder.Build()


    app.UseCors()
    app.UseGiraffe(
        choose [
            route "/encrypt" >=> POST >=> encryptHandler
            route "/crack" >=> POST >=> crackHandler
            route "/" >=> text "S-DES Cracker API (NET 9)"
        ]
    )

    app.Run()

[<EntryPoint>]
let main _ =
    createApp()
    0
