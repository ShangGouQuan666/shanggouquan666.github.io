$(function(){
	var $slider = $('.slider'),
		$list = $('.slider_pic'),
		$btn = $('.slider_btn a'),
		$round = $('.circle'),
		
		//获取窗口大小
		v_width = $slider.width(),
		//获取图片个数
		len = $list.children("li").length,
		timer = null,
		page = 1,
		cli = "<li></li>";
	//根据窗口大小，进行图片规格设置
	$list.find('img').width(v_width);
	for(var i = 0;i < len - 1;i++){
		cli += "<li></li>";
	}
	//将生成的一组li节点插入到.circle下最后位置，并为第一个li元素挂载样式
	$round.append(cli).children(':first').addClass("selected")
	
	//找到图片列表中的第一个li，复制它，并把复制结果，插入到图片列表的最后方
	$list.children(":first").clone().appendTo($list)
	
	$slider.mouseover(function(){
		clearInterval(timer)
	}).mouseout(function(){
		timer = setInterval(move,2000)
	}).trigger("mouseout")
	
	function move(dir){
		//防流氓行为，通过当前动画的运动状态来判断
		if(!$list.is(":animated")){
			//如果传进来的是prev，则动画反向移动
			if(dir == "prev"){
				//如果是第一张图像
				if(page == 1){
					//马上瞬移到猫腻图上
					$list.css("left",len * v_width * -1)
					//在执行向前动画
					$list.animate({
						left:$list.position().left + v_width
					})
					//并定位当前page页码
					page = len
					//小圆动画与列表动画同步执行
					circlemove()
				}else{
					$list.animate({
						left:$list.position().left + v_width,
					})
					page--;
					circlemove()
				}
			}else{
				//如果图片超出了总列表长度,此时会进入猫腻图,即时发生
				if(page > len){
					//瞬移到第一张,因为猫腻图与第一张一模一样,通过css即时渲染,肉眼无法发现
					$list.css("left",0)
					//再次执行动画,进入第二张
					$list.animate({
						left:$list.position().left + v_width * -1
					})
					//从第二张开始再执行动画,page即为2
					page = 2
					circlemove()
				}else{
					$list.animate({
					left:$list.position().left - v_width
				})
				page++;
				circlemove()
				}
			}
		}
	}
	
	$btn.click(function(){
		// 通过获取不同a元素的类名,来判断,是看前一张还是后一张,所以取出类名并作为实参传入到函数中，并做为判断依据
		var btnClass = $(this).prop("class")
		move(btnClass)
	})
	
	function circlemove(){
		//如果图片列表移动到了猫腻图上,那么马上为第一张点灯，因为猫腻图第一张图像的
		if(page > len){
			$round.children("li").eq(0).addClass("selected").siblings().removeClass("selected")
		}
		//eq()参数必须索引，从0开始，而page是从1开始，所以要匹配小圆与对应图片，index = page - 1
		//为指定小圆添加样式，同时，所有同级元素，删除样式
		$round.children("li").eq(page - 1).addClass("selected").siblings().removeClass("selected")
	}
})