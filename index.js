
const form=document.getElementById("form");
const itemList=document.getElementById("container");
const totalValue=document.getElementById("totalvalue");

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
function displayCost(data){
    
    let total=0;
    for(let i=0;i<data.length;i++){
        total=total+(parseFloat(data[i].price));
       
    }
    console.log(total)
    
    totalValue.innerHTML=total;

}

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/eda4f02e86324a6b9db13f140599e09a/products")
    .then((res)=>{
        displayItem(res.data);
        displayCost(res.data);
        console.log(res.data)
}).catch((err=>console.log(err)));
})


form.addEventListener("submit",(e)=>{
    var name=document.getElementById("name").value;
    var price=document.getElementById("sp").value;
    
    const obj={
        name,
        price
    }
    axios.post("https://crudcrud.com/api/eda4f02e86324a6b9db13f140599e09a/products",obj)
    .then((res)=>{
        console.log(res.data);
        
    }).catch((err)=>console.log(err));
    
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
            url:`https://crudcrud.com/api/eda4f02e86324a6b9db13f140599e09a/products/${id}`,
           })
           .then(res=>{
              document.location.reload();
            //   window.location.reload();

            console.log(res)})
           .catch(err=>console.log(err));    
           itemList.removeChild(li);
          

      }
       
  }

 
})


// edit
itemList.addEventListener("click",function(e){
    if(e.target.classList.contains('edtbtn')){
        
  
             var li =e.target.parentElement;
             var id=e.target.parentElement.idList;
             axios({
                   method:'get',
                   url:`https://crudcrud.com/api/eda4f02e86324a6b9db13f140599e09a/products/${id}`,
                })
                .then((res)=>{
                    document.getElementById("name").value=res.data.name;
                     document.getElementById("sp").value=res.data.price;

                     axios({
                        method:'delete',
                        url:`https://crudcrud.com/api/eda4f02e86324a6b9db13f140599e09a/products/${id}`,
                       })
                       .then(res=>{
                          console.log(res);
                          itemList.removeChild(li);
                      })
                       .catch(err=>console.log(err));    
                })
                .catch((err)=>console.log(err));



            
            
            
  
        
         
    }  
  })
