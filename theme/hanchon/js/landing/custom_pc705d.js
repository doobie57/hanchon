history.scrollRestoration = "manual";
history.scrollRestoration = "auto";

var is_play = true;
var prevScrollTop = 0;
var nowScrollTop = 0;

$(document).ready(function(){
    // header scrolling
    var $header = $('.hd');
    var header_h = $header.outerHeight();

    // tel input
    $('.input_tel').keyup(function (event) {
        event = event || window.event;
        var _val = this.value.trim();
        this.value = autoHypenTel(_val);
    });

    // $('.fixed-form-wrap').animate({'bottom':'0'},1000,'swing');

    // header scrolling
    var header_h = $('header').outerHeight();

    // nav menu click
    $('header a.menu').on('click', function(){
        event.preventDefault();
        header_h = $header.outerHeight();
        var _data_href = $(this).attr('data-href');

        $('html,body').animate({scrollTop:($('[data-position="'+ _data_href +'"]').offset().top-header_h)}, 500);

        AOS.refresh();

        if ( $(this).closest('#header').find('.gnb-wrap').hasClass('active') ) {
            $(this).closest('#header').find('.gnb-wrap').removeClass('active');
            burger.toggleClass('active');
        }
    });

    /*scroll up or down*/
    function wheelDelta(){
        return prevScrollTop - nowScrollTop > 0 ? 'up' : 'down';
    };

    // 스크롤 이벤트
    $(window).on('scroll', function() {
        header_h = $header.outerHeight(); // 헤더의 현재 높이

        if ($(window).scrollTop() > header_h) { // 스크롤 위치가 헤더 높이보다 클 때
            $header.addClass('scrolled');
        } else {
            $header.removeClass('scrolled');
        }
        // eventScroll();
    });

});


//city select 2 array
var cnt = new Array();
cnt[0] = new Array('==시,군,구==');
cnt[1] = new Array('==시,군,구==','강남구','강동구','강북구','강서구','관악구','광진구','구로구','금천구','노원구','도봉구','동대문구','동작구','마포구','서대문구','서초구','성동구','성북구','송파구','양천구','영등포구','용산구','은평구','종로구','중구','중랑구');
cnt[2] = new Array('==시,군,구==','강서구','금정구','남구','동구','동래구','부산진구','북구','사상구','사하구','서구','수영구','연제구','영도구','중구','해운대구','기장군');
cnt[3] = new Array('==시,군,구==','남구','달서구','동구','북구','서구','수성구','중구','달성군');
cnt[4] = new Array('==시,군,구==','계양구','남구','남동구','동구','부평구','서구','연수구','중구','강화군','옹진군');
cnt[5] = new Array('==시,군,구==','광산구','남구','동구','북구','서구');
cnt[6] = new Array('==시,군,구==','대덕구','동구','서구','유성구','중구');
cnt[7] = new Array('==시,군,구==','남구','동구','북구','중구','울주군');
cnt[8] = new Array('==시,군,구==','고양시','과천시','광명시','구리시','군포시','남양주시','동두천시','부천시','성남시','수원시','시흥시','안산시','안양시','오산시','의왕시','의정부시','평택시','하남시','가평군','광주시','김포시','안성시','양주군','양평군','여주군','연천군','용인시','이천군','파주시','포천시','화성시');
cnt[9] = new Array('==시,군,구==','강릉시','동해시','삼척시','속초시','원주시','춘천시','태백시','고성군','양구군','양양군','영월군','인제군','정선군','철원군','평창군','홍천군','화천군','황성군');
cnt[10] = new Array('==시,군,구==','제천시','청주시','충주시','괴산군','단양군','보은군','영동군','옥천군','음성군','진천군','청원군');
cnt[11] = new Array('==시,군,구==','공주시','보령시','서산시','아산시','천안시','금산군','논산군','당진군','부여군','서천군','연기군','예산군','청양군','태안군','홍성군');
cnt[12] = new Array('==시,군,구==','세종특별자치시');
cnt[13] = new Array('==시,군,구==','군산시','김제시','남원시','익산시','전주시','정읍시','고창군','무주군','부안군','순창군','완주군','임실군','장수군','진안군');
cnt[14] = new Array('==시,군,구==','광양시','나주시','목포시','순천시','여수시','여천시','강진군','고흥군','곡성군','구례군','담양군','무안군','보성군','신안군','여천군','영광군','영암군','완도군','장성군','장흥군','진도군','함평군','해남군','화순군');
cnt[15] = new Array('==시,군,구==','경산시','경주시','구미시','김천시','문경시','상주시','안동시','영주시','영천시','포항시','고령군','군위군','봉화군','성주군','영덕군','영양군','예천군','울릉군','울진군','의성군','청도군','청송군','칠곡군');
cnt[16] = new Array('==시,군,구==','거제시','김해시','마산시','밀양시','사천시','울산시','진주시','진해시','창원시','통영시','거창군','고성군','남해군','산청군','양산시','의령군','창녕군','하동군','함안군','함양군','합천군');
cnt[17] = new Array('==시,군,구==','서귀포시','제주시','남제주군','북제주군');


