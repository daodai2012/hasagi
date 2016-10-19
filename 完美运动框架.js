
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
function startMove(obj,json,fn){
	clearInterval(obj.timer);
	var flag = true;
	obj.timer = setInterval(function(){
		for(var attr in json){
			var icur = 0;
			if(attr == 'opacity'){
				icur = Math.round(parseFloat(getStyle(obj,attr))*100);
			}else{
				icur = parseInt(getStyle(obj,attr));
			}
			// if(icur<=json[attr]){
			// 	speed = 5;
			// }else{
			// 	speed = -5;
			// }
			var speed = (json[attr]-icur)/8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			document.title = speed+','+icur;
			if(icur != json[attr]){
				flag = false;
			}
		
			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:'+(icur+speed)+')';
				obj.style.opacity = (icur+speed)/100;
			}else{
				obj.style[attr] = icur+speed+'px';
			}

			if(flag){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}
			
		}

	},30);
}