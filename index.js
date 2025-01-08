function isArraysDuplicate(array1, array2) {
    if (!Array.isArray(array1) || !Array.isArray(array2)) {
        throw new Error("Invalid array provided");
    }

    const array1ElementInfo = getArrayElementsInfo(array1);
    const array2ElementInfo = getArrayElementsInfo(array2);
    const validElementTypes = ["object", "string", "number"];

    if (!validElementTypes.includes(array1ElementInfo.elementType) || !validElementTypes.includes(array2ElementInfo.elementType)) {
        throw new Error("Invalid array elements type, should be either object, string or number");
    }

    if (!array1ElementInfo.isSameType || !array2ElementInfo.isSameType) {
        throw new Error("Array should have same type of elements");
    }

    if (array1ElementInfo.elementType !== array2ElementInfo.elementType) {
        throw new Error("Both arrays should have same type of elements");
    }


    if (array1.length !== array2.length) {
        return false;
    }

    // Duplicate check for object type element array
    if (array1ElementInfo.elementType === "object") {
        return array1.every((item, index) => isDeepEqual(item, array2[index]));
    }

    // Duplicate check for primitive type element array
    return JSON.stringify(array1) === JSON.stringify(array2);

}

function getArrayElementsInfo(array) {
    let isSameType = false;
    let elementType = "";
    const arrayElementsTypes = [];
    array.forEach(element => {
        arrayElementsTypes.push(typeof element);
        switch (typeof element) {
            case "object":
                elementType = "object"
                break;
            case "string":
                elementType = "string";
                break;
            case "number":
                elementType = "number"
            default:
                break;
        }
    });

    if (new Set(arrayElementsTypes).size === 1) {
        isSameType = true;
    }

    return {
        isSameType,
        elementType
    };
}

function isDeepEqual(obj1, obj2) {

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key) || !isDeepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

module.exports = isArraysDuplicate;