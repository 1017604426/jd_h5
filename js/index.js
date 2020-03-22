// 导航栏滚动时透明度改变;
//目标：当滚出轮播图高度时，导航条的透明度设置为1,并且往下滑动不在改变；
//当页面加载之后，得到轮播图板块的高度,在banner图内，透明度随滑动改变;
// 当滚动条向下滚动时，得到banner滚动出屏幕的的高度;
window.onload = function () {
    var banner = document.querySelector("#banner_box");
    var bannerHeight = banner.offsetHeight;
    var jd_search = document.querySelector("#jd_search");
    var index = 1;
    var lb_width = document.querySelector(".lb_width");
    //lb_width的宽度；
    var lb_widths = lb_width.offsetWidth;
    window.onscroll = function () {
        var offetTop = document.documentElement.scrollTop || document.body.scrollTop;
        var opactiy = 0;
        opactiy = parseInt(bannerHeight) / parseInt(offetTop);
        if (offetTop <= bannerHeight) {
            jd_search.style.backgroundColor = "rgba(228, 48, 47, " + opactiy + ")";
        } else if (offetTop >= 660) {
            // 当滚动到某个个板块时（距离顶部660px高度时）;
            var top_btn = document.querySelector(".return_top");
            top_btn.style.display = "block";
            // 跳出来回到顶部按钮，
            // 并且按钮消失;
        } else {
            var top_btn = document.querySelector(".return_top");
            top_btn.style.display = "none";
        }
    };
    //轮播图 自动轮播计时器 调用轮播事件
    var jsq = setInterval(function () {

        auto_click(index);
        //1.图片偏移，设置index，计算出偏移值；
        index++;
        //lb_width像左偏移index个li 的宽度；
        //li的宽度
        var li_width = lb_widths / 5;
        //2.添加偏移过渡效果；有个问题，没有渠道最后一张图，直接跳转到第一张，需要后面清除清除
        lb_width.style.transition = "left 1s ease-in-out";
        //3.实现滑动
        lb_width.style.left = (-index) * li_width + "px";
        //由于代码同时执行，导致无法到达最后一张图显示就跳转，过渡很生硬；
        //此时需要一个延迟操作来弥补这个缺点；
        setTimeout(function () {
            if (index >= 4) {
                //回到第一张图

                index = 1;
                //清除过渡效果
                lb_width.style.transition = "none";
                lb_width.style.left = (-index) * li_width + "px";
            }
        }, 500);
        //当轮播图到最后一张时，需要会带默认的第一张图，需要做判断；
        //圆点透明度改变；

    }, 3000);
    //实现手动轮播效果
    //设置变量 因为轮播图只是在x轴方向 滑动 所以只改变x的坐标
    var startX, moveX, distanceX, distanceNew = -640;
    //获取开始点击的坐标值
    lb_width.addEventListener("touchstart", function (e) {
        //之前touch事件之前 先关闭计时器；
        clearInterval(jsq);
        //关闭过渡效果
        lb_width.style.transition = "none";
        startX = e.targetTouches[0].clientX;
        //console.log("开始坐标" + startX);
    });
    //获取移动之后的坐标值
    lb_width.addEventListener("touchmove", function (e) {
        moveX = e.targetTouches[0].clientX;
        //console.log("移动停止坐标" + moveX);
        //获取移动之后 与 初始位置的差值；
        distanceX = moveX - startX;
        //console.log("位移：" + distanceX);
        //因为每一次移动都会让坐标的变化，所以在第二次移动时，他此时的位置已经不再是初始的-640的位置，
        //他是基于新的位置进行移动的  所以此时偏移的距离应该是 初始+上一次移动的距离+本次移动的距离；
        distanceNew = distanceNew + distanceX;
        console.log("最终偏移距离" + distanceNew);
        //判断是否偏移  如果偏移位置绝对值小于或等于1800px可以偏移 否则不动；
        //var numeber_abs = Math.abs(distanceNew);
        // console.log(numeber_abs);
        //console.log(typeof (-lb_widths));

        // if (distanceNew >= -(lb_widths - 640) && distanceNew <= 640) {
        //执行偏移
        // var move_width = distanceNew + 'px';
        //console.log("距离初始位置的距离" + distanceNew);
        // debugger;
        //做一个限定，当滑动总距离超过ul的宽度时，应该停止；
        //左边的值为0px  右边为-3200px
        if (distanceNew >= 0) {
            lb_width.style.left = -640 + "px";
        } else if (distanceNew <= -1920) {
            //debugger;
            lb_width.style.left = -1920 + "px";
        } else {
            lb_width.style.left = parseInt(distanceNew) + "px";
        }

        // }
        //console.log(index);

        //var ss = lb_width.style.left;

    });
    //触摸结束；
    banner.addEventListener("touchend", function (e) {
        //手指松开之后的事件；
        //如何滑动距离超过li的10%；图片滚动到下一张；
        if ( Math.abs(distanceX) >= 100) {
            if (distanceX>0){
                index++;
            }else{
                index--;
            }
            //lb_width像左偏移index个li 的宽度；
            //li的宽度
            var li_width = lb_widths / 5;
            //2.添加偏移过渡效果；有个问题，没有渠道最后一张图，直接跳转到第一张，需要后面清除清除
            lb_width.style.transition = "left 1s ease-in-out";
            //3.实现滑动
            lb_width.style.left = (-index) * li_width + "px";
        }else if (Math.abs(distanceX) >0){
            //如果没有超过100，图片回到当前位置；
            var li_width = lb_widths / 5;
            //2.添加偏移过渡效果；有个问题，没有渠道最后一张图，直接跳转到第一张，需要后面清除清除
            lb_width.style.transition = "left 1s ease-in-out";
            //3.实现滑动
            lb_width.style.left = (-index) * li_width + "px";
        }

    });
}

