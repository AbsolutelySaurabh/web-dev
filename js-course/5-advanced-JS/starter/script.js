var Person = function(name, yob, job){
    
    this.name = name;
    this.yob = yob;
    this.job = job;
}
//another way of creating cons
function Person(name, yob, job, father){
    
    //.......
}

var john = new Person('John', "13-01-1997", "SDE");

Person.prototype.lastname = "Singh";

var seema = new Person('seema', "123", "barber", "singh");