function body_fwrite01(add) {
    sel1=document.body_fwrite.wr_4

    /* 옵션메뉴삭제 */
    for (i=sel1.length-1; i>=0; i--){
        sel1.options[i] = null
    }
    /* 옵션박스추가 */
    for (i=0; i < cnt[add].length;i++){
        sel1.options[i] = new Option(cnt[add][i], cnt[add][i]);
    }
}
function body_fwrite02(add) {
    sel2=document.body_fwrite2.wr_4

    /* 옵션메뉴삭제 */
    for (i=sel2.length-1; i>=0; i--){
        sel2.options[i] = null
    }
    /* 옵션박스추가 */
    for (i=0; i < cnt[add].length;i++){
        sel2.options[i] = new Option(cnt[add][i], cnt[add][i]);
    }
}

function bot_change(add) {
    sel5=document.bot_fwrite.wr_4

    /* 옵션메뉴삭제 */
    for (i=sel5.length-1; i>=0; i--){
        sel5.options[i] = null
    }
    /* 옵션박스추가 */
    for (i=0; i < cnt[add].length;i++){
        sel5.options[i] = new Option(cnt[add][i], cnt[add][i]);
    }
}
function pop_change(add) {
    sel4=document.pop_fwrite.wr_4

    /* 옵션메뉴삭제 */
    for (i=sel4.length-1; i>=0; i--){
        sel4.options[i] = null
    }
    /* 옵션박스추가 */
    for (i=0; i < cnt[add].length;i++){
        sel4.options[i] = new Option(cnt[add][i], cnt[add][i]);
    }
}

function autoHypenTel(str) {
    str = str.replace(/[^0-9]/g, '');
    var tmp = '';

    if (str.substring(0, 2) == 02) {
        // 서울 전화번호일 경우 10자리까지만 나타나고 그 이상의 자리수는 자동삭제
        if (str.length < 3) {
            return str;
        } else if (str.length < 6) {
            tmp += str.substr(0, 2);
            tmp += '-';
            tmp += str.substr(2);
            return tmp;
        } else if (str.length < 10) {
            tmp += str.substr(0, 2);
            tmp += '-';
            tmp += str.substr(2, 3);
            tmp += '-';
            tmp += str.substr(5);
            return tmp;
        } else {
            tmp += str.substr(0, 2);
            tmp += '-';
            tmp += str.substr(2, 4);
            tmp += '-';
            tmp += str.substr(6, 4);
            return tmp;
        }
    } else {
        // 핸드폰 및 다른 지역 전화번호 일 경우
        if (str.length < 4) {
            return str;
        } else if (str.length < 7) {
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3);
            return tmp;
        } else if (str.length < 11) {
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 3);
            tmp += '-';
            tmp += str.substr(6);
            return tmp;
        } else {
            tmp += str.substr(0, 3);
            tmp += '-';
            tmp += str.substr(3, 4);
            tmp += '-';
            tmp += str.substr(7);
            return tmp;
        }
    }
    return str;
}

function showPop(popCon){
    $("."+popCon).show();

    if($(".pop_biz .item_slide").length != 0){
        var swiper_biz = new Swiper(".pop_biz .item_slide", {
            slidesPerView: 1,
            loop: true,
            loopedSlides: 1,
            speed: 700,
            observer: true,
            observeParents: true,
            autoplay: {
                delay: 1000,
                disableOnInteraction: false,
            },
        });
    }

    $(".pop-close").on("click", function (){
        $(this).closest(".dim").hide();
    })
}
function fwrite_submit(f)
{
    f.wr_subject.value = '[한촌설렁탕] ' + f.wr_name.value + '님이 문의글을 올렸습니다..';
    if ( f.wr_content.value == '' ) {
        f.wr_content.value = f.wr_name.value + '님 [' + f.wr_1.value + '] 이 문의글을 올렸습니다..';
    }
    return true;
}


// 스크롤시 실행되는 커스텀 애니메이션
class ScrollAnimationHandler {
    constructor(selector, threshold = 0.1, rootMargin = '0px') {
        this.elements = document.querySelectorAll(selector);
        this.options = {
            root: null,
            rootMargin: rootMargin,
            threshold: threshold
        };
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), this.options);
        this.observeElements();
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            const animationClass = entry.target.getAttribute('data-animation');
            if (entry.isIntersecting) {
                entry.target.classList.add(animationClass);
            } else {
                entry.target.classList.remove(animationClass);
            }
        });
    }

    observeElements() {
        this.elements.forEach(el => this.observer.observe(el));
    }

    disconnect() {
        this.observer.disconnect();
    }
}


