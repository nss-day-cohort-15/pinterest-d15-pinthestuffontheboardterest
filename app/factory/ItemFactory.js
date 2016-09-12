"use strict";

app.factory("ItemStorage", ($q, $http,localStorageService,FirebaseURL, AuthFactory) => {

let getUserPins = (user) => {
console.log( firebase.auth().currentUser); //FB has a built-in method to retrieve current user, i.e., "firebase.auth().currentUser"
    let Pins = [];
    return $q( (resolve, reject) => {    //Instead of returning a new promise via $ajax syntax, use this syntax instead: $q = new Promise
         $http.get('${FirebaseURL}/items.json?orderBy="uid"&equalTo="${user}"') //$http = $.ajax({
        //     url: .....json
        // })
        .success((itemObject) => { //Receive an object from Firebase, object contains each item list inside
            Object.keys(itemObject).forEach((key) => { //Takes every key in an object passed in and makes an array of each key. So we create an array of each FB item--doable because there's only one key in each object w/in larger/single Firebase object, and that's the object ID (aka name)
                itemObject[key].id = key; //Here we are setting a property on each object called id and making it synonymous with the object's name/sole key in larger Firebase object; SET A PROPERTY ON EACH ITEM OBJECT, AS IDENTIFIED BY ITS KEY, SYNONYMOUS WITH THAT KEY
                Pins.push(itemObject[key]); //Here we are pushing each each object into array
            });

            resolve(Pins); //Here we resolve: we officially have itemObject
            })
            .error((error) => {
                reject(error);
            });
    });
};

let getAllPins = function() {
      let user = localStorageService.get("currentUser");
      let uid = user.uid;
      console.log("uid", uid);
        let pins = [];
        return $q(function(resolve, reject) {

            $http.get(`${FirebaseURL}/items.json?orderBy="uid"&equalTo="${uid}"`)
            .success(function(pinsObject) {
                let pinsCollection = pinsObject;
                //create array from object and loop thru keys - saving fb key for each item inside the obj as an id property
                Object.keys(pinsCollection).forEach(function(key){
                    pinsCollection[key].id=key;
                    pins.push(pinsCollection[key]);
                });
                console.log("pins:", pins);
                resolve(pins);
            })
            .error(function(error) {
                reject(error);
            });
        });
};
let savePinsById = function(pins) {
    console.log(pins);
    return $q(function(resolve, reject) {
        $http.patch(`${FirebaseURL}/items/${pins[0].id}.json`, JSON.stringify({"id": `${pins[0].id}`}))
            .success(function(ObjFromFirebase) {
                console.log(ObjFromFirebase);
                resolve(ObjFromFirebase);
            })
            .error(function (error) {
                reject (error);
            });
    });
};
let deletePin = (removeId) => {
    let pinUrl = FirebaseURL+ "/items/"+removeId+".json";
    return $q( (resolve, reject) => {
        $http.delete(pinUrl)
        .success( (objFromFirebase) => {
            resolve(objFromFirebase);
        });
    });
};

let addPin = function(newPin) {
       return $q(function(resolve, reject) {
           $http.post(`${FirebaseURL}/items.json`,
               JSON.stringify(newPin))
               .success(function(ObjFromFirebase) {
                       console.log(ObjFromFirebase);
                   resolve(ObjFromFirebase);
               })
               .error(function (error) {
                   reject (error);
               });
       });
   };





    return {getUserPins, getAllPins, savePinsById, addPin, deletePin}; //Have to return getItemList method as an object to access it elsewhere ==> curly braces/object return are an indicator of modularity (like module.exports/require syntax in browserify?)
});
