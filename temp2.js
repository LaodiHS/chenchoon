// fuction that takes in a string returns the thrid char 

// str = type string return
// interval int
// return string 
// 
function intervalCharFromString(str, interval) {
        
    let intervalArray = [];
    let i = interval < 0 ? str.length + interval : interval - 1;
    for (; i < str.length && i >= 0; i += interval) {
        intervalArray.push(str[i])
    }

    return intervalArray.length ? intervalArray.join("") : "";
}





let c = [intervalCharFromString("abcdefghij", -3) === "heb",
intervalCharFromString("abcdefghij", 3) === "cfi",
intervalCharFromString("abcdefghij", 4) === "dh",
intervalCharFromString("abcdefghij", -4) === "gc",
intervalCharFromString("abcdefghij", -5) === "fa",
]

console.log(c)
console.log("all tests pass: ", c.every(v => v))








// The Department of Equality has hired you to design a smart parking lot software. 
// The smart parking lot is designed around equality and will rotate the good parking spots through the whole company.
// The parking lot has many levels and each level has multiple spots. Some spots are handicapped, and others have electrical charging spots. 
// There are 2 booths (entrances) which are fully automated and will assign the parking spot to each car once detected.


// class employess

// -id; pk 
// -first_name string/varchar
// -last_name string/varchar
// -vin string array text ,
// -parking_history textlong,

// class parking_spots
// id; auto incrament primary key int
// hadycaped_parking_stalls string/varchar
// electrical_charing_stals string/varchar
// total_parking_spots int
// parking_level int
// latitude long
// logtitude long
// altitude int





// class enternces 
// id: auto incrament primary key int 



// no point to add a seperate class for parking_history. 
// Textlong can hold 4 GB of text. textlong are documents staticaly stored.
// The sql query just a reference to a document. 
// The penality agregating user data from a parking_history table does not serve the use case in this exmaple.
// A seperate parking_history table adds complexity, because the assocation is monodirectional,
// parking_history is monodirectionaly related to the users information. 
//  A simple leaf node from the users table in the form of a textlong input is enought of an abstraction for this use case.  









// class rotating_value




