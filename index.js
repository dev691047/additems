
const form=document.getElementById("form");
const itemList=document.getElementById("container");
const totalValue=document.getElementById("totalvalue");
var edit_id=null;

function displayItem(data){
    const len=data.length;
    for(let i=0;i<len;i++){
      var li=document.createElement("li");
      var button=document.createElement("button");
      var editbutton=document.createElement("button");
      button.classList="btn";
      editbutton.classList="edtbtn";
      li.classList="list";
      li.idList=data[i]._id;
      button.appendChild(document.createTextNode("delete"));
      editbutton.appendChild(document.createTextNode("edit"));
      li.appendChild(button);
      li.appendChild(editbutton);
      var itemList=document.getElementById("container");
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

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/41f49858018b4c679665c9ef33747c08/products")
    .then((res)=>{
        displayItem(res.data);
        displayCost(res.data);
        console.log(res.data)
}).catch((err=>console.log(err)));

})


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    var name=document.getElementById("name").value;
    var price=document.getElementById("sp").value;
    
    const obj={
        name,
        price
    } 
    if(edit_id===null){
        axios.post(`https://crudcrud.com/api/41f49858018b4c679665c9ef33747c08/products`,obj)
        .then((res)=>{
            console.log(res.data);
            document.location.reload();
            
        }).catch((err)=>console.log(err));
    }
    else{
        axios.put(`https://crudcrud.com/api/41f49858018b4c679665c9ef33747c08/products/${edit_id}`,obj)
        .then((res)=>{
            document.location.reload();
            console.log(res.data);
            if(edit_id!=null){
                edit_id==null;
            }
            
        }).catch((err)=>console.log(err));
        console.log(edit_id);
    }   
})



// delete
itemList.addEventListener("click",function(e){

  if(e.target.classList.contains('btn')){
      if(confirm('are u sure??')){
          
           var li =e.target.parentElement;
           var id=e.target.parentElement.idList;
           console.log(id);
           axios({
            method:'delete',
            url:`https://crudcrud.com/api/41f49858018b4c679665c9ef33747c08/products/${id}`,
           })
           .then(res=>{
              document.location.reload(); 
            console.log(res)})
           .catch(err=>console.log(err));    
           itemList.removeChild(li);
          } }
})


// edit the list
itemList.addEventListener("click",function(e){
    e.preventDefault();
    if(e.target.classList.contains('edtbtn')){
             var id=e.target.parentElement.idList;
             edit_id=id;
             axios({
                   method:'get',
                   url:`https://crudcrud.com/api/41f49858018b4c679665c9ef33747c08/products/${id}`,
                })
                .then((res)=>{
                    document.getElementById("name").value=res.data.name;
                     document.getElementById("sp").value=res.data.price;
                })
                .catch((err)=>console.log(err));          
    }  
  }) 