//自动轮播事件
function auto_click(index) {
    //假设当前显示的是第一张图片，每隔3秒向左滑动一张图片的宽度距离，展示第二张图 以此类推；

    //当图片滚动到最后一张图时，将它切换到第一张 继续滚动；
    //设置圆点偏移 默认第一个圆点透明度为1
    // 将展示图片对应的小圆点透明度设置为1即可
    //默认展示的图片是第二张，标志是index=1，
    var yd = document.querySelector("#yd");
    var frist_span = yd.querySelector("span");
    var all_span = yd.querySelectorAll("span");
    // var yd_child=document.querySelectorAll('span');
    //第一个圆点默认为选中状态


    frist_span.style.backgroundColor = "rgba(255,255,255,1)";
    //遍历小圆点，当index值发生变化时。设置圆点的透明度
    for (var i = 0; i < all_span.length; i++) {
        all_span[i].style.backgroundColor = "rgba(255,255,255,0.5)";
    }
    all_span[index - 1].style.backgroundColor = "rgba(255,255,255,1)";

}

function top_click() {
    // 点击按钮时，页面跳转到顶部
    //获取到当前距离顶部的位置；
    // var offetTop = document.documentElement.scrollTop || document.body.scrollTop;
    //将位置设置为0；
    document.documentElement.scrollTop = "0";
    var top_btn = document.querySelector(".return_top");
    top_btn.style.display = "none";
}

//轮播图的js效果  1.自动右滑动   2. 手动滑动 ，左右滑动，所以需要

//当滑最后一张时和第一张图向前滑动，需要过渡 所以需要添加两张图片；
//由于在第一张图之前加入了最后一张图  所以我们需要设置默认偏移  将第一张图展示出来；
//方法1： transform：translateX(-10%); 方法二：定位来实现:相对定位(绝对定位会让父元素没有高度)

// 第一张图前面放一张他最后那张图   最后一张图后面放第一张图；

//手机端没有左右箭头   但是有滑动事件
//当手指按在图片时  可以向左 或向右滑动
//此时设定滑动距离   当滑动多少距离  图片滚动到下一张或上一张  如果距离不够则反弹回原图 touch事件
//轮播图的bug：如果用户滑动过快，在图片未完成移动之后，不断滑动，会导致边缘限定事件未能触发；出现空白块；

//实现手动轮播图效果
//1.记录开始的触摸的位置
//2.得到移动的位置
//3.计算出位移距离（做判断：移动位置超过多少滚动到下一张  未达到反弹回去）
