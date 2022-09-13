

function createRows(name, dataType, nullable, iskey) {
    return{name, dataType, nullable, iskey}
}

//Organize the array of data for each column
export function ColumnOrder( arr ) {
    let orderedArray = [];
    console.log(arr.length)

    for (let i = 0; i < arr.length; i += 5) {
        orderedArray.push(createRows(arr[i + 1],arr[i + 2],arr[i + 3],arr[i + 4],));
    }
    return (orderedArray)
}

