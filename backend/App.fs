module CipherCracker.App

open System
open Microsoft.AspNetCore.Builder
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open Microsoft.AspNetCore.Hosting
open Giraffe
open CipherCracker.Handlers

let webApp : HttpHandler =
    choose [
        route "/favicon.ico" >=> setStatusCode 204 >=> text ""
        route "/encrypt" >=> POST >=> encryptHandler
        route "/crack" >=> POST >=> crackHandler
        route "/" >=> text "S-DES Cracker API működik. Használható /encrypt vagy /crack végpont."
    ]

[<EntryPoint>]
let main _ =
    Host.CreateDefaultBuilder()
        .ConfigureWebHostDefaults(fun webHost ->
            webHost
                .Configure(fun app ->
                    app.UseRouting()
                       .UseGiraffe webApp)
                .ConfigureServices(fun services ->
                    services.AddRouting()
                            .AddGiraffe() |> ignore)
                |> ignore)
        .Build()
        .Run()
    0