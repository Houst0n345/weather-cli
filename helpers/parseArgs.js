const parseArgs = (args) => {
    const [executer, file, ...arg] = args
    return arg.reduce((acc, el, index, array) => {
        if (el.charAt(0) === '-'){
            const stringValueCondition = array.length > index+1 && array[index+1].charAt(0) !== '-'
            acc[el.substring(1)] = stringValueCondition ? array[index+1] : true
        }
        return acc
    }, {})
}

export { parseArgs }