export default function average(array: number[]){
    return array.reduce((acc, curr) => {return acc + curr}, 0) / array.length
}