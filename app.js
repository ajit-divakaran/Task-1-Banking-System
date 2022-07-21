

const test = document.querySelector(".list ");
const accNo = document.querySelectorAll(".accNo");
const trans = document.querySelector(".transfer");
const popup = document.querySelector(".popup");



if (localStorage.length === 0){
    let accountNumber = [];
    let balance = [];

    accNo.forEach( e =>{
    accountNumber.push(e.innerHTML);
    });

    accNo.forEach( e =>{
        balance.push(e.nextElementSibling.innerHTML);
    });

    for (x=0;x<accountNumber.length; x++){
            localStorage.setItem(accountNumber[x],balance[x]);
        };
}

else{
    accNo.forEach(x=>{
        x.nextElementSibling.innerText = localStorage.getItem(x.innerText);
    })
}




function Transfer(receive,send,amount){
    let receiverAmount = parseInt(localStorage.getItem(receive));
    let senderAmount = parseInt(localStorage.getItem(send));
   
    console.log(`send: ${senderAmount}, acc: ${send}`);
    console.log(`receive: ${receiverAmount}, acc: ${receive}`);
    receiverAmount += parseInt(amount) ;
    senderAmount -= parseInt(amount);
    
    
    localStorage.setItem(receive,receiverAmount);
    localStorage.setItem(send,senderAmount);
   
    return [localStorage.getItem(receive), localStorage.getItem(send)] ;
}

test.addEventListener("click" , e=>{
    e.preventDefault();

    if(e.target.classList.contains("money")){
        let money = e.target.parentElement.previousElementSibling.previousElementSibling;
        
            const tag = `<div class="account">
            <span>From Account: </span>
            <span>${money.textContent}</span>
            </div>`

            popup.innerHTML+=tag;
           
           
            if((popup.children[(popup.children.length)-1].classList.contains("account")) && (popup.children[(popup.children.length)-2].classList.contains("account"))){
                popup.lastElementChild.previousElementSibling.remove();
            }


  
    };

    
});



trans.addEventListener("click", x=>{
    x.preventDefault();
    trans.setAttribute('data-dismiss','modal');
    let transferAccount = document.querySelector("#enterName").value;
    let amount = document.querySelector("#enterAmount").value; // string
    let senderAccount = popup.lastElementChild.lastElementChild.innerText // string
    
    // console.log(localStorage.getItem(senderAccount), localStorage.getItem(transferAccount)); Details befor sending

  
    
    if((localStorage.getItem(senderAccount) == 0) || (parseInt(amount) > parseInt(localStorage.getItem(senderAccount)))){
            alert(`Sorry! Insufficient Bank balance`);
            
                popup.lastElementChild.remove();
            
            
    }    
        

    else if(transferAccount in localStorage){
        let [a,b]= Transfer(transferAccount,senderAccount,amount);
        // console.log(`receiver amount: ${a},sender amount: ${b}`);  Details after Sending successful transaction
        
        
        accNo.forEach(e=>{
            if(e.innerText.includes(senderAccount)){
                    e.nextElementSibling.innerText = b;
            }
        });
        
        accNo.forEach(e=>{
            if(e.innerText.includes(transferAccount)){
                e.nextElementSibling.innerText = a;
            }
        }); 

        alert("Successful Transaction");

            popup.lastElementChild.remove();
        
    }

    else{
        alert(`Error:${transferAccount} is an invalid input`);
       
            popup.lastElementChild.remove();
        
    }

});


