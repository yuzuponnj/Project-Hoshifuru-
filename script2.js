// ==============================
// 星降る短冊 - 願いの庭
// script.js Ver.0.3
// ==============================



// ----------------------------
// オープニング
// ----------------------------

window.addEventListener("load",()=>{

const opening=
document.getElementById("opening");


setTimeout(()=>{

opening.style.opacity="0";


setTimeout(()=>{

opening.style.display="none";

},1000);


},5000);


});




// ----------------------------
// 流れ星
// ----------------------------

const shootingStar=
document.querySelector(".shooting-star");


function createShootingStar(){


if(!shootingStar)return;


shootingStar.style.top=
Math.random()*50+"%";


shootingStar.style.animation="none";


setTimeout(()=>{

shootingStar.style.animation=
"shoot 2s linear";

},100);


}


setInterval(createShootingStar,8000);

createShootingStar();





// ----------------------------
// データ保存
// ----------------------------


let wishes=
JSON.parse(
localStorage.getItem("wishes")
)
||
[];





// ----------------------------
// 色選択
// ----------------------------

const colors=
document.querySelectorAll(".colors button");


const paper=
document.querySelector(".tanzaku");


let selectedColor=
"#fff4b8";



colors.forEach(color=>{


color.addEventListener("click",()=>{


selectedColor=
getComputedStyle(color)
.backgroundColor;


paper.style.background=
selectedColor;


});


});





// ----------------------------
// アイコン
// ----------------------------


let selectedIcon="⭐";


const icons=
document.querySelectorAll(".icons button");



icons.forEach(btn=>{


btn.addEventListener("click",()=>{


selectedIcon=
btn.textContent;


icons.forEach(i=>{

i.classList.remove("selected");

});


btn.classList.add("selected");


});


});





// ----------------------------
// 願いを結ぶ
// ----------------------------


const submit=
document.getElementById("submit");



submit.addEventListener("click",()=>{


const textarea=
document.querySelector("textarea");



if(textarea.value.trim()==""){

alert("願いを書いてください🌠");

return;

}




const wish={


text:
textarea.value,


icon:
selectedIcon,


color:
selectedColor,


date:
Date.now()


};




wishes.push(wish);




localStorage.setItem(
"wishes",
JSON.stringify(wishes)
);




addWishToBamboo(wish);

createWishStar();




textarea.value="";



paper.animate(

[
{
transform:"translateY(0)"
},

{
transform:
"translateY(-80px) rotate(10deg)",
opacity:0
}

],

{
duration:1500
}

);



setTimeout(()=>{

paper.style.opacity="1";

},1500);



alert(

"🌌\n願いを笹へ結びました"

);



});





// ----------------------------
// 笹へ短冊追加
// ----------------------------



const wishArea=
document.getElementById("wish-area");



function addWishToBamboo(wish){



const tanzaku=
document.createElement("div");



tanzaku.className=
"small-tanzaku";



tanzaku.style.background=
wish.color;



tanzaku.innerHTML=

`
<span>${wish.icon}</span>
<br>
${wish.text}
`;



tanzaku.style.left=
Math.random()*80+"%";


tanzaku.style.transform=
`rotate(${Math.random()*20-10}deg)`;



wishArea.appendChild(tanzaku);



}





// ----------------------------
// 保存済み願い復元
// ----------------------------


wishes.forEach(wish=>{


addWishToBamboo(wish);


createWishStar();


});






// ----------------------------
// 星追加
// ----------------------------


function createWishStar(){


const star=
document.createElement("span");


star.className=
"wish-star";


star.textContent="✦";


star.style.left=
Math.random()*100+"%";


star.style.top=
Math.random()*80+"%";



document.body.appendChild(star);



}





// ----------------------------
// みんなの願い
// ----------------------------


document
.getElementById("view")
.addEventListener("click",()=>{


if(wishes.length===0){

alert(
"まだ願いはありません🌙"
);

return;

}



let result=
"🌌 みんなの願い\n\n";



wishes.forEach((w,i)=>{


result+=

`${i+1}.
${w.icon}${w.text}

`;


});



alert(result);



});





// ----------------------------
// 合言葉
// ----------------------------


function unlock(){


const answer=
prompt(
"合言葉を入力してください"
);



if(answer==="願いを夜空へ"){


alert(
"✨秘密の庭園が開きました✨"
);


document.body
.classList.add("unlocked");


}else{


alert(
"合言葉が違います🌙"
);


}


}