const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/"

let dropdown=document.querySelectorAll(".dropdown select");


const from=document.querySelector(".from select")
const to=document.querySelector(".to select")
const btn=document.querySelector("button");
const msg=document.querySelector(".msg");

for(let select of dropdown){
    for(currCode in countryList ){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode ==="USD"){
            newOption.selected="selected";
        }
        else if (select.name === "to" && currCode === "INR"){
            newOption.selected="selected";
        }
        select.append(newOption)
    }
    select.addEventListener("change" ,(evt)=>{
        update_flag(evt.target);
    })
}

const update_flag =(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}





btn.addEventListener("click", async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amount_value=amount.value;
    
    if(amount_value ==="" || amount_value <1)
    {
        amount=1;
        amount_value="1";
    }

    const URL=`${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`;
    console.log(from.value,to.value);
    let response=await fetch(URL)
    let data=await response.json();
    let rate=data[to.value.toLowerCase()];
    let final_amount=amount_value*rate;
    msg.innerText=`${amount_value} ${from.value}  = ${final_amount} ${to.value}`

});