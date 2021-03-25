//4․ Ստեղծել myMap մեթոդ Array-ի համարար , որը կաշխատի ինչպես map մեթոդը.
// [].map(fn) -ը կարողանանք գրել [].myMap(fn) -ի միջոցով ։
Object.defineProperty(Array.prototype, 'myMap', {
    configurable: false,
    writable: false,
    enumerable: false,
    value: function (fn) {
        const arr = [];
        for (let i = 0; i < this.length; i++) {
            arr.push(fn(this[i], i, this));
        }
        return arr;
    }
});

const a ={
    "test": 10
}
Object.defineProperty(a, 'new', {
    enumerable:false,
    value:5
});
console.log(a.new);

for (let key in a){
    console.log(key);
}


Array.prototype.myForEach = function (fn) {
    for (let i = 0; i < this.length; i++) {
        fn(this[i], i, this);
    }
};

console.log([1, 2, 3].map(function (value, index, array) {
    return value * 2;
}));
console.log([1, 2, 3].myMap(function (value, index, array) {
    return value * 2;
}));
