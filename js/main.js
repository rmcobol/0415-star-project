// 검색창 요소(.search) 찾기
const searchEl=document.querySelector(".search");
const searchInputEl=searchEl.querySelector("input");

// 검색창 요소를 클릭하면 실행
searchEl.addEventListener("click",function(){
    searchInputEl.focus();
});

// 검색창 요소 내부 실제 input 요소에 포커스되면 실행
searchInputEl.addEventListener("focus",function(){
    searchEl.classList.add("focused");
    searchInputEl.setAttribute("placeholder","통합검색");
});

// 검색창 요소 내부에 실제 input 요소에서 코커스가 해제(블러)되면 실행
searchInputEl.addEventListener("blur",function(){
    searchEl.classList.remove("focused");
    searchInputEl.setAttribute("placeholder","");
});

/*
    BADGES
    :페이지 스크롤에 따른 요소 제어


    toTop 버튼
    : 페이지 스크롤에 따른 요소 제어
*/
// 페이지 스크롤에 영향을 받는 요소들을 검색
const badgeEl=document.querySelector("header .badges");

//  toTop 버튼 요소 선택
const toTopEl=document.querySelector("#to-top");

/*
    구글 검색:lodash cdn
    cdnjs.com->실행
    lodash -> 클릭
*/
// _.throttle(함수,시간)

/*
    애니메이션
    구글검색:gsap cdn
    cdnjs.com
    gsap->클릭
*/
// gsap.to(요소,지속시간,옵션)

window.addEventListener("scroll",_.throttle(function(){
    console.log(window.scrollY);
    if (window.scrollY > 500){
        //배지 숨기기
        //badgeEl.style.display="none";
        //gsap.to(요소,지속시간,옵션)

        gsap.to(badgeEl,0.6,{
            opacity:0,
            display:'none',
        });

        // to-Top 버튼 보이기
        gsap.to(toTopEl,0.2,{
            x:0
        });

    }else{
        //배지 보이기
        //badgeEl.style.display="block";

        gsap.to(badgeEl,0.6,{
            opacity:1,
            display:'block',
        });

        // to-Top 버튼 숨기기
        gsap.to(toTopEl,0.2,{
            x:100
        });

    }
},300));


// VISUAL
/*
    순서대로 나타나는 기능

    gsap.to(요소,지속시간,옵션)
*/
// 나타날 요소들(.fade-in) 찾기
const fadeEls=document.querySelectorAll(".visual .fade-in");
// console.log(fadeEls);

// 나타날 요소들을 하나씩 반복해서 처리
fadeEls.forEach(function(fadeEl,index){
    // fadeEl->요소명 ,index:색인번호
    // console.log(fadeEl);
    // console.log(index);

    // 각 요소들을 순서대로(delay:지연) 보여지게 함
    gsap.to(fadeEl,1,{
        delay:(index+1) * 0.7, // 0.7,1.4,2.1,2.8호 후에 하나씩
        opacity:1
    });
});



// NOTICE
/*
    swiper
    구글검색:swiper cdn
    swiperjs.com
*/
/*
    new Swiper(요소,옵션);

    new Swiper(".swiper",{
        direction:'vertical', // 수직 슬라이드
        autoplay:true, //자동재생 여부
        loop:true, //반복 재생 여부
    });
*/

// 슬라이드 요소 관리
new Swiper(".notice-line .swiper",{
    direction:'vertical',
    autoplay:true,
    loop:true,
});


// promotion 슬라이드 토글 기능

// 슬라이드 영역 요소 검색
const promotionEl=document.querySelector(".promotion");
// 슬라이드 영역을 토글하는 버튼 검색
const promotionToggleBtn=document.querySelector(".toggle-promotion");

// 슬라이드 영역 숨김 여부 기본값
let isHidePromotion=false;

// 토글 버튼을 클릭하면
promotionToggleBtn.addEventListener("click",function(){
    // 슬라이드 영역 숨김 여부를 반대값으로 할당
    isHidePromotion=!isHidePromotion;

    // 요소를 숨겨야 하면
    if (isHidePromotion){
        promotionEl.classList.add("hide");
    }else{
        promotionEl.classList.remove("hide");
    }
});