document.addEventListener("DOMContentLoaded", function () {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header.hd');

    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    document.documentElement.style.overflow = 'hidden';
    window.onload = function () {
        if (!isMobile) {
            gsap.to(window, { duration: 0.1, scrollTo: 0 });
        }
    };

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY <= 0) {
            // 맨 위일 때 무조건 보이기
            header.classList.remove('hidden');
        } else if (currentScrollY > lastScrollY) {
            // 아래로 스크롤 → 숨김
            header.classList.add('hidden');
        } else if (currentScrollY < lastScrollY) {
            // 위로 스크롤 → 보이기
            header.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    });

    const fixedForm = document.querySelector('.fixed-form-wrap');
    const footer = document.querySelector('#footer');
    const mainSec = document.getElementById('main-sec');

    if (!fixedForm || !footer) return;

    const defaultBottom = 0;
    const offsetTrigger = 100;
    let isFixed = false;

    function handleScroll() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const footerTop = footer.getBoundingClientRect().top + scrollTop;
        const fixedFormHeight = fixedForm.offsetHeight;
        const stopPoint = footerTop - winHeight + fixedFormHeight;

        // 기본 slide show/hide
        fixedForm.style.transition = 'bottom 0.5s ease';
        fixedForm.style.bottom = scrollTop > 1 ? `${defaultBottom}px` : '-100%';

        // active 클래스 처리 (main-sec 이후)
        if (mainSec && scrollTop > mainSec.offsetTop) {
            fixedForm.classList.add('active');
        } else {
            fixedForm.classList.remove('active');
        }

        // footer 만나기 전까지는 fixed 유지, 그 이후는 위로 올리기
        if (scrollTop + winHeight >= footerTop) {
            const overlap = scrollTop + winHeight - footerTop;
            fixedForm.style.transform = `translateY(-${overlap}px)`;
        } else {
            fixedForm.style.transform = `translateY(0)`;
        }

        // fixed 클래스 toggle
        if (!isFixed && scrollTop >= offsetTrigger) {
            fixedForm.classList.add('fixed');
            isFixed = true;
        } else if (isFixed && scrollTop < offsetTrigger) {
            fixedForm.classList.remove('fixed');
            isFixed = false;
        }
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    // main-sec sec1
    gsap.registerPlugin(ScrollTrigger);


    const mainSecTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#main-sec",
            start: "top top",
            end: "+=190%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        }
    });

    const vh = window.innerHeight; // 뷰포트 높이 기준

    if (window.innerWidth >= 2000) {
        mainSecTl.set("#main-sec .building-wrap", {
            opacity: 0.9,
            scale: 1,
            y: vh * 0.3
        });
        mainSecTl.set("#main-sec .building-wrap .building", {
            y: vh * 0.2
        });
        mainSecTl.set("#main-sec .building-wrap .cloud1", {
            opacity:0.9,
            y: vh * 0.4
        });
        mainSecTl.set("#main-sec .building-wrap .cloud2", {
            opacity:0.9,
            y: vh * 0.4
        });
        mainSecTl.set("#main-sec .building-wrap .forest", {
            opacity:0.9,
            y: vh * 0.5
        });
        mainSecTl.set("#main-sec .building-wrap .desc", {
            opacity: 0.9,
            y: vh * 0.45
        });
        mainSecTl.set("#main-sec .building-wrap .desc .t2", {
            opacity: 0.9,
            y: vh * 0.55
        });

        mainSecTl
            .to("#main-sec .scroll-wrap", {
                opacity: 0,
                y: -vh * 0.05,
                duration: 0.4
            })
            .to("#main-sec .building-wrap", {
                opacity: 1,
                y: -vh * 0.9,
                scale: 1.1,
                duration: 1.0
            })
            .to("#main-sec .building-wrap .cloud1", {
                opacity:1,
                y: 0,
                scale: 1.05,
                duration: 1.2
            }, "-=0.7")
            .to("#main-sec .building-wrap .cloud2", {
                opacity:1,
                y: 0,
                scale: 1.05,
                duration: 1.2
            }, "-=1.1")
            .to("#main-sec .building-wrap .forest", {
                opacity:1,
                y: 0,
                duration: 1.0
            }, "-=1.4")
            .to("#main-sec .building-wrap .building", {
                y: 0,
                duration: 2.8
            }, "-=0.3")
            .to("#main-sec .building-wrap .desc", {
                opacity: 1,
                y: -vh * 0.08,
                duration: 1.8
            }, "+=0.3")
            .to("#main-sec .building-wrap .desc .t2", {
                opacity: 1,
                y: vh * 0.02,
                duration: 2.0
            }, "+=0.3");
    } else {
        mainSecTl.set("#main-sec .building-wrap", {
            opacity: 0.9,
            scale:1,
            y: 0
        });
        mainSecTl.set("#main-sec .building-wrap .building", {
            y: 400
        });
        mainSecTl.set("#main-sec .building-wrap .cloud1", {
            opacity:0.9,
            y: 700
        });
        mainSecTl.set("#main-sec .building-wrap .cloud2", {
            opacity:0.9,
            y: 600
        });
        mainSecTl.set("#main-sec .building-wrap .forest", {
            opacity:0.9,
            y: 600
        });
        mainSecTl.set("#main-sec .building-wrap .desc", {
            opacity: 0.9,
            y: 400
        });
        mainSecTl.set("#main-sec .building-wrap .desc .t2", {
            opacity: 0.9,
            y: 330
        });

        // ✅ 순차 애니메이션
        mainSecTl
            .to("#main-sec .scroll-wrap", {
                opacity: 0,
                y: -50,
                duration: 0.4
            })
            .to("#main-sec .building-wrap", {
                opacity: 1,
                y: -1020,
                scale:1.1,
                duration: 1.0
            })
            .to("#main-sec .building-wrap .cloud1", {
                opacity:1,
                y: 0,
                scale:1.05,
                duration: 1.2
            },"-=0.7")
            .to("#main-sec .building-wrap .cloud2", {
                opacity:1,
                y: 0,
                scale:1.05,
                duration: 1.2
            },"-=1.1")
            .to("#main-sec .building-wrap .forest", {
                opacity:1,
                y: 0,
                duration: 1.0
            },"-=1.4")
            .to("#main-sec .building-wrap .building", {
                y: 0,
                duration: 2.8
            },"-=0.3")
            .to("#main-sec .building-wrap .desc", {
                opacity: 1,
                y: 0,
                duration: 1.8
            },"+=0.3")
            .to("#main-sec .building-wrap .desc .t2", {
                opacity: 1,
                y: 20,
                duration: 2.0
            },"+=0.3");
    }


    // page open mainpage circle event
