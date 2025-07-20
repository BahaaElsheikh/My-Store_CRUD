 

let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let count = document.getElementById("count");
let category = document.getElementById("category");
let total = document.getElementById("total");

let submit = document.getElementById("submit");

let search =  document.getElementById("search");

let mode = "create";
let index;

let searchMode;
// Get total

function getTotal() {
    
    

    if (price.value != "") { //if the price input has a value
        
        // do calculations
    total.innerHTML   = (Number(price.value)+ Number(taxes.value)  ) -Number(discount.value); 
        total.style.background = "rgb(0, 180, 33)";// Change the color of total to green
    }

    else if (price.value == "") { // if price input is empty 
        total.innerHTML = " ________"; // set total to default
         total.style.background = "rgb(70, 72, 70)"; // set total color to default
    }
   if (total.innerHTML.length>7) { // if price number includes mora than 7 characters 
       total.innerHTML = total.innerHTML.slice(0, 7) //take just the first 7 character (avoid over line )
       
   }

}

//----------------------------------------------------------


let productData = []//main array



//----------------------------------------------------------

// *Create product 

submit.onclick = function () { 
     
     console.log(mode);
    


    let newProduct = { // create an Object & set properties to inputs 
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        discount: discount.value,
        total: total.innerHTML,
        count:count.value,
        category:category.value,

    }

    //* Create by count


    if (mode == "create") {
       
        //>>>>>>>>>>>>>>>>>>

        if (newProduct.count > 1) {

            for (let i = 0; i < newProduct.count; i++){
                productData.push(newProduct)
            
            }
        }

    else {
        productData.push(newProduct) // add the new object to the array 
        
        }
    }
    
    if (mode == "update") {
        
        productData[index] = newProduct;
        
        mode="create"
    }


    // localStorage.setItem("products", JSON.stringify(productData)) // save the array in localStorage (as string) Under key products
    

    clearInput();//call the function clearInput
    showData()
    checkMode()
    
}
// *Save localStorage

// if (localStorage.products  !="" ) { // when localStorage is not empty 
    
//     productData = JSON.parse(localStorage.products) // the main array = localStorage 
    
// }


//----------------------------------------------------------

//* Clear inputs

function clearInput() {// Automatic set all inputs value to ""
    title.value = ""
    price.value=""
    taxes.value = ""
    discount.value = ""
    count.value=""
    category.value = ""
    total.innerHTML = "________"
    getTotal()
    
}



//----------------------------------------------------------


// *Read


function showData() {

    let tbody = document.getElementById("tbody")
    let table = "";
       
    for (let i = 0; i < productData.length; i++){
        
        table += ` <tr>
                    <td>${i + 1}- </td>
                    <td>${productData[i].title}</td>
                    <td>${productData[i].price}</td>
                    <td>${productData[i].taxes}</td>
                    <td>${productData[i].discount}</td>
                    <td>${productData[i].total}</td>
                    <td>${productData[i].category}</td>
                
                    <td><button id="update" onclick = update(${i})>Update</button></td>
                    <td><button id="delete" onclick="deleteElement(${i})" >Delete</button></td>
                
                </tr>`;
         
    }
    
    tbody.innerHTML = table;

    
    let deleteBtn = document.getElementById("deleteAll")
    
        if (productData.length >  0) {
            
        
            deleteBtn.innerHTML = `<button onclick = "deleteAll()"> Delete All (${productData.length})</button>`;
        }
        else {
            deleteBtn.innerHTML = "";
        }
        

}
showData()


//----------------------------------------------------------

//* Delete one element/

function deleteElement(i) {
   
   
    productData.splice(i,1); // remove the element from the main array 
    localStorage.products = JSON.stringify(productData);// adding the array (after deleting th element) to local storage

   showData(); 
}



//* Delete All


function deleteAll() {
    
    productData.splice(0);
    console.log(productData);

    localStorage.products = "";

  showData();
}

//* Update
function update(i) {

    title.value = productData[i].title;
    price.value= productData[i].price
    taxes.value = productData[i].taxes
    discount.value = productData[i].discount
    category.value = productData[i].category
    getTotal()
    scroll({top:0, behavior: "smooth"})
    mode = "update";

    
    index = i;
    showData()
    checkMode()
}




//* Search
function searchByTitle() {
    search.style.display = "block"
    search.focus();
    searchMode="title"
    search.placeholder = "Search By Title"
    search.value = ""
     showData()
}
function searchByCategory() {
     search.style.display = "block"
    search.focus();
    searchMode = "category"
    search.placeholder = "Search By Category"
    search.value = ""
    showData()
}

function searchMethod(value) {
    let table = "";
    if (searchMode == "title") {
        
        if (value != "") {
            
            for (let i = 0; i < productData.length; i++){
                if (productData[i].title.toLowerCase().trim().includes(value.toLowerCase().trim())) {
                    console.log(productData[i].title);
                    
                    
                        
                                            table += ` <tr>
                                                                <td>${i + 1}- </td>
                                                                <td>${productData[i].title}</td>
                                                                <td>${productData[i].price}</td>
                                                                <td>${productData[i].taxes}</td>
                                                                <td>${productData[i].discount}</td>
                                                                <td>${productData[i].total}</td>
                                                                <td>${productData[i].category}</td>
                                                            
                                                                <td><button id="update" onclick = update(${i})>Update</button></td>
                                                                <td><button id="delete" onclick="deleteElement(${i})" >Delete</button></td>
                                                            
                                                            </tr>`;
                                            tbody.innerHTML = table;

                                           


                   
                    
                }
                
            }
        }

        
    }
    else if (searchMode == "category") {
          if (value != "") {
            
            for (let i = 0; i < productData.length; i++){
                if (productData[i].category.toLowerCase().trim().includes(value.toLowerCase().trim())) {
                    console.log(productData[i].category);
                    
                    
                        
                                            table += ` <tr>
                                                                <td>${i + 1}- </td>
                                                                <td>${productData[i].title}</td>
                                                                <td>${productData[i].price}</td>
                                                                <td>${productData[i].taxes}</td>
                                                                <td>${productData[i].discount}</td>
                                                                <td>${productData[i].total}</td>
                                                                <td>${productData[i].category}</td>
                                                            
                                                                <td><button id="update" onclick = update(${i})>Update</button></td>
                                                                <td><button id="delete" onclick="deleteElement(${i})" >Delete</button></td>
                                                            
                                                            </tr>`;
                                            tbody.innerHTML = table;

                                           


                   
                    
                }
                
            }
        }
    }
    tbody.innerHTML = table;
}

function checkMode() {
    if (mode=="create") {
        submit.innerHTML="Create +"
        submit.style.backgroundColor="rgb(18, 18, 250)"
        console.log("Create +");
        count.style.display="block"
    }
    else if (mode=="update") {
        submit.innerHTML = "Update ⤴"
        submit.style.backgroundColor = "rgb(25, 200, 5)"
        count.style.display="none"
        console.log("Update ⤴");

    }
}

// clean data