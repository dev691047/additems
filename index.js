
const form=document.getElementById("form");
const itemList=document.getElementById("container");
const totalValue=document.getElementById("totalvalue");

function displayItem(data){
    const len=data.length;
    for(let i=0;i<len;i++){

      var li=document.createElement("li");
      var button=document.createElement("button");
      button.classList="btn";
      li.classList="list";
      li.idList=data[i]._id;
      button.appendChild(document.createTextNode("delete"));
      li.appendChild(button);
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
    axios.get("https://crudcrud.com/api/2a018348211f4caca9033f43283bc1cb/products")
    .then((res)=>{
        displayItem(res.data);
        displayCost(res.data);
        console.log(res.data)
}).catch((err=>console.log(err)));
})


form.addEventListener("submit",(e)=>{
    // e.preventDefault();
    var name=document.getElementById("name").value;
    var price=document.getElementById("sp").value;
    
    const obj={
        name,
        price
    }
    axios.post("https://crudcrud.com/api/2a018348211f4caca9033f43283bc1cb/products",obj)
    .then((res)=>{
        console.log(res.data);
        
    }).catch((err)=>console.log(err));
    
})




itemList.addEventListener("click",function(e){
    // e.preventDefault();
  if(e.target.classList.contains('btn')){
      if(confirm('are u sure??')){

           var li =e.target.parentElement;
           var id=e.target.parentElement.idList;
           console.log(id);
           axios({
            method:'delete',
            url:`https://crudcrud.com/api/2a018348211f4caca9033f43283bc1cb/products/${id}`,
           })
           .then(res=>console.log(res))
           .catch(err=>console.log(err));    
           itemList.removeChild(li);
          

      }
       
  }
  setTimeout(() => {
    document.location.reload();
  }, 500);
//   window.location.reload();
 
})