//   const intro = gsap.matchMedia();
//    intro.add({
//        isDesktop: "(min-width: 1025px)",
//        isMobile: "(max-width: 1024px)"
//    }, (context) => {
//        const { isDesktop } = context.conditions;
//
//        gsap.fromTo('#app', {
//            clipPath: `circle(0% at 50% 30vh)`
//        }, {
//            clipPath: `circle(100% at 50% 30vh)`,
//            delay: isDesktop ? 0.8 : 1.2,
//            duration: 2,
//           onStart: () => {
//                if (isDesktop) {
//                    gsap.timeline()
//                        .fromTo('#main-sec .tt', {
//                            y: 100,
//                            opacity: 0
//                        }, {
//                            y: 0,
//                            opacity: 1,
//                            duration: 0.7
//                        })
//                        .fromTo('#main-sec .up-scale', {
//                            y: 100,
//                            opacity: 0
//                        }, {
//                            y: 0,
//                            opacity: 1,
//                            duration: 0.8
//                        });
//                }
//                if (isMobile) {
//                    gsap.timeline()
//                        .fromTo('#main-sec .tt', {
//                            y: 100,
//                            opacity: 0
//                        }, {
//                            y: 0,
//                            opacity: 1,
//                            duration: 0.7
//                        })
//                        .fromTo('#main-sec .up-scale', {
//                          y: 100,
//                            opacity: 0
//                        }, {
//                            y: 0,
//                            opacity: 1,
//                            duration: 0.8
//                        });
//                }
//            },
//            onComplete: () => {
//                document.documentElement.style.overflowY = 'auto';
//                header?.classList.remove('hide');
//                document.querySelector('#app')?.style.removeProperty('clip-path'); // clipPath 제거
//            }
//        });
//    });

