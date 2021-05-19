export default function(input: string): string {
    let loopSize = 0;
    const publicKey1 = 14205034;
    let currentTransformation = 1;
    while(currentTransformation !== publicKey1){
        loopSize++;
        currentTransformation *= 7;
        currentTransformation %= 20201227;
    }

    currentTransformation = 1;
    for(let i = 0; i < loopSize; i++){
        currentTransformation *= 18047856;
        currentTransformation %= 20201227;
    }

    return currentTransformation.toString()
}