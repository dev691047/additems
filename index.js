
const form=document.getElementById("form");
const itemList=document.getElementById("container");
const totalValue=document.getElementById("totalvalue");
let edit_id=null;
let array=[];

function displayItem(data){
    const len=data.length;
      itemList.innerHTML='';
      for(let i=0;i<len;i++){
      let li=document.createElement("li");
      let button=document.createElement("button");
      let editbutton=document.createElement("button");
      button.classList="btn";
      editbutton.classList="edtbtn";
      li.classList="list";
    //   li.idList=data[i]._id;
      li.setAttribute("id",data[i]._id);
      button.appendChild(document.createTextNode("delete"));
      editbutton.appendChild(document.createTextNode("edit"));
      li.appendChild(button);
      li.appendChild(editbutton);
      let itemList=document.getElementById("container");
      li.appendChild(document.createTextNode(data[i].name+" "+data[i].price));
      itemList.appendChild(li);
     
    }
}

//to display cost
function displayCost(data){   
    let total=0;
    for(let i=0;i<data.length;i++){
        total=total+(parseFloat(data[i].price));      
    }
    console.log(total)   
    totalValue.innerHTML=total;
}

window.addEventListener("DOMContentLoaded",async()=>{
 try{ 
   const res=await axios.get("https://crudcrud.com/api/0bc3688ab93441fab763ce147ba65c9b/products")
   array=res.data;
    displayItem(array);
    displayCost(array);

}
catch{(err)=> console.log(err)}
})

// form submit
form.addEventListener("submit",async (e)=>{
  
    try{
        e.preventDefault();
        console.log({edit_id});
        var name=document.getElementById("name").value;
        var price=document.getElementById("sp").value;
        
        const obj={
            name,
            price
        }  
    
        if(edit_id===null){     
                const res= await axios.post(`https://crudcrud.com/api/0bc3688ab93441fab763ce147ba65c9b/products`,obj)
                array.push(res.data);
                displayItem(array);
                displayCost(array);  
                document.getElementById("name").value="";
                document.getElementById("sp").value="";  
                    
        }

        else{
                console.log(edit_id);
                const res=await axios.put(`https://crudcrud.com/api/0bc3688ab93441fab763ce147ba65c9b/products/${edit_id}`,obj);
                let newArray = [];
                console.log({edit_id});

                newArray = array.map(val=>{
                    if(val._id==edit_id){
                     val.name = obj.name;
                     val.price = obj.price;   
                    }
                    return val;
                });

                console.log({newArray,array})
                array = newArray;
                displayItem(array);
                displayCost(array);               
                edit_id=null;
                console.log({edit_id});
                document.getElementById("name").value="";
                document.getElementById("sp").value="";    
                
            
        }  
    }
    catch{(err)=>console.log(err)};
    
})



// delete
itemList.addEventListener("click",async(e)=>{
try{
    if(e.target.classList.contains('btn')){
        if(confirm('are u sure??')){   
             var li =e.target.parentElement;
             var id=e.target.parentElement.id;
             console.log(id);
             
                 const res= await axios({
                  method:'delete',
                  url:`https://crudcrud.com/api/0bc3688ab93441fab763ce147ba65c9b/products/${id}`,
                   })
                   console.log(res);
                   itemList.removeChild(li);
                }
            }
            
}
catch{err=>console.log(err)};

})


// edit the list
itemList.addEventListener("click",async(e)=>{
   
    try{
        e.preventDefault();
        if(e.target.classList.contains('edtbtn')){
            var id=e.target.parentElement.id;
            edit_id=id;
            console.log("working")
           
               const res=await axios({
                   method:'get',
                   url:`https://crudcrud.com/api/0bc3688ab93441fab763ce147ba65c9b/products/${id}`,
                })
               document.getElementById("name").value=res.data.name;
               document.getElementById("sp").value=res.data.price;                             
   }
    }
    catch{er=>console.log(er)}
   
  }) 