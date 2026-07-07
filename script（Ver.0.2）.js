// ==============================
// 星降る短冊 - 願いの庭
// script.js Ver.0.2
// ==============================


// ----------------------------
// オープニング
// ----------------------------
window.addEventListener("load",()=>{
    const opening=document.getElementById("opening");

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

const shootingStar=document.querySelector(".shooting-star");

function createShootingStar(){

    if(!shootingStar) return;

    const top=Math.random()*50;

    shootingStar.style.top=top+"%";
    shootingStar.style.animation="none";

    setTimeout(()=>{
        shootingStar.style.animation="shoot 2s linear";
    },100);

}

setInterval(createShootingStar,8000);
createShootingStar();


// ----------------------------
// 短冊カラー
// ----------------------------

const colors=document.querySelectorAll(".colors button");
const paper=document.querySelector(".tanzaku");

let selectedColor="#fff";

colors.forEach(color=>{

    color.addEventListener("click",()=>{

        selectedColor=
        getComputedStyle(color).backgroundColor;

        paper.style.background=
        selectedColor;

    });

});


// ----------------------------
// アイコン選択
// ----------------------------

let selectedIcon="⭐";

const iconButtons=
document.querySelectorAll(".icons button");


iconButtons.forEach(btn=>{

    btn.addEventListener("click",()=>{

        selectedIcon=btn.textContent;


        iconButtons.forEach(i=>{
            i.style.border="none";
        });


        btn.style.border=
        "3px solid #1f7b41";

    });

});


// ----------------------------
// 願い保存データ
// ----------------------------

let wishes=
JSON.parse(localStorage.getItem("wishes"))
|| [];


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

text:textarea.value,

icon:selectedIcon,

color:selectedColor,

like:0,

date:new Date().toLocaleDateString()

};



wishes.push(wish);



localStorage.setItem(
"wishes",
JSON.stringify(wishes)
);



// 演出

paper.animate(

[
{
transform:"translateY(0) rotate(0)",
opacity:1
},

{
transform:"translateY(-80px) rotate(-10deg)"
},

{
transform:"translateY(-300px) rotate(20deg)",
opacity:0
}

],

{

duration:2000,
easing:"ease-in-out"

}

);



setTimeout(()=>{


alert(
"🌠\n\nあなたの願いを\n夜空へ結びました。"
);


textarea.value="";

paper.style.opacity="1";


// 星追加

createWishStar();


},2100);



});




// ----------------------------
// みんなの願い表示
// ----------------------------


const view=
document.getElementById("view");


view.addEventListener("click",()=>{


if(wishes.length===0){

alert(
"まだ願いはありません🌙"
);

return;

}



let text=
"🌌 みんなの願い\n\n";


wishes.forEach((wish,index)=>{


text+=

`${index+1}.
${wish.icon} ${wish.text}
❤️ ${wish.like}

`;

});


alert(text);


});




// ----------------------------
// いいね機能
// ----------------------------


function likeWish(index){

wishes[index].like++;


localStorage.setItem(
"wishes",
JSON.stringify(wishes)
);


}




// ----------------------------
// 願いの数だけ星を増やす
// ----------------------------


function createWishStar(){


const star=
document.createElement("span");


star.textContent="✦";

star.className="wish-star";


star.style.left=
Math.random()*100+"%";


star.style.top=
Math.random()*80+"%";


document.body.appendChild(star);



}



// 保存済み願い分の星生成

wishes.forEach(()=>{

createWishStar();

});




// ----------------------------
// 合言葉
// ----------------------------


const password=
"願いを夜空へ";


function unlock(){


const input=
prompt(
"合言葉を入力してください🌌"
);



if(input===password){


alert(
"✨ 夜空への扉が開きました ✨"
);


document.body.classList.add(
"unlocked"
);


}else{


alert(
"合言葉が違います🌙"
);


}


}