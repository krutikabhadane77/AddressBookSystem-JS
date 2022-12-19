let firstNameRegex = RegExp("^[A-Z]{1}[A-Za-z]{2,}$");
let lastNameRegex = firstNameRegex;
let addressRegex = RegExp("^.{4,}$");
let cityRegex = RegExp("^[a-zA-Z]{4,}$");
let stateRegex = RegExp("^[a-zA-Z\\s]{4,}$");
let zipCodeRegex = RegExp("^[1-9]{1}[0-9]{2}[\\s]?[0-9]{3}$");
let phoneRegex = RegExp("^[0-9]{1,}$");
let emailRegex = RegExp("^[a-zA-Z0-9+_-]+([.][a-zA-Z0-9]+)*@([a-zA-Z0-9]+)([.][a-z]+)?[.][a-z]{2,}$");

class ValidationError extends Error {
    constructor(message) {
      super(message); // (1)
      this.name = "ValidationError"; // (2)
    }
}

class Contacts{
    //properties
    firstName;
    lastName;
    address;
    city;
    state;
    zipCode;
    phone;
    email;

    //constructors
    constructor(...params){
        if(firstNameRegex.test(params[0])) this.firstName = params[0];
        else throw new ValidationError("Invalid First Name: "+params[0]);

        if(lastNameRegex.test(params[1])) this.lastName = params[1];
        else throw new ValidationError("Invalid Last Name: "+params[1]);

        //Checking for Duplicates
        //if(this.checkDuplicacy) throw new ValidationError("Record already exists.");

        if(addressRegex.test(params[2])) this.address = params[2];
        else throw new ValidationError("Invalid Address: "+params[2]);
        
        if(cityRegex.test(params[3])) this.city = params[3];
        else throw new ValidationError("Invalid City: "+params[3]);
       
        if(stateRegex.test(params[4])) this.state = params[4];
        else throw new ValidationError("Invalid State: "+params[4]);
        
        if(zipCodeRegex.test(params[5])) this.zipCode = params[5];
        else throw new ValidationError("Invalid ZIP Code: "+params[5]);
    
        if(phoneRegex.test(params[6])) this.phone = params[6];
        else throw new ValidationError("Invalid Phone Number: "+params[6]);

        if(emailRegex.test(params[7])) this.email = params[7];
        else throw new ValidationError("Invalid Email: "+params[7]);
    }

    //UC 7
    checkDuplicacy(firstName,lastName){
        let newContact = record.find(contact=>
            contact.firstName==firstName && contact.lastName==lastName);
        if(newContact==undefined) return false;
        else return true;
    }

    //toString method
    toString(){
        return "First Name="+this.firstName+" : Last Name="+this.lastName+" : Address="
                +this.address+" : City="+this.city+" : State="+this.state+" : ZipCode="+this.zipCode+
                " : Phone="+this.phone+" : Email="+this.email;
    }
}

//Create an obj
let contact = new Contacts("Narendra","Modi","PMOffice","NewDelhi","Delhi",114102,
                                    "9765422564","pmo@office.com");

//Pushing into array
let record=new Array()
record.push(contact);

record.push(new Contacts("Tanmay", "Jain", "Mahaveer Nagar", "Jaipur",
"Rajasthan", 302011, "9765485884", "mail.tanmay@gmail.com"));

record.push(new Contacts("Donal", "Trump", "White House", "Washington",
"Washington DC", 100001, "9999999999", "pm@gmai.com"));

record.push(new Contacts("Ravi", "Kumar", "JLN Marg", "Sampak",
"Madhya Pradesh", 230056, "9648515621", "rkboi@yahoo.com"));

console.log(record);

//UC 4
function searchContactAddress(firstName,lastName,newAddress){
    for (contact in record){
        if (contact.firstName==firstName && contact.lastName==lastName) contact.address=newAddress;
        console.log(contact);
    }
}

searchContactAddress("Tanmay","Jain","Malviya Nagar");

//UC 5
function deleteContact(firstName,lastName){
    for(let i=0;i<record.length;i++){
        if(record[i].firstName==firstName &&record[i].lastName==lastName) delete record[i];
    }
}

deleteContact("Narendra","Modi");
console.log(record);

//UC 6
function count(contactCount){
    return ++contactCount;
}

function getCount(){
    console.log("Contact Count: "+record.reduce(count,0)+"\n");
}
getCount();

//UC 7
/* record.push(new Contacts("Tanmay", "Jain", "Mahaveer Nagar", "Jaipur",
"Rajasthan", 302011, "9765485884", "mail.tanmay@gmail.com"));
 */

//UC 8
function searchContactOnCityState(firstName,city,state){
    let citySearch=record.filter(contact=>contact.firstName==firstName&&contact.city==city);
    let stateSearch=record.filter(contact=>contact.firstName==firstName&&contact.state==state);
    if (citySearch==undefined){
        if (stateSearch==undefined){
            console.log(firstName+" does not exist.");
        }else {console.log(contact);}
    }else {console.log(contact);}
}
searchContactOnCityState("Tanmay","Jaipur","");
searchContactOnCityState("Tanmay","","Rajasthan");
searchContactOnCityState("Tanmay","Jaipur","Rajasthan");

//UC9
function viewByCity(city){
    record.filter(contact=>contact.city==city).forEach(contact=>console.log(contact))
}

function viewByState(state){
    record.filter(contact=>contact.state==state).forEach(contact=>console.log(contact))
}
console.log("Who lives in Jaipur?");
viewByCity("Jaipur");
console.log("Who lives in MP?");
viewByState("Madhya Pradesh");

//UC 10
function getCountByCityState(cityOrState){
    let count = 0;
    record.filter(contact=>contact.city==cityOrState).forEach(contact=>++count);
    record.filter(contact=>contact.state==cityOrState).forEach(contact=>++count);
    return count;
}
console.log("Count in Jaipur: "+getCountByCityState("Jaipur"));
console.log("Count in Madhya Pradesh: "+getCountByCityState("Madhya Pradesh"));

//UC 11
function sortContactsByName(){
    sortContacts("name");
 }
 sortContactsByName();
 console.log("The sorted Address Book on Name is: ");
 console.log(record);

//UC 12
function sortContacts(type){
    switch(type){
        case "name": record.sort((contact1,contact2) => {
                        if (contact1.firstName>contact2.firstName) return 1;
                        else if (contact1.firstName<contact2.firstName) return -1;
                        return 0;
                        }); break;
        case "city": record.sort((contact1,contact2) => {
                        if (contact1.city>contact2.city) return 1;
                        else if (contact1.city<contact2.city) return -1;
                        return 0;
                        }); break;
        case "state": record.sort((contact1,contact2) => {
                        if (contact1.state>contact2.state) return 1;
                        else if (contact1.state<contact2.state) return -1;
                        return 0;
                        }); break;
        case "zip": record.sort((contact1,contact2) => {
                            return contact1.zipCode-contact2.zipCode;
                        }); break;
        default: console.log("Unsupported type.");
    }
}

sortContacts("city");
console.log("The sorted Address Book on City is: ");
console.log(record);

sortContacts("state");
console.log("The sorted Address Book on State is: ");
console.log(record);

sortContacts("zip");
console.log("The sorted Address Book on Zip Code is: ");
console.log(record);