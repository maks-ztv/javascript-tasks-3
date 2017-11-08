'use strict';

// Метод, который будет выполнять операции над коллекцией один за другим
module.exports.query = function (collection,...funcs
)
{
    funcs.forEach(function (el) {
        collection = el(collection);
        console.log(collection, 'collection');
    })
}

// Оператор reverse, который переворачивает коллекцию
module.exports.reverse = function () {
    //console.log(changedCollection);

    return function (collection) {
        var changedCollection = collection.reverse();

        // Возращаем изменённую коллекцию
        return changedCollection;
    };
};

module.exports.select = function (...arg){
    return function (collection) {
        var exportNew = collection.map(function (currentValue) {
            var obj = {};
            for (var key in currentValue) {
                if (arg.indexOf(key) != -1) {
                    obj[key] = currentValue[key];
                }
            }
            return obj;
        });
        return exportNew;
    }
}
;

module.exports.filterIn = function (name, value) {
    return function (collection) {
        var exportNew = collection.filter(function (currentValue) {
            return !(value.indexOf(currentValue[name]) === -1)
        });
        return exportNew;
    }
};

module.exports.sortBy = function (type, typeFilter) {
    return function (collection) {
        var exportNew = collection.sort(function (a, b) {
            if (typeFilter === 'asc') {
                return a[type] - b[type]
            } else if (typeFilter === 'desc') {
                return b[type] - a[type]
            }
        });
        return exportNew

    }
};

module.exports.format = function (gender, valueFn) {
    return function (collection) {
        var exportNew = collection.map(function (currentValue) {

            currentValue[gender] = valueFn(currentValue[gender]);
            return currentValue
        });

        return exportNew
        //console.log(exportNew);
    }
};

// Оператор limit, который выбирает первые N записей
module.exports.limit = function (n) {
    return function (collection) {
        if(collection.length > n) {
            collection.length = n
        }
        return collection
    }


    // Магия
};


// Вам необходимо реализовать остальные операторы:
// select, filterIn, filterEqual, sortBy, format, limit

// Будет круто, если реализуете операторы:
// or и and

