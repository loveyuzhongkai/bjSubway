/**
 * Created by chenjun on 16/2/29.
 */
var subwayData = {
    "1号线": ["西朗", "坑口", "芳村", "黄沙"],
    "2号线": ["公园前", "车陂路", "长寿路", "天河北"]
};
var edgsDate = [["西朗", "坑口", 2.5], ["坑口", "芳村", 1.9], ["芳村", "黄沙", 2.4]
    ["公园前", "车陂路", 2.9], ["车陂路", "长寿路", 3.1], ["长寿路", "天河北", 2.8]];

var $j = jQuery.noConflict();//定义JQuer命名空间
function init() {
    initSubwayBox();
    initSubwayClick();
}
//获取地铁线路并返回
function getSubwayLineHtml() {
    var htmls = [];
    i = -1;
    className = ["op-subway-one", "op-subway-two"];
    for (var lineName in subwayData)
        i++,
            htmls.push("<li><span class=" + className[i] + "><span>" + lineName + "</li>");
    return htmls.join("");//返回纯粹的标签值
}

//根据传入的参数获取线路的具体站点
function getSubwayStationHtml(lineName) {
    for (var stations = subwayData[lineName], htmls = [], i = 0; i < stations.length; i++)
        htmls.push("<li>" + stations[i] + "</li>");
    return htmls.join("");
}

//获取车站站点信息
function tryActiveButton() {
    var start = $j(".op-subway-box-start .op-subway-station em").text();
    var end = $j(".op-subway-box-end .op-subway-station em").text();
    if ("选择车站" != start && "选择车站" != end)
        $j(".op-subway-button").addClass(".op-subway-button_g").removeClass(".op-subway-button");
}

//初始化
function initSubwayBox() {
    var lineHtml = getSubwayLineHtml();//获取当前返回的线路
    $j(".op-subway-line .op-subway-ul").html(lineHtml);//添加进ul标签下
    $j(".op-subway-line .op-subway-ul").on("click", "li",//点击li标签线路是触发的事件
        function () {
            var lineName = $j(this).text();//把点击的路线传给lineName
            $j(this).parent().parent().parent().find(".op-subway-line em").css({
                padding: "0px 5px 0px 20px"
            }),
                $j(this).parent().parent().parent().find(".op-subway-station").css({
                    background: "#fff"
                }),
                $j(this).parent().parent().parent().find(".op-subway-station em").css({
                    color: "#333"
                });
            var stationHtml = getSubwayStationHtml(lineName);//获得路线的各个站点
            $box = $j(this).parent().parent().parent();
            $box.find(".op-subway-ulk").html(stationHtml);//把站点添加进去
            var firstStation = subwayData[lineName][0];
            $box.find(".op-subway-station em").text(firstStation);//根据点击的线路设置第一个站点为默认
            tryActiveButton();
        })
}
function initSubwayClick() {

    $j(".op-subway-line,.op-subway-station").on("click",
        function (event) {
            if (event.stopPropagation(), $j(".op-subway-st").hide(), $j(".op-subway-box ul").hide(), $j(this).find("ul").children().length)
                $j(this).find("ul").show();
            $j(document).on("click",//选择线路和站点后
                function () {
                    $j(".op-subway-box ul").hide();//隐藏ul框
                });
        });
    $j(".op-subway-ul,.op-subway-ulk").on("click",
        function (event) {
            event.stopPropagation();
            $j(this).parent().parent().parent().find("em").html($j(this).html());
            $j(this).parent().parent().parent().find("ul").hide();
        });
}
init();
