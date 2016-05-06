function $(element){
	// 获取 DOM 对象的短写，如果你在用 jQuery 也可以采用类似的方法
	return document.getElementById(element);
};

window.addEventListener('load', function(){
	// 在窗体载入完毕后再绑定
	var CM = new CommentManager($('my-comment-stage'));
	CM.init();
	
	// 先启用弹幕播放（之后可以停止）
	CM.start();
	
	// 绑定按钮们
	$('btnLoadTimeline').addEventListener('click', function(e){
		e.preventDefault(); // 抑制默认操作
		var danmakuTimeline = [
			{
				"mode":1,
				"text":"Hello World",
				"stime":100,
				"size":25,
				"color":0x0
			},
			{
                "mode":1, // 下端
				"text":"anzizhao",
				"stime":500,
				"size":35,
				"color":0x0,
                'dur': 10000   // 弹幕时间  可以控制速度
			},
		];
        var range = new Array(4);
        var baseTime = 1000
        var baseSize = 40 
        for( var i=0; i<range.length; i ++ ) {
            var item = {
                "mode": 1, 
				"text":"anzizhao" + String(i),
				"stime": baseTime + 500*i,
				"size": baseSize + 2*i,
				"color":0x0,
                'dur': 10000
            } 
            danmakuTimeline.push( item )
        
        }

		CM.load(danmakuTimeline);
	});
	
	$('btnInsertTimeline').addEventListener('click', function(e){
		e.preventDefault(); // 抑制默认操作
		var danmaku = {
			"mode":1,
			"text":"Hello CommentCoreLibrary",
			"stime":1000,
			"size":30,
			"color":0xff0000
		};
		CM.insert(danmaku);
	});
	
	var startTime = 0, iVal = -1;
    var speed = 1;

	$('speed').addEventListener('change', function(e){
		e.preventDefault(); // 抑制默认操作
        speed  = parseInt( this.value, 10 ) 
        console.log('onchange speed: ', speed)
        //CM.options.global.scale = speed
        CM.speed(speed/10)
	});

	$('btnTimer').addEventListener('click', function(e){
		e.preventDefault(); // 抑制默认操作
		startTime = Date.now(); // 设定起始时间
		if(iVal >= 0){
			clearInterval(iVal); // 如果之前就有定时器，把它停掉
		}

		//建立新的定时器
		iVal = setInterval(function(){
			var playTime = Date.now() - startTime; // 用起始时间和现在时间的差模拟播放
            CM.time(playTime ); // 通报播放时间
			$('txPlayPos').textContent = playTime; // 显示播放时间
		}, 100); // 模拟播放器每 100ms 通报播放时间
	});
	
	// 开放 CM 对象到全局这样就可以在 console 终端里操控
	window.CM = CM;
});
