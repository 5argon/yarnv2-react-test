export function divideFive(input : number)
{
    if(input > 10000)
    {
        throw new Error("This is too much")
    }
    return input / 5
}