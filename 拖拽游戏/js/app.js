/**
 * Created by Macbook on 2016/3/23.
 */

function movedown(event) {
    return;
    var id = event.target.getAttribute("id");
    event.target.style.background = "url(images-new/" + id + ".png) no-repeat";
    //alert("success")
}

function moveup(event) {
    return;
    var id = event.target.getAttribute("id");
    event.target.style = "";
    //alert("success")
}

//规定被拖元素的数据,此数据会被传入放置事件中
function dragStart(event) {
    event.dataTransfer.setData("Ids", event.target.id);
    event.dataTransfer.setData("type", event.target.getAttribute("data-type"));
}
// 碰到目标时候，目标所发生的事情
function dragEnter(event) {
    event.target.className = "dropBox"; //清除动画class

    var thisIds = event.target.getAttribute("id");
    //console.log(event.target.className);
    switch (thisIds) {
        case "dropA":
            console.log("A");
            event.target.style.backgroundPosition = "-24px -217px";
            break;
        case "dropB":
            event.target.style.backgroundPosition = "-283px -217px";
            break;
        case "dropC":
            event.target.style.backgroundPosition = "-541px -216px";
    }
    document.getElementById(thisIds).getElementsByTagName("span")[0].style.display = "none";
    //event.target.style.background="url(images-new/"+thisIds+"-hv.png) no-repeat";
}
// 离开目标的时候，目标发生的事情
function dragLeave(event) {
    event.target.style = "";
    var thisIds2 = event.target.getAttribute("id");
    var numberTips=document.getElementById(thisIds2).getElementsByTagName("span")[0];
    var tags = event.target.getElementsByTagName("div").length;
    (tags > 0) ? numberTips.style.display = "block": numberTips.style.display = "none";
}
// ondragover事件默认不允许放置元素，这时必须阻止默认的处理方式，
function allowDrop(event) {
    event.preventDefault();
}

// 进行放置，在目标元素中调用，简单说就是将被拖元素的id放入目标中
function drop(event) {
    event.preventDefault(); //避免默认drop事件是以链接打开
    var data = event.dataTransfer.getData("Ids"); //被拖的id
    var draging = document.getElementById(data);
    var dataType = event.dataTransfer.getData("type") //被拖的type类型
    var thisId = event.target.getAttribute("id"); //目标的id
    event.target.style.border = "none";
    var numTips = event.target.getElementsByTagName("span")[0];
    event.target.style = "";
    error.className = "errorBox"; //重置弹窗的class
    error.style.display = "none"; //每次放置都隐藏掉弹窗
    //numTips.style.display="block";
    if (dataType == thisId) {
        event.target.appendChild(draging);
        var tags = event.target.getElementsByTagName("div").length;
        draging.style.display = "none";
        if (tags > 0) {
            numTips.innerHTML = tags;
            numTips.style.display = "block";
        }
        globalDrag = data;
        dragNum = data.charAt(10); //设置全局变量
        //  var hooks=document.getElementsByClassName("status");
        // function hookOption(){
        //   var hookStatus=document.getElementsByClassName("status")[dragNum-1]; hookStatus.style.display="block";
        //   addClass(hookStatus,["animated","bounceIn"])
        // }
        hook("block");


    } else {
        var tags = event.target.getElementsByTagName("div").length;
        (tags > 0) ? numTips.style.display = "block": numTips.style.display = "none";
        draging.style = ""; //清除被拖元素的背景
        error = document.getElementById("error"), close = document.getElementById("close");
        error.style.display = "block";
        addClass(error, ["animated", "bounceInDown", "faseZoomIndown"])
        close.onclick = function() {
            addClass(error, ["bounceOutUp"]);
        }
        addClass(event.target, ["animated", "shake", "custom-animate"]);
    }

}
//钩钩的状态
var hook = function(status) {
    if (dragNum >= 10) {
        var hookStatus = document.getElementsByClassName("status")[dragNum - 1];
        hookStatus.style.display = status;
        addClass(hookStatus, ["animated", "bounceIn"])
    } else {
        var dragNum2 = globalDrag.substring(10, 13);
        console.log(dragNum)
        var hookStatus2 = document.getElementsByClassName("status")[dragNum2 - 1];
        hookStatus2.style.display = status;
        addClass(hookStatus2, ["animated", "bounceIn"])
    }
}

