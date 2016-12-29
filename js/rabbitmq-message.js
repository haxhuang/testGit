
var rabbitmqMessage = {
    uniqueID: undefined,
    userId: undefined,
    userName: undefined,
    ipAddress: undefined,
    heartbeatTime: 10000,
    heartbeatIntervalId: 0,
    running: false,
    dialogContainer: undefined,
    scroll: undefined,
    messageType: {
        TX: 0,
        CZ: 1        
    },


    
    init: function (uniqueID, userId, userName, ipAddress) {
        this.uniqueID = uniqueID;
        this.userId = userId;
        this.userName = userName;
        this.ipAddress = ipAddress;
       

        this.start();
    },
    start: function () {
        /// <summary>Start to receive rq message.</summary>
        if (this.running) {
            return;
        }
        // set this pointer.
        var self = this;
        // Stomp.js boilerplate
        var ws = new SockJS(StompServiceUrl);
        var client = Stomp.over(ws);
        // SockJS does not support heart-beat: disable heart-beats
        client.heartbeat.outgoing = 0;
        client.heartbeat.incoming = 0;
        client.debug = 0; //1，可在控制台看到消息，0，关闭消息显示

        // connect to RQ stomp server.
        client.connect('test', 'test123456', function () {
            var privateUrl = '/exchange/XXX_CLIENTS_WITH_WCF/' + self.userId;
            var broadcastLotteryUrl = '/exchange/XXX_ORDER_FANOUT';           

            client.subscribe(broadcastLotteryUrl, self.receive);
           
            client.subscribe(privateUrl, self.receive);
            // start send heart message
            //            var heartbeatFunc = function () {
            //                var heartbeatUrl = '/exchange/XXX_CLIENTS_WITH_WCF/06b5083c-9425-4a7c-b07f-8d5356f871db';
            //                var msg = {
            //                    messageType: self.messageType.Heartbeat,
            //                    sendExchange: '',
            //                    sendRoutKey: '',
            //                    sendTime: '',
            //                    sendType: 'direct',
            //                    sendContent: { "uniqueID": self.uniqueID, "userId": self.userId, "userName": self.userName, "ipAddress": self.ipAddress }
            //                };
            //                client.send(heartbeatUrl, { 'content-type': 'application/json' }, JSON.stringify(msg));
            //            };
            //            self.heartbeatIntervalId = setInterval(heartbeatFunc, self.heartbeatTime);
        }, this.onError, '/');
        this.running = true;
    },   
        var self = window.rabbitmqMessage;
        var d = JSON.parse(data.body);

        if ($("#lotteryTypeName").length > 0) {
            var lotteryTypeName = $("#lotteryTypeName").val();
            if (d.SendContent.LotteryType == "北京PK10") {
                d.SendContent.LotteryType = "北京PK拾";
            }
            if (lotteryTypeName == d.SendContent.LotteryType) {
                if (!refreshTag) {
                    showLotteryDrawresultByMessage(d.SendContent);
                }
            }
        }
        //推送开奖结果到flash开奖视频
        if ($("#pk10Animation").length > 0 && $("#lotteryName").length > 0) {            
            var lotteryTypeName = $("#lotteryName").val();
            if (d.SendContent.LotteryType == "北京PK10") {
                d.SendContent.LotteryType = "北京PK拾";
            }
            if (lotteryTypeName == d.SendContent.LotteryType) {                
                var array = d.SendContent.CurrentLotteryNum.split(",");
                self.thisMovie("ActionJs").gameOver(array);
            }
        }
    },
    thisMovie: function (movieName) {
        if (navigator.appName.indexOf("Microsoft") != -1) {
            return window[movieName];
        }
        else {
            return document[movieName];
        }
    },
        var self = window.rabbitmqMessage;
        var d = JSON.parse(data.body);

        if ($("#lotteryTypeName").length > 0) {
            var lotteryTypeName = $("#lotteryTypeName").val();
            if (lotteryTypeName.indexOf("秒秒彩") > -1) {
                if (d.SendContent.Msg != null && d.SendContent.Msg != '') {
                    alert(d.Msg);
                    return;
                }

                if (!refreshTag) {
                    showMMCLotteryResult(d.SendContent.LotteryType, d.SendContent.Sequence, d.SendContent.Results, d.SendContent.TotalMoney, d.SendContent.SecMultiple);
                }
            }
        }
    },

    receive: function (data) {
               
    },
    onError: function (error) {
        rabbitmqMessage.running = false;
        setTimeout("rabbitmqMessage.start()", 5000)
    },
    
};


    btmTips: {//
        param: {
            isMoving: false, //是否正在移动中
            outMovingTip: null,
            boxSelector: "#lotterry_tip_box", //哪个框下的tip
            itemSelector: "#lotteryItem",
            style: {//下一个tip的style
                height: 104,
                transition: "bottom .5s cubic-bezier(0.3, 0.57, 0, 1.03),opacity .5s cubic-bezier(1, 0.01, 0.57, 1.18);",
                outTransition: "bottom 0.5s cubic-bezier(0.3, 0.57, 0, 1.03),opacity .5s cubic-bezier(0.07, 1.16, 0.77, 0.71)",
                zIndex: 9000, //越来越小
                bottom: -104,
                opacity: 0.1
            }
        },
        //添加一个tip
        addTips: function (param) {
            if (HST.btmTips.param.isMoving) {
                return;
            }
            var hasWaiting = HST.btmTips.findLast(param);
            if (hasWaiting) {
                return; //主动的不要这个
            }
            if (HST.btmTips.param.waitingNum > 0) {
                return;
            }
            //HST.btmTips.findLast();
            //HST.btmTips.param.isMoving = true;
            var pm = {
                tipImgUrl: "images/lottery03.png",
                tipTitle: "开奖信息",
                lotteryFont: "本期盈亏 <b class='green'><em class='fs20'>-</em><em class='fs24'>9.</em><em>3100</em></b><i class='signicon kuiicon'></i>",
                lotteryContent: "和记时时彩 <span>1000187057</span> 已开奖"
            };
            $.extend(pm, param);
            var reg = /\{(\w*?)\}/g;
            var style = HST.btmTips.param.style;
            var zIndex = style.zIndex;
            var html = $(HST.btmTips.param.itemSelector).html().replace(reg, function (match, key) {
                if (key == "style") {
                    var sty = "z-index:" + zIndex + ";height:" + style.height + "px;bottom:" + style.bottom + "px;opacity:" + style.opacity + ";transition:" + style.transition;
                    return sty;
                } else if (key == "zIndex") {
                    return zIndex;
                }
                return pm[key];
            });

            $(html).appendTo(HST.btmTips.param.boxSelector);
            var los = $(".lottery_bg[data-index=" + zIndex + "]", HST.btmTips.param.boxSelector);
            los.css(
                {
                    bottom: function () {
                        var btm = parseInt($(this).css("bottom")) + (style.height - 6);
                        return btm;
                    }
                });
            los.css("opacity", 1);
            style.zIndex++;
            style.bottom += (style.height - 12);
            $(".lottery_close", los).click(function () {
                HST.btmTips.param.outMovingTip = setTimeout(
                    function () {
                        HST.btmTips.outTips(los.index() - 1);
                    }, 200);
            });
            //            clearTimeout(HST.btmTips.param.outMovingTip);
            //            HST.btmTips.param.outMovingTip = setTimeout(HST.btmTips.outTips, 1500);
            var ind = los.index();

            HST.btmTips.param.outMovingTip = setTimeout(function () { HST.btmTips.outTips(ind - 1); }, 10 * 1000);
        },
        //遍历，每0.5秒钟查找一次，如果opacity < 1*0.8则继续下一轮。否则终止
        findLast: function (param) {
            var last = $(".lottery_bg:last", HST.btmTips.param.boxSelector);

            if (last.length == 0) {
                return false; //第一个 不用判断
            }
            var op = last.css("opacity");
            if (op >= 0.8) {
                return false;
            } else {
                //自动一个定时器
                //删掉z-index=0的项目
                $(".lottery_bg", HST.btmTips.param.boxSelector).each(function () {
                    var zIndex = $(this).css("z-index");
                    if (zIndex == "0") {
                        $(this).remove();
                    }
                });
                setTimeout(function () { HST.btmTips.addTips(param); }, 200);
            }
            return true;
        },
        outTips: function (index) {//移除第一个并且所有的lo都下来            
            var los = null;
            if (index < 0) {
                los = $(".lottery_bg", HST.btmTips.param.boxSelector);
            } else {
                los = $(".lottery_bg:gt(" + index + ")", HST.btmTips.param.boxSelector);
            }
            if (los.length == 0) {
                return;
            }
            los.css("transition", HST.btmTips.param.style.outTransition);
            var style = HST.btmTips.param.style;
            var first = los.eq(0);
            if (first.css("opacity") < 0.01) {
                $(first).remove();
                if (los.length == 1) {
                    return;
                }
                first = los.eq(1);
            }
            los.css(
                {
                    bottom: function () {
                        var btm = parseInt($(this).css("bottom")) - (style.height - 12);
                        return btm;
                    },
                    transition: style.outTransition
                });
            first.css("opacity", 0);
            first.css("z-index", 0);
            style.bottom -= (style.height - 12);
            setTimeout(HST.btmTips.outTips, 1500);
        }
    }
}