// 더 간결한 버전 (애니메이션 최적화)
const intro = gsap.matchMedia();
intro.add({
    isDesktop: "(min-width: 1025px)",
    isMobile: "(max-width: 1024px)"
}, () => {
    // 즉시 페이지 접근 허용
    document.documentElement.style.overflowY = 'auto';
    header?.classList.remove('hide');

    // 모든 기기에서 동일한 애니메이션 적용
    gsap.timeline()
        .fromTo(['#main-sec .tt', '#main-sec .up-scale'], {
            y: 100,
            opacity: 0
        }, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1 // 요소간 간격 추가 (선택사항)
        });
});

    // mainpage scroll event
    intro.add({
        min1281: "(min-width:1281px)",
        max1280: "(max-width:1280px)",
        max1024: "(max-width:1024px)",
        min821: "(min-width:821px)",
        max820: "(max-width:820px)",
        max480: "(max-width:480px)"
    }, (context) => {
        const { min1281, max1280, max1024, min821, max820, max480 } = context.conditions;
    });

    function countUp(element, start, end, onComplete) {
        let duration = end >= 100000 ? 3000 : 2000;
        let startTime = null;

        function animateCount(currentTime) {
            if (!startTime) startTime = currentTime;
            let progress = (currentTime - startTime) / duration;
            let value = Math.floor(progress * (end - start) + start);

            element.textContent = value.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animateCount);
            } else {
                element.textContent = end.toLocaleString();
                if (typeof onComplete === 'function') onComplete(); // 완료 후 콜백
            }
        }
        requestAnimationFrame(animateCount);
    }

    let cntObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            let counters = entry.target.querySelectorAll("[data-count]");
            counters.forEach(counter => {
                const classToAdd = counter.getAttribute("data-add-animation");
                if (entry.isIntersecting) {
                    let endValue = parseInt(counter.getAttribute("data-count"), 10);
                    // 카운트 초기화
                    counter.textContent = "0";
                    // 카운트 후 클래스 추가
                    countUp(counter, 2, endValue, () => {
                        if (classToAdd) {
                            counter.classList.add(classToAdd);
                        }
                    });
                } else {
                    // 화면에서 벗어나면 클래스 제거
                    if (classToAdd) {
                        counter.classList.remove(classToAdd);
                    }
                }
            });
        });
    }, { threshold: 0.2 });

    // main-sec sec1
    document.querySelectorAll("#main-sec").forEach(section => {
        cntObserver.observe(section);
    });


    // competitive-sec sec3
    document.querySelectorAll("#competitive-sec").forEach(section => {
        cntObserver.observe(section);
    });

    function runBrushAnimation({
                                   sectionSelector,
                                   targetSelector,
                                   delay = 500,
                                   interval = 600
                               }) {
        const sections = document.querySelectorAll(sectionSelector);

        sections.forEach(section => {
            const target = section.querySelector(targetSelector);
            if (!target) return;

            const steps = [
                { selector: '.layer1', clip: 'polygon(0 0, 100% 0, 100% 30%, 0 20%)' },
                { selector: '.layer2', clip: 'polygon(0 0, 100% 0, 100% 70%, 0 60%)' },
                { selector: '.layer3', clip: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
            ];

            let alreadyRun = false;
            let timeoutList = [];

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !alreadyRun) {
                        alreadyRun = true;

                        steps.forEach((step, i) => {
                            const timeout = setTimeout(() => {
                                const el = target.querySelector(step.selector);
                                if (el) {
                                    el.style.transition = 'clip-path 0.6s ease-out';
                                    el.style.clipPath = step.clip;
                                }
                            }, delay + i * interval);

                            timeoutList.push(timeout);
                        });
                    }

                    // ✅ 초기화
                    if (!entry.isIntersecting) {
                        alreadyRun = false;

                        timeoutList.forEach(clearTimeout);
                        timeoutList = [];

                        steps.forEach(step => {
                            const el = target.querySelector(step.selector);
                            if (el) {
                                el.style.transition = 'none';
                                el.style.clipPath = 'polygon(0 0, 0 0, 0 0, 0 0)';
                            }
                        });
                    }
                });
            }, { threshold: 0.2 });

            observer.observe(section);
        });
    }

    // benefit-sec sec4
    // runBrushAnimation({
    //     sectionSelector: '#benefit-sec',
    //     targetSelector: '.tt-wrap .brush-txt'
    // });


    let envCntObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const section = entry.target;

            const animElements = Array.from(section.querySelectorAll('[data-order]'));

            if (entry.isIntersecting) {
                animElements.sort((a, b) => {
                    return parseInt(a.getAttribute('data-order'), 10) - parseInt(b.getAttribute('data-order'), 10);
                });

                animElements.forEach((el, index) => {
                    // ✅ 지연 시간 설정 (0.5초 간격)
                    el.style.transitionDelay = `${index * 300}ms`;
                    el.classList.add('aos-animate');

                    // ✅ data-width 처리
                    const widthValue = el.getAttribute('data-width');
                    if (widthValue !== null) {
                        el.style.width = `calc(100% * (${widthValue} / 100))`;
                    }
                });

            } else {
                animElements.forEach(el => {
                    el.classList.remove('aos-animate');
                    el.style.transitionDelay = '0ms';

                    // ✅ data-width 초기화
                    if (el.hasAttribute('data-width')) {
                        el.style.width = '0';
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    // environment-sec sec5
    document.querySelectorAll("#environment-sec").forEach(section => {
        envCntObserver.observe(section);
    });


    function initRollingAnimation(section) {
        const hanchon = section.querySelector('.hanchon');
        const keys = ['corona','money','graph'];
        const els = {};
        const initialOffset = { corona: -570, money: 280, graph: 480 };
        const initialOpacity = {};

        // 1) 캐싱 + 초기 opacity 저장
        keys.forEach(key => {
            const el = section.querySelector(`.${key}`);
            els[key] = el;
            initialOpacity[key] = getComputedStyle(el).opacity;
        });

        const speedFactor = 1.8;
        const rollDur   = 2000 / speedFactor;
        const throwDur  = 700  / speedFactor;
        const delays    = { corona: 0, money: 3000 / speedFactor, graph: 6000 / speedFactor };

        let hitCount = 0, loopId;
        const timers = [];

        function clearAll() {
            clearTimeout(loopId);
            timers.forEach(clearTimeout);
            timers.length = 0;
        }

        function resetAll() {
            clearAll();
            hitCount = 0;
            // 한촌과 모든 아이템 초기화
            hanchon.style.transition = 'none';
            hanchon.style.transform  = 'translate(-50%, -50%) scale(1)';
            keys.forEach(key => {
                const el = els[key];
                el.style.transition = 'none';
                el.style.marginLeft = initialOffset[key] + 'px';
                el.style.opacity    = initialOpacity[key];
                el.style.transform  = 'none';
            });
        }

        function animateLoop() {
            keys.forEach(key => {
                timers.push(setTimeout(() => {
                    const el = els[key];

                    // --- 동적 충돌 지점 계산 (왼쪽/오른쪽 분기) ---
                    const hRect = hanchon.getBoundingClientRect();
                    const eRect = el.getBoundingClientRect();
                    const hCenterX = hRect.left + hRect.width / 2;
                    const eCenterX = eRect.left + eRect.width / 2;
                    const overlapFactor = (key === 'corona') ? 1 : 0.97;

                    let contactShift;

                    if (key === 'corona') {
                        // 왼쪽에서 부딪힘
                        contactShift = hCenterX - eCenterX - (hRect.width/2 + eRect.width/2);
                    } else {
                        // 오른쪽에서 부딪힘
                        contactShift = hCenterX - eCenterX + (hRect.width/2 + eRect.width/2) * overlapFactor;
                    }
                    const target = initialOffset[key] + contactShift;
                    // -------------------------------------------------

                    // 1) Roll in
                    el.style.opacity    = '1';
                    el.style.transition = `margin-left ${rollDur}ms linear, transform ${rollDur}ms linear`;
                    el.style.marginLeft = `${target}px`;
                    el.style.transform  = 'rotate(720deg)';

                    // 2) Hit & throw
                    timers.push(setTimeout(() => {
                        hitCount++;
                        // 한촌 스케일 업
                        hanchon.style.transition = 'transform 300ms ease';
                        hanchon.style.transform  = `translate(-50%, -50%) scale(${1 + hitCount*0.2})`;

                        // 1) squash (찌그러뜨리기)
                        const squashDur = 100 / speedFactor;      // squash 애니메이션 시간
                        el.style.transition = `transform ${squashDur}ms ease-out`;
                        el.style.transform  = `rotate(720deg) scale(1.2,0.8)`;

                        // 2) restore & toss
                        timers.push(setTimeout(() => {
                            // 되돌리기
                            el.style.transition = `transform ${squashDur}ms ease-in`;
                            el.style.transform  = `rotate(720deg) scale(1)`;

                            // 짧은 딜레이 후에 튕겨내기
                            timers.push(setTimeout(() => {
                                const dir  = key==='corona' ? 'left' : 'right';
                                const rand = dir==='left'
                                    ? -1200 - Math.random()*400
                                    : 1200 + Math.random()*400;
                                el.style.transition = `margin-left ${throwDur}ms ease-in, transform ${throwDur}ms ease-in`;
                                el.style.transform  = `rotate(${dir==='left'?-1080:1080}deg) scale(1)`;
                                el.style.marginLeft = `${rand}px`;
                            }, 50));

                        }, squashDur));

                    }, rollDur));
                }, delays[key]));
            });

            // 다음 루프 예약
            const total = delays.graph + rollDur + (300/speedFactor) + throwDur;
            loopId = setTimeout(() => {
                resetAll();
                animateLoop();
            }, total);
        }

        // 뷰포트 진입/이탈 감지
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    resetAll();
                    animateLoop();
                } else {
                    resetAll();
                }
            });
        }, { threshold: 0 });

        obs.observe(section);
    }
    document.querySelectorAll('#stronger-sec').forEach(sec => {
        initRollingAnimation(sec);
    });



    let observerComparison = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const section = entry.target;
            const tenBillion = section.querySelector('.ten-billion');
            const empty = section.querySelector('.empty');

            if (entry.isIntersecting) {
                section.classList.add('in-view');

                // 초기화 상태
                tenBillion.style.transform = 'scale(1)';
                empty.style.transform = 'scale(1)';

                // 서로 번갈아가며 애니메이션 실행
                let count = 0;
                const maxRepeats = 3;

                function animateStep() {
                    if (!section.classList.contains('in-view')) return;

                    const isEvenTurn = count % 2 === 0;

                    const tenBillionFrom = isEvenTurn ? 0.8 : 1.1;
                    const tenBillionTo = isEvenTurn ? 1.1 : 0.8;

                    const emptyFrom = isEvenTurn ? 1.1 : 0.8;
                    const emptyTo = isEvenTurn ? 0.8 : 1.1;

                    tenBillion.style.transform = `scale(${tenBillionFrom})`;
                    empty.style.transform = `scale(${emptyFrom})`;

                    requestAnimationFrame(() => {
                        const tenAnim = tenBillion.animate([
                            { transform: `scale(${tenBillionFrom})` },
                            { transform: `scale(${tenBillionTo})` }
                        ], {
                            duration: 400,
                            easing: 'ease-in-out'
                        });

                        const emptyAnim = empty.animate([
                            { transform: `scale(${emptyFrom})` },
                            { transform: `scale(${emptyTo})` }
                        ], {
                            duration: 400,
                            easing: 'ease-in-out'
                        });

                        tenAnim.onfinish = () => {
                            tenBillion.style.transform = `scale(${tenBillionTo})`;
                            empty.style.transform = `scale(${emptyTo})`;

                            count++;
                            if (count < maxRepeats * 2) {
                                animateStep();
                            } else {
                                // 마지막 고정도 부드럽게
                                tenBillion.animate([
                                    { transform: `scale(${tenBillionTo})` },
                                    { transform: 'scale(1.3)' }
                                ], {
                                    duration: 300,
                                    easing: 'ease-out',
                                    fill: 'forwards'
                                });

                                empty.animate([
                                    { transform: `scale(${emptyTo})` },
                                    { transform: 'scale(0.8)' }
                                ], {
                                    duration: 300,
                                    easing: 'ease-out',
                                    fill: 'forwards'
                                });
                            }
                        };
                    });
                }

                animateStep();  // 첫 실행

            } else {
                // 초기화: 상태 리셋
                section.classList.remove('in-view');

                tenBillion.style.transform = 'scale(1)';
                empty.style.transform = 'scale(1)';
            }
        });
    }, { threshold: 0.5 });

    // comparison-sec sec7
    document.querySelectorAll("#comparison-sec").forEach(section => {
        observerComparison.observe(section);
    });


    let averageCntObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const section = entry.target;
            const counters = section.querySelectorAll("[data-count]");

            if (entry.isIntersecting) {
                let completedCount = 0;
                const totalCounters = counters.length;
                let animationsTriggered = false;

                counters.forEach(counter => {
                    const countValue = parseInt(counter.getAttribute("data-count"), 10);
                    const graphElement = counter.closest(".graph");

                    // ✅ 1️⃣ 그래프 높이 세팅
                    if (graphElement) {
                        graphElement.style.height = `calc(500px * (${countValue} / 8000))`;
                    }

                    // ✅ 2️⃣ 카운트 초기화 및 실행
                    counter.textContent = "0";
                    countUp(counter, 2, countValue, () => {
                        completedCount++;
                        if (completedCount === totalCounters && !animationsTriggered) {
                            animationsTriggered = true;
                            new ScrollAnimationHandler('[data-animation]');
                        }
                    });
                });

                // ✅ 한 번만 실행하려면 이거 유지 (옵션)
                // observer.unobserve(section);

            } else {
                // ✅ 이탈 시 초기화
                counters.forEach(counter => {
                    const graphElement = counter.closest(".graph");
                    if (graphElement) {
                        graphElement.style.height = "0";
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    // average-sec sec8
    document.querySelectorAll("#average-sec").forEach(section => {
        averageCntObserver.observe(section);
    });


    // swiper
    function createInfiniteSwiper(
        containerSelector,
        navSelector,
        centerMode = false,
        slideCnt = 'auto',
        gap,
        direction = 'left',
        speed = 5000,
        delay = 1000,
        autoplay = true,
        textTargetSelector = null // ✅ 타겟 텍스트 셀렉터 추가
    ) {
        const swiperEl = document.querySelector(containerSelector);
        if (!swiperEl) return;

        if (direction === 'right') swiperEl.style.direction = 'rtl';

        const swiperDirection = (direction === 'top' || direction === 'bottom') ? 'vertical' : 'horizontal';

        const config = {
            direction: swiperDirection,
            centeredSlides: centerMode,
            slidesPerView: slideCnt,
            spaceBetween: gap,
            loop: true,
            speed: speed,
            allowTouchMove: true,
        };

        if (autoplay) {
            config.autoplay = {
                delay: delay,
                disableOnInteraction: false,
                pauseOnMouseEnter: false,
            };
        }

        if (navSelector) {
            config.navigation = {
                nextEl: `${navSelector} .swiper-button-next`,
                prevEl: `${navSelector} .swiper-button-prev`,
            };
        }

        const scrollbarEl = swiperEl.querySelector('.swiper-scrollbar');
        if (scrollbarEl) {
            config.scrollbar = {
                el: scrollbarEl,
                draggable: true,
                hide: false,
            };
        }

        const swiper = new Swiper(containerSelector, config);

        // ✅ 텍스트 연동 처리
        if (textTargetSelector) {
            // 섹션 찾기 유틸이 필요하다면 미리 정의된 함수 활용
            const sectionEl = swiperEl.closest(sectionSelectorFrom(containerSelector));
            const targetEl  = sectionEl?.querySelector(textTargetSelector);
            if (targetEl) {
                const ttEl   = targetEl.querySelector('.tt');
                const descEl = targetEl.querySelector('.desc');

                const updateText = () => {
                    const activeSlide = swiperEl.querySelector('.swiper-slide-active');
                    if (!activeSlide) return;
                    const msg  = activeSlide.querySelector('.msg')?.innerHTML   || '';
                    const full = activeSlide.querySelector('.full-txt')?.innerHTML || '';
                    if (ttEl)   ttEl.innerHTML   = msg;
                    if (descEl) descEl.innerHTML = full;
                };

                // 초기 반영
                updateText();

                // transition 시작 시 바로 반영
                swiper.on('transitionStart', updateText);
                // slideChange 이벤트도 함께 걸어두면 안전
                swiper.on('slideChange', updateText);
            }
        }
        return swiper;
    }

    // ✅ containerSelector 기준으로 section 엘리먼트 탐색
    function sectionSelectorFrom(containerSelector) {
        const el = document.querySelector(containerSelector);
        return el?.closest('section')?.id ? `#${el.closest('section').id}` : null;
    }

    // quick
    createInfiniteSwiper('.quick-sw', null, false, 'auto', 10, 'top', 800, 2000, true);


    // sales-sec sec2
    createInfiniteSwiper('.sales-sw', '#sales-sec .swiper-controller', false, 'auto', 20, 'left', 800, 2000, true);


    // system-sec sec9
    createInfiniteSwiper('.system-sw', '#system-sec .swiper-controller', false, 'auto', 20, 'left', 800, 2000, true, '.cont1');


    // menu-sec sec12
    createInfiniteSwiper('.menu-sw', null, false, 'auto', 0, 'left', 800, 2000, true);


    // separate-sec sec13
    const separateSecTl = gsap.timeline({
        scrollTrigger: {
            trigger: "#separate-sec",
            start: "top top",
            end: "+=200%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        }
    });
    separateSecTl.set("#separate-sec .cont-wrap", {
        opacity: 0.5,
        y: 1400
    });

    // ✅ 순차 애니메이션
    separateSecTl
    .to("#separate-sec .cont-wrap", {
        opacity: 1,
        y: 170,
        duration: 1
    });




    // menu-sec sec8
    const menuSec = document.querySelector("#menu-sec");
    const tabButtons = menuSec.querySelectorAll(".menu-tab a");
    const allItems = menuSec.querySelectorAll(".menu-content .item");
    const activeTab = menuSec.querySelector(".menu-tab li.active a");

    function filterMenu(menuType) {
        allItems.forEach(item => {
            const value = item.dataset.menuValue;
            if (menuType === "all" || value === menuType) {
                item.classList.add("show");
            } else {
                item.classList.remove("show");
            }
        });
    }

    // interview-sec sec14
    createInfiniteSwiper('.interview-sw', '.interview-sw', true, 'auto', 150, 'left', 800, 3000);


    // 초기 로딩 시 active 탭 필터링
    if (activeTab) {
        filterMenu(activeTab.dataset.menu);
    }

    // 탭 클릭 이벤트
    tabButtons.forEach(tab => {
        tab.addEventListener("click", (e) => {
            e.preventDefault();

            // 탭 active 클래스 처리
            tabButtons.forEach(btn => btn.parentElement.classList.remove("active"));
            tab.parentElement.classList.add("active");

            const menuType = tab.dataset.menu;
            filterMenu(menuType);
        });
    });


    // 1️⃣ 썸네일 자동 채움
    document.querySelectorAll('.youtube-thumb-swiper .swiper-slide').forEach(function (slide) {
        const videoId = slide.getAttribute('data-video-id');
        const img = slide.querySelector('.thumb-img');
        if (videoId && img) {
            img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        }
    });


    // interview-sec sec16
    createInfiniteSwiper('.youtube-thumb-swiper', null, false, 'auto', 10, 'top', 5000, 1000, false);


    // 내부 커스텀 애니메이션 실행 동작
    new ScrollAnimationHandler('[data-animation]');


    // YouTube Iframe API 로드
    const script = document.createElement('script');
    script.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(script);

    let players = {}; // 플레이어 저장 객체

    // API 준비되면 실행될 함수
    window.onYouTubeIframeAPIReady = () => {
        document.querySelectorAll(".video-wrap[data-id]").forEach((element) => {
            const videoId = element.getAttribute("data-id");

            // YouTube 플레이어 생성
            const player = new YT.Player(element, {
                videoId: videoId,
                playerVars: {
                    'autoplay': 0,
                    'mute': 1,
                    'controls': 1,
                    'loop': 1,
                    'playlist': videoId,
                    'modestbranding': 1,
                    'rel': 0,
                    'enablejsapi': 1,
                    'iv_load_policy': 3
                },
                events: {
                    'onReady': (event) => {
                        console.log(`YouTube Player for ${videoId} is ready!`);
                        players[videoId] = event.target; // ✅ 여기에 저장
                    },
                    'onStateChange': (event) => trackPlayerState(element, event)
                }
            });

            addClickPauseResume(element, player);
        });

        // Observer 설정 (플레이어가 생성된 후 실행해야 함)
        setTimeout(setupIntersectionObserver, 1000);
        setTimeout(playVisibleVideos, 1500); // 초기 로딩 시 현재 보이는 비디오 실행
    };
    function setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const videoId = entry.target.getAttribute("data-id");
                const player = players[videoId]; // ✅ videoId 기반으로 가져오기

                if (player && typeof player.playVideo === "function") {
                    if (entry.isIntersecting) {
                        player.playVideo();
                    } else {
                        player.pauseVideo();
                    }
                } else {
                    console.warn(`Player for ${videoId} is not ready yet.`);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll(".video-wrap[data-id]").forEach((element) => {
            observer.observe(element);
        });
    }
    function playVisibleVideos() {
        document.querySelectorAll(".video-wrap[data-id]").forEach((element) => {
            const rect = element.getBoundingClientRect();
            const videoId = element.getAttribute("data-id");
            const player = players[videoId]; // ✅ videoId 기반으로 가져오기

            if (player && typeof player.playVideo === "function") {
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    if (player.getPlayerState() !== 1) { // 재생 중이 아닐 때만 재생
                        player.playVideo();
                    }
                }
            }
        });
    }
    function addClickPauseResume(element, player) {
        element.addEventListener("click", () => {
            if (player && typeof player.getPlayerState === "function") {
                if (player.getPlayerState() === 1) { // 재생 중이면
                    player.pauseVideo();
                } else {
                    player.playVideo();
                }
            }
        });
    }
    function trackPlayerState(element, event) {
        if (event.data === YT.PlayerState.PAUSED) {
            element.classList.add("paused");
        } else {
            element.classList.remove("paused");
        }
    }
    window.addEventListener("load", () => setTimeout(playVisibleVideos, 1500));
    window.addEventListener("scroll", playVisibleVideos);

    // youtube slide
    function bindSwiperThumbnailClicks() {
        document.querySelectorAll('.swiper-slide').forEach(slide => {
            slide.addEventListener('click', function () {
                const newVideoId = this.dataset.videoId;
                const slider = this.closest('.youtube-slider');
                const videoWrap = slider.querySelector('.youtube-wrap .video-wrap');

                if (!videoWrap) {
                    console.warn('No video-wrap found in the slider.');
                    return;
                }

                const currentVideoId = videoWrap.getAttribute('data-id');
                const currentPlayer = players[currentVideoId];

                if (!currentPlayer) {
                    console.warn(`No player found for current videoId: ${currentVideoId}`);
                    return;
                }

                // ✅ 유튜브 영상 교체 + 소리 켜기 + 재생
                currentPlayer.loadVideoById(newVideoId);
                currentPlayer.unMute();
                currentPlayer.playVideo();

                console.log(`Loaded new video: ${newVideoId} (player for ${currentVideoId})`);

                // ✅ Swiper 시스템 내부의 swiper-slide-active 클래스 강제 조작
                const swiperEl = this.closest('.swiper');
                if (swiperEl) {
                    swiperEl.querySelectorAll('.swiper-slide').forEach(s => {
                        s.classList.remove('swiper-slide-active');
                    });
                    this.classList.add('swiper-slide-active');
                }
            });
        });
    }

    bindSwiperThumbnailClicks();
});
