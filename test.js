function setName(obj) {
    obj.name = "aaaaaa";
    obj = {};
    obj.name = "cccc";
}

var person = new Object();
setName(person);
console.log(person.name);
