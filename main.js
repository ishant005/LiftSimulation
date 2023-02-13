let simulate=document.querySelector('.createBtn');

let backToFirstPage=document.querySelector('.goToFirstPage');

// select div for first page
let firstPageSelector= document.querySelector('.firstPage');

// select div for second page
let secondPageSelector=document.querySelector('.secondPage');

backToFirstPage.addEventListener('click',hideSecondPage);

simulate.addEventListener('click',(e)=>{
     e.preventDefault();

let floorInputValue=document.querySelector('#floorNumber').value;
let liftInputValue=document.querySelector("#liftNumber").value;

if(floorInputValue=="" || liftInputValue=="")
{
     alert('please enter the value')
}
else if(floorInputValue>=8){
     alert('please enter max 7 floors')
}
else if(window.innerWidth<=500 && +liftInputValue>4)
{
    alert("this screen size cant have more than 4 lits")
}
// when silmulate button clicked second page open
else{
  firstPageSelector.style.display='none';
  secondPageSelector.style.display='block';

    //  function makingFloors is for floors and lifts
    makingFloors();
}
})

// for hiding the second page
function hideSecondPage(){
     firstPageSelector.style.display='flex';
     secondPageSelector.style.display="none";
}
// now start making the floors and the lift
function makingFloors(){
   let floorInput=document.querySelector('#floorNumber').value;
   let liftInput=document.querySelector('#liftNumber').value;

   for(let i=floorInput;i>0;i--){
        let floordiv=document.createElement('div');
        floordiv.className="liftBox";
        
        let buttonLift=document.createElement('div');
        buttonLift.className="buttonLift";

        let button1div=document.createElement('div');
        button1div.className="button";

        // button1 create
        let button1=document.createElement('button');
        let text1=document.createTextNode("Up");

        button1.className="up";
        button1.setAttribute('id',`up${i}`);
        button1.appendChild(text1);

        // button2 create
        let button2=document.createElement("button");
        let text2=document.createTextNode("Down");
        button2.className="down";
        button2.setAttribute('id',`down${i}`);
        button2.appendChild(text2);
      
        button1div.appendChild(button1);
        button1div.appendChild(button2);

        buttonLift.appendChild(button1div);
        floordiv.appendChild(buttonLift);

        // creating hr floor
        let hrdiv=document.createElement('div');
        hrdiv.className="hrfloorName";

        let hr=document.createElement('hr');

        let spanFloorNo=document.createElement('span');
        spanFloorNo.innerText=`Floor ${i}`;

        hrdiv.appendChild(hr);
        hrdiv.appendChild(spanFloorNo);

        floordiv.appendChild(hrdiv);
        
        document.querySelector('.secondPage').appendChild(floordiv);
        if(i==floorInput){
             button1.style.display='none';
        }
        if(i==1){
            button2.style.display='none'
        }
        
   }
// lets create a lift
let mainLift=document.createElement('div');
mainLift.className='mainLift';

for(let j=1;j<=liftInput;j++){
     let liftdiv=document.createElement('div');
     liftdiv.className='lift';
     liftdiv.setAttribute('id',`lift${j}`);
     
     liftdiv.setAttribute('flag','free');

     let gates=document.createElement('div');
     gates.className='gates';
     gates.setAttribute('id',`gates`);

     let gate1=document.createElement('div');
     gate1.className="gate1";

     gates.appendChild(gate1);

     let gate2=document.createElement('div');
     gate2.className="gate2";
     gates.append(gate2);
     liftdiv.appendChild(gates);

     mainLift.appendChild(liftdiv);

}
const mainButtonLift=document.querySelectorAll('.buttonLift');

const lastBox=mainButtonLift[mainButtonLift.length-1];

lastBox.appendChild(mainLift);

// selecting all lift we created above using querySelectorAll
let selectAllLift=document.querySelectorAll('.lift');

let up=document.querySelectorAll('.up');

let down=document.querySelectorAll('.down');

let nUp=up.length;
let prev=2;

let oldFloorValueArray=[];

for(let i=0;i<selectAllLift.length;i++){
       oldFloorValueArray.push(1);
}
// console.log(oldFloorValueArray[1]);
up.forEach((e,i)=>{
     e.addEventListener('click',()=>{
            let floorValue=nUp-i;
            for(let i=0;i<selectAllLift.length;i++){
                if(selectAllLift[i].getAttribute('flag')==='free'){
                    selectAllLift[i].setAttribute('flag','busy');

                    // call a function movelift
                 moveLift(selectAllLift[i],floorValue,oldFloorValueArray[i]);
                 oldFloorValueArray[i]=floorValue;
                 break;
                }
            }
     })
})
down.forEach((e,i)=>{
     e.addEventListener('click',()=>{
            let floorValue=nUp-i;
            for(let i=0;i<selectAllLift.length;i++){
                if(selectAllLift[i].getAttribute('flag')==='free'){
                    selectAllLift[i].setAttribute('flag','busy');

                    // call a function movelift
                 moveLift(selectAllLift[i],floorValue,oldFloorValueArray[i]);
                 oldFloorValueArray[i]=floorValue;
                 break;
                }
            }
     })
})

function moveLift(liftno,floorNo,oldFloorValue){
     
       liftno.style.transform=`translateY(${-115*(floorNo-1)}px)`;
          //  liftno.style.transform=`translateY(-240px)`

       let prev=`${2 * Math.abs(floorNo-oldFloorValue)}s`

       liftno.style.transitionDuration=prev;


       setTimeout(()=>{
           gateopenclose(liftno);
           setTimeout(()=>{ 
                liftno.setAttribute('flag','free')
           },4500);
           console.log(liftno.getAttribute('flag'))
       },2*Math.abs(floorNo-oldFloorValue)*1000)
}
function gateopenclose(liftno){
     let gates=liftno.firstChild;
     let gate1=document.querySelector('.gate1');
     let gate2=document.querySelector('.gate2');

     setTimeout(()=>{
           gates.children[0].style.width='3px';
           gates.children[1].style.width="3px";
     },1000);

  setTimeout(()=>{
      gates.children[0].style.width='25px';
      gates.children[1].style.width="25px"
         },3000)

}

 
}