// PROMOTION
new Swiper('.promotion .swiper', {
    // direction:'horizontal', // 수평슬라이드(기본값)

    autoplay: { // 자동 재생 여부
        delay: 5000 //5초마다 슬라이드 바뀜
    },
    loop: true, // 반복 재생 여부
    slidesPerView: 3, // 한 번에 보여줄 슬라이드 개수
    spaceBetween: 10, //슬라이드 사이 여백
    centeredSlides: true, //1번 슬라이드가 가운데 보이기
    pagination: { // 페이지 번호 사용 여부
        el: '.promotion .swiper-pagination', //페이짐 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
    },

    navigation: { // 슬라이드 이전/다음 버튼 사용 여부
        prevEl: '.promotion .swiper-prev', //이전 버튼 선택자
        nextEl: '.promotion .swiper-next' //다음 버튼 선택자
    }
});

// 부유하는 요소

// 범위 랜덤 함수(소수점 2자리까지)
function random(min,max){
    //.toFixed()를 통해 반환된 문자 데이터를
    //parseFloat()함수를 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// gsap.to(요소,지속시간,옵션)

// 부유하는(떠 다니는) 요소를 만드는 함수
function floatingObject(selector,delay,size){
    gsap.to(
        selector, //선택자(요소)
        random(1.5,2.5), // 애니메이션 동작시간
        {
            delay:random(0,delay), //언제(얼마만큼의 지연시간) 애니메이션을 시작할 것인지 지연시간을 설정
            y:size, // transform:translateY(수치): 와 같음, 수직으로 얼마나 움직일지 결정
            repeat:-1, // 몇 번 반복하는지 설정(-1: 무한반복)
            yoyo:true, // 한번 재생된 애니메이션을 다시 뒤로 재생
            ease:Power1.easeInput // easing 함수 적용(가속도 함수)
        }
    )
}

// 호출
floatingObject('.floating1',1,15);
floatingObject('.floating2',0.5,15);
floatingObject('.floating3',1.5,20);


/*
    scrollMagic
    : 요소가 화면에 보여짐 여부에 따른 요소 관리

    구글 검색 : scrolMagic cdn

*/

// 관리할 요소들 검색:
const spyEls=document.querySelectorAll("section.scroll-spy");

console.log(spyEls);

// 요소들 반복처리:

spyEls.forEach(function(spyEl){
    new ScrollMagic
        .Scene({ // 감시할 장면(Scence)를 추가
            triggerElement: spyEl, // 보여짐 여부를 감시할 요소를 지정
            triggerHook: .8 // 화면의 80% 지점에서 보여짐 여부 감시
        })
        .setClassToggle(spyEl,'show') // 요소가 화면에 보이면 show 클래스 추가
        .addTo(new ScrollMagic.Controller()) // 컨트롤러에 장면을 할당(필수)
});

// AWARDS
new Swiper('.awards .swiper',{
    // direction:'horizontal', 수평슬라이드(생략)
    autoplay:true, // 자동 재생 여부
    loop:true, // 반복 재생 여부
    spaceBetween:30, // 슬라이드 사이 여백
    slidesPerView:5, // 한번에 보여줄 슬라이드 개수

    navigation:{ // 슬라이드 이전/다음 버튼 사용 여부
        prevEl:'.awards .swiper-prev', // 이전 버튼 선택자
        nextEl:'.awards .swiper-next' // 다음 버튼 선택자
    }
});


// footer
// 올해가 몇 년도인지 계산
const thisYear=document.querySelector(".this-year");
thisYear.textContent=new Date().getFullYear();


// TO TOP BUTTON 클릭했을때 스크롤이 0으로 이동
/*
    구글 검색:scrollToPlugin cdn
    외부 라이브러리 연결
    :html->head에 연결
*/

toTopEl.addEventListener("click",function(){
    gsap.to(window,0.7,{
        scrollTo:0
    });
});