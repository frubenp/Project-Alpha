module CipherCracker.BruteForce

open CipherCracker.SDES

let crack plaintext cipher =
    [0..255]
    |> List.filter (fun key ->
        let encrypted = encrypt key plaintext
        let result = encrypted |> List.fold (fun acc b -> (acc <<< 1) ||| b) 0
        result = cipher)