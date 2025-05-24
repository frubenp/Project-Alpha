module CipherCracker.Handlers

open Giraffe
open Microsoft.AspNetCore.Http
open CipherCracker.SDES
open CipherCracker.BruteForce

type CrackTextInput = {
    plaintext: string
    ciphertext: int list
}

type CrackResult = {
    character: char
    cipher: int
    possibleKeys: int list
}

type EncryptTextInput = {
    plaintext: string
    key: int
}

type EncryptResult = {
    original: char
    encrypted: int
}

let fromBits bits =
    bits |> List.fold (fun acc bit -> (acc <<< 1) ||| bit) 0

let crackHandler : HttpHandler =
    fun next ctx ->
        task {
            let! input = ctx.BindJsonAsync<CrackTextInput>()
            let plaintextChars = input.plaintext |> Seq.toList
            let ciphertextBytes = input.ciphertext

            let zipped = List.zip plaintextChars ciphertextBytes

            let results =
                zipped
                |> List.map (fun (ch, ct) ->
                    let pt = int ch
                    let keys = crack pt ct
                    { character = ch; cipher = ct; possibleKeys = keys })

            return! json results next ctx
        }

let encryptHandler : HttpHandler =
    fun next ctx ->
        task {
            let! input = ctx.BindJsonAsync<EncryptTextInput>()
            let chars = input.plaintext |> Seq.toList
            let results =
                chars
                |> List.map (fun ch ->
                    let encrypted = encrypt input.key (int ch) |> fromBits
                    { original = ch; encrypted = encrypted })

            return! json results next ctx
        }