$.fn.timeLine = function(opts){
    var defaults = {
        val: '2010.01',
        end: new Date().getFullYear(),
        start: 2006,
        fn: function(){}
    }
    opt = $.extend(defaults,opts);
    var _this = $(this),
        tempPos = 0,
        limit = opt.end - opt.start + 1,
        structor = '<div class="T_axis"><s class="T_l"></s><s class="T_r"></s></div>'+
                    '<div class="T_box">'+
                        '<div class="T_staff"></div>'+
                        '<div class="T_unit"></div>'+
                        '<div class="T_time_hover"></div>'+
                    '</div>';
    $(this).append(structor);
    var limits = limit * 12,
        w1 = parseInt(parseInt($('.T_box',this).width())/limits), // 每格尺寸
        w2 = (w1-1)/2; // 每格周边范围

    init();

    function init(){
        getCell();
        setVal();
        $(".T_box").click(function(e){
            if(e.target.tagName.toLowerCase() == 's' || e.target.className == 'T_box'){
                var posX=(e.offsetX==undefined) ? getOffset(e).X : e.offsetX ;
                if(e.target.tagName.toLowerCase() == 's'){
                    posX += e.target.offsetLeft;
                }
                var count = Math.ceil((posX-w2)/w1); // 定位格数
                var y = opt.start + parseInt(count/12), //定位年数
                    m = count%12 + 1; // 定位月份+1
                m<10 && (m = '0' + m);

                if(count < limit*12){
                    $('.T_time',_this).css('left',count*w1-31).text(y + '.' + m);
                    $('.T_time_hover',_this).hide();
                    opt.fn($('.T_time',_this).text());
                    setTempPos(count);
                }
            }
        }).mousemove(function(e){
            if(e.target.tagName.toLowerCase() == 's' || e.target.className == 'T_box'){
                var posX=(e.offsetX==undefined) ? getOffset(e).X : e.offsetX ;
                if(e.target.tagName.toLowerCase() == 's'){
                    posX += e.target.offsetLeft;
                }
                var count = Math.ceil((posX-w2)/w1); // 定位格数
                var y = opt.start + parseInt(count/12), //定位年数
                    m = count%12 + 1; // 定位月份+1
                m<10 && (m = '0' + m);
                if(count < limit*12 && count != tempPos){
                    $('.T_time_hover',_this).css('left',count*w1-31).text(y + '.' + m).show();
                }else{
                    $('.T_time_hover',_this).hide();
                }
            }
        }).mouseleave(function(e){
            $('.T_time_hover',_this).hide();
        })
    }
    function setVal(){
        var init_split = opt.val.split('.'),
            init_y = parseInt(init_split[0]),
            init_m = parseInt(init_split[1]),
            init_txt = (init_y - opt.start) * 12 + init_m -1;
        $('.T_box',_this).append('<div class="T_time" style="left:' + (init_txt*w1-31)  + 'px">'+ opt.val +'</div>');
        setTempPos(init_txt);
    }
    function setTempPos(v){
        tempPos = v;
    }

    function getCell(){
        var rule = '',
            html = '',
            unit = '<span class="" style="left:-90px">' + opt.start + '年以前' + '</span>';
        for(var i=0; i<limits; i++){
            var sw = i*w1;
            if(i%12==0){
                html += '<s class="fir" style="left:'+ (i*w1-2) +'px"></s>';
                unit += '<span class="" style="left:' + (i*w1-20) + 'px">' + (parseInt(opt.start + i/12) + '.01') + '</span>';
            }else{
                html += '<s class="oth" style="left:'+ i*w1 +'px"></s>';
            }
        }
        $('.T_staff',_this).html(html);
        $('.T_unit',_this).html(unit);
    }

    // 鼠标坐标减去元素坐标，等于鼠标在元素内的相对坐标
    function getOffset(e){
      var target = e.target, // 当前触发的目标对象
          pageCoord,
          offsetCoord;
      pageCoord = getPageCoord(target);
      offsetCoord = {
          X: e.pageX - pageCoord.X,
          Y: e.pageY - pageCoord.Y
      };
      return offsetCoord;
    }
    function getPageCoord(element){
        var coord = { X : 0, Y : 0 };
        while(element){
            coord.X += element.offsetLeft;
            coord.Y += element.offsetTop;
            element = element.offsetParent;
        }
        return coord;
    }
}
