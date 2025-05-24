module CipherCracker.SDES

let permute pattern input =
    pattern |> List.map (fun i -> (input >>> (7 - i)) &&& 1)

let xorBits bits1 bits2 =
    List.map2 (^^^) bits1 bits2

let encrypt key plaintext =
    let keyBits = permute [0..7] key
    let ptBits = permute [0..7] plaintext
    xorBits ptBits keyBits