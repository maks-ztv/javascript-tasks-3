'use strict';

// Метод, который будет выполнять операции над коллекцией один за другим
module.exports.query = function (collection, ...funcs /* операторы через запятую */) {
    funcs.forEach(function (f) {
        collection = f(collection);
    });
    console.log(collection);
    // console.log(funcs[](collection));
};

// Оператор reverse, который переворачивает коллекцию
// module.exports.reverse = function () {
//     return function (collection) {
//         var changedCollection = collection.reverse();
//
//         // Возращаем изменённую коллекцию
//         return changedCollection;
//     };
// };

// Вам необходимо реализовать остальные операторы:
// select, filterIn, filterEqual, sortBy, format, limit

//Select function
module.exports.select = function (...args) {
    return function (array) {
        return array.map(function (el) {
            var obj = {};
            Object.keys(el).forEach(function (key) {
                if (args.indexOf(key) !== -1) {
                    obj[key] = el[key];
                }
            });
            return obj;
        });
    };
};

//FilterIn function
module.exports.filterIn = function (key, values) {
  return function (array) {
      return array.filter(function (el) {
          return values.indexOf(el[key]) !== -1;
      });
  };
};

//SortBy function
module.exports.sortBy = function (key, order) {
    return function (array) {
        return array.sort(function (a, b) {
            return order == 'asc' ? a[key] - b[key] : b[key] - a[key];
        });
    };
};

//Format function
module.exports.format = function (f) {
    return function (array) {
        return array.map(f);
    };
};

//Limit function
module.exports.limit = function (n) {
    return function (array) {
        array.length = n;
        return array;
    };
};