//创建方法fn : 追加多个Class
function addClass(ele, cls) {
    for (var i in cls) {
        if (!ele.className) {
            ele.className = cls[i];
        } else {
            var c = ele.className;
            c += " " + cls[i];
            ele.className = c;
        }

    }
}
// 为每个盒子数量图标绑定事件
// function sort(){
//   var drops=["dropA","dropB","dropC"];
//   for(var target in drops){
//    var drop=document.getElementById(drops[target]);
//    var sortBtn=drop.getElementsByTagName("span")[0];
//    var divLen=drop.getElementsByTagName("div");
//    sortBtn.onclick=function(){
//      for(var i=0;i<divLen.length;i++){
//         var divs=drop.getElementsByTagName("div")[i];
//         console.log(i);
//         console.log(divs)
//         document.getElementById("content").appendChild(divs);
//         divs.style.display="block";divs.className="";
//         addClass(divs,["drag","animated","bounceIn"]);
//         hook("none");
//      }
//    }
//  }
// }
// sort();

// 数量图标被点击所发生的函数（判断打钩、盒子开合、盒子内元素回位）
function sort() {
    $(".dropBox span").click(function() {
        var childDiv = $(this).siblings("div");
        //  遍历当前盒子的子元素，进行匹配取消打钩图标
        $.each(childDiv, function(i) {
            var childIds = childDiv.eq(i).attr("id");
            var dragNum = childIds.charAt(10);
            if (dragNum >= 10) {
                var hookStatus = document.getElementsByClassName("status")[dragNum - 1];
                hookStatus.style.display = "none";

            } else {
                var dragNum2 = childIds.substring(10, 13);
                var hookStatus2 = document.getElementsByClassName("status")[dragNum2 - 1];
                hookStatus2.style.display = "none";
            }
        })
        var thisPra = $(this).parent(".dropBox");
        var divs = $(this).siblings("div");
        divs.show();
        var thisPraAttr = thisPra.attr("style");
        // 判断打开和关闭
        if (!thisPraAttr) {
            switch (thisPra.attr("id")) {
                case "dropA":
                    thisPra.css({
                        "backgroundPosition": "-24px -217px"
                    });
                    break;
                case "dropB":
                    thisPra.css({
                        "backgroundPosition": "-283px -217px"
                    });
                    break;
                case "dropC":
                    thisPra.css({
                        "backgroundPosition": "-541px -216px"
                    });
                    break;
            }
            divs.attr("ids", thisPra.attr("id"));
            $(this).hide();
        } else {
            switch (thisPra.attr("id")) {
                case "dropA":
                    thisPra.css({
                        "backgroundPosition": "-24px 37px"
                    });
                    break;
                case "dropB":
                    thisPra.css({
                        "backgroundPosition": "-283px 36px"
                    });
                    break;
                case "dropC":
                    thisPra.css({
                        "backgroundPosition": "-543px 36px"
                    });
                    break;
            }


        }
        // $(this).parent(".dropBox").siblings("div").css({"backgroundPosition":""});  //其余盒子关闭
        divs.css({
            "background": ""
        }); //清除点击的图片
        $(".container").append(divs); //让盒子里的元素回到原位中
        divs.removeClass();
        divs.addClass("drag animated bounceIn " + $(this).parent().attr("id"))


        // 回到放置
        // var containerDivs=$(".container .drag");
        // var dropIds=$(".dropTarget > div");
        // var thisPar2=$(this).parent(".dropBox");
        //divs.attr("ids",thisPra.attr("id"));

        // $.each(dropIds,function(i){
        //   $.each(containerDivs,function(c){
        //     if(containerDivs.eq(c).attr("ids")==dropIds.eq(i).attr("id")){
        //         dropIds.eq(i).append(containerDivs.eq(c));
        //     }
        //   })
        // })

    })
}
sort();

//跟随鼠标移动
// function DivFlying() {
//   var div = document.getElementById("pic");
//   if (!div) {
//  return;
//   }
//   var intX = window.event.clientX;
//   var intY = window.event.clientY;
//   div.style.left = intX + "px";
//   div.style.top = intY + "px";
// }
// document.onmousemove = DivFlying;