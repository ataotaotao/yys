

//js开始
		;(function(){
			//第一部分：hover .li使得头部添加背景色
		  	;(function(){
				var $nav = $('.top-nav');
				    $left_nav = $('.top-nav .left-nav'),
				    $area = $('.top-nav .right-nav > ul > li.area'),
				    $logo = $('.banner .name')
                ;

				//hover li使得背景变色
				$area.hover(function(){
					$nav.addClass("active");
				},function(){
					$nav.removeClass("active");
				});


				//刚出来的时候banner_name 从左边出来
				$logo.animate({left:60},500);

				//滚动scroll让left-nav显示
				$left_nav.hide();
				window.addEventListener('scroll',function(e){
					if($(document).scrollTop() > 50){
						$logo.addClass('scale');
						$nav.addClass("active");
						$left_nav.fadeIn();
					}else{
						$logo.removeClass('scale');
						$nav.removeClass("active");
						$left_nav.fadeOut();
					}
				},true)
			})();


			//在头部的banner转换
			;(function(){
				var $img = $('.banner .center-banner .banner-area .banner-img a'),
				    $btn = $('.banner .center-banner .banner-area .controller'),
                    a = 0,
                    b = 0,
				    onoff = true;//用来判断点击是奇数次点击还是偶数次点击，以便来判断哪些转化

				//刚出现的时候第一二个有进场动画
				$img.eq(0).animate({left:20,opacity:1},500);
				$img.eq(1).animate({left:319,opacity:1},500);
				$btn.on('click',function(){
                    [a,b] = onoff?[0,234]:[20,319];
                    arr = onoff?[0,1,2,3]:[2,3,0,1];
                    $img.eq(arr[0]).animate({left:100,opacity:0},1000);
                    $img.eq(arr[1]).animate({left:200,opacity:0},1000,function(){
                        $img.eq(arr[2]).css({left:100});
                        $img.eq(arr[3]).css({left:200});
                        $img.eq(arr[2]).animate({left:a,opacity:1},1000);
                        $img.eq(arr[3]).animate({left:b,opacity:1},1000);
                    });
					onoff = !onoff;
				});


			})();


			//下面的二维码扫描
			;(function(){
				var $scan = $('.banner .download .left .erweicode .ps-a'),
				    onoff = true;//表示向下走

				//设置定时器
				;(function fn(){
					var $top = $scan.position().top;
					if($top == 4){
						onoff = true;
					}else if($top == 91){
						onoff = false;
					}

					if(onoff){
						$top++;
					}else{
						$top--;
					}
					$scan.css({top:$top});
					requestAnimationFrame(fn);
				})();
			})();

			//中部轮播的第一个
			;(function(){
				var $ul = $('.banner-style .left .banner-img ul'),
					$li = $('.banner-style .left .banner-img ul li'),
					$btn = $('.banner-style .left .banner-controller p'),
					$banner = $('.banner-style .left .banner-img'),
					timer = null,
					num = 0,
					length = $li.length,
					width = $li.innerWidth()
				;


				//轮播函数
				function fn(){
					if(num === length - 1){
						$ul.css({left:0});
						num = 0;
					}
					$btn.eq(num).removeClass('on');
					num++;
					$btn.eq(num%(length -1)).addClass('on');
					$ul.animate({left:-num*width},300);
				}


				//自动无缝轮播+鼠标进入hover
				;(function(){
					timer = setInterval(fn,2000);
					$banner.hover(function(){
						clearInterval(timer);
					},function(){
						timer = setInterval(fn,2000);
					});
				})();


				//click每一个btn变化
				;(function(){
					$btn.click(function(){
						$btn.eq(num).removeClass('on');
						$(this).addClass('on');
						$index = $(this).index();
						$ul.animate({left:-$index*width},300*Math.abs($index - num));
						num = $index;
					})
				})();
			})();

			//轮播公告
			;(function(){
				var $btn = $('.banner-style .left .banner-info .title a'),
					$i = $('.banner-style .left .banner-info .title a .bg'),
					$cont = $('.banner-style .left .banner-info .banner-content'),
					width =$cont.children().eq(0).innerWidth(),
					num = 0
				;
				var num_before;

				//初始动画
				$i.eq(num).addClass('on');

				//hover的时候给当前的i添加背景
				$btn.on('mouseenter',function(){
					$i.eq(num).removeClass('on');
					num_before = num;
					num = $(this).index();
					$cont.stop().animate({left:-num*width},Math.abs($(this).index() - num_before)*300);
					$i.eq(num).addClass('on');
				});
			})();



			//轮播下方的点击和hover事件
			(function(){
				var $p = $('.banner-style .left .bottom-info .right p'),
					$i = $('.banner-style .left .bottom-info .right p i'),
					onoff = [true,false],//每一个按键都有一个onoff，如果onoff为true，则表示选中
					index,
					$content = $('.banner-character .container .all-character .content'),
					arr=[0],//用来存储下标，和下一次比较，看是否有改变，因为第一个存在，所以相当于点击了第一个一次，故先存0
					dom
				;

				//首先将第一个i的内容显示出来
				$i.eq(0).animate({top:0,opacity:1},500);


				//首先hover
				;(function(){

					//p的点击事件
					$p.click(function(){
						index = $(this).index();
						dom = arr.pop();
						if(index){//点击第二个p
							$content.eq(0).removeClass("on");
							$content.eq(1).addClass("on");
							$i.eq(0).animate({top:50,opacity:0},500);
							$i.eq(1).animate({top:0,opacity:1},500);
							//用来判断是否是上一次
							if(index !== dom){
								onoff[1] = !onoff[1];
							};
						}else{//点击第一个p
							$content.eq(1).removeClass("on");
							$content.eq(0).addClass("on");
							$i.eq(1).animate({top:50,opacity:0},500);
							$i.eq(0).animate({top:0,opacity:1},500);
							if(index !== dom){
								onoff[0] = !onoff[0];
							};
						}
						arr.push(index);

					});

					//p的hover事件
					$p.hover(function(){
						index = $(this).index();
						//表示hover的是另一个
						if(index !== arr[0]){
							if(index){
								$i.eq(1).animate({top:0,opacity:1},500);
							}else{
								$i.eq(0).animate({top:0,opacity:1},500);
							}
						};
					},function(){
						index = $(this).index();
						if(index !== arr[0]){
							if(index){
								$i.eq(1).animate({top:50,opacity:0},500);
							}else{
								$i.eq(0).animate({top:50,opacity:0},500);
							}
						};
					})
				})();

			})();


			//右侧第一个在一段时间后变化背景
			(function(){
				var $li = $('.banner-style > .right ul li.li1');

				//hover
				$li.hover(function(){
					$(this).addClass('hover');
				},function(){
					timer = setTimeout(function(){
						$li.removeClass('hover');
					},300);
				});
			})();



			//在下面的失神处点击变化
			(function(){
				var $li_btn = $('.banner-character .container .all-character .first > ul li.on'),
					$a = $li_btn.children(),
					$list_group = $('.all-character .first .bottom-banner .all-kind .list-group'),
					num = 0 //用来控制第几个list-group显示和隐藏的
				;
				for (var i=0 ; i<$list_group.length ;i++ )
				{
					$list_group[i].num = 0;
				}
				//点击每一个下面的左右切换
				function banner(){
					var $details = $list_group.eq(num);
						$btn = $details.children('p'),
						$child = $details.children().eq(2),
						width = $details.innerWidth(),
                        childLength = parseFloat( $child.css('width') ) / 840;
					$btn.off("click");
					change($btn,$list_group[num].num,childLength);
					$btn.on("click",function(){
						var index = $(this).index();
						if(childLength === 1){
							$btn.eq(0).css('display','none');
							$btn.eq(1).css('display','none');
							return;
						}
						if( index ){
							$list_group[num].num ++;
							$list_group[num].num = Math.max(0,$list_group[num].num);
						}else{
							$list_group[num].num --;
							$list_group[num].num = Math.min($list_group[num].num , childLength - 1);
						}
						$child.animate({left: - $list_group[num].num * width},500);
						change($btn,$list_group[num].num,childLength);
					});

				}

				function change(obj,value,length){
					var arr = [];
					if( value === 0 ){
						arr = ['none','block'];
					}else if( value === length - 1){
						arr = ['block',"none"];
					}else{
						arr = ["block","block"];
					}
						obj.eq(0).css('display',arr[0]);
						obj.eq(1).css('display',arr[1]);
				}
				//点击li控制list-group的display
				banner();
				$li_btn.click(function(){
					var $btn = $list_group.eq(num).children('p');
					$list_group.eq(num).removeClass('on');
					$a.eq(num).removeClass('on');
					num = $(this).index();
					$list_group.eq(num).addClass('on');
					$a.eq(num).addClass('on');
					banner();
				});

			})();



			//点击人物显示不同的人
			(function(){
				var $person = $('.banner-character .container .all-character .second .containers .detail-persons .persons'),
					$li = $(".banner-character  .second  .description-persons ul li"),
					num = 0
				;

				//点击每一个person其他的切换
				$person.click(function(){
					var index = $(this).index();
					if( index === num )return;
					$person.eq( num ).removeClass("on");
					$li.eq(num).fadeOut();
					num = index;
					$person.eq( num ).addClass("on");
					$li.eq(num).fadeIn();
				});
			})();



			//切换banner 的左边banner处
			(function(){
				var $banner = $(".stratage .container .banner-content .banners"),
					$img = $(".img",$banner),
					$btn = $(".btn p",$banner),
					num = 0,
					timer
				;
				setTimeout(autoplay,3000);
				function autoplay(){
					$btn.eq(num).removeClass("on");
					num = num === 0?1:0;
					$btn.eq(num).addClass("on");
					$img.animate({"left": - num * 372},300);
					timer = setTimeout(autoplay,3000);
				}
				//自动轮播

				//hover 轮播
				$btn.mouseenter(function(){
					var index = $(this).index();
					if( index === num)return;
					$btn.eq(num).removeClass("on");
					num = index;
					$btn.eq(num).addClass("on");
					$img.stop().animate({"left": - num * 372},300);
				});


				$banner.hover(function() {
					clearTimeout( timer );
				},function(){
					setTimeout(autoplay,3000);
				});

			})();


			//右边控制内容显示
			(function(){
				var $title = $(".stratage .container .right .title")
					$btn = $title.children("p").add(".stratage .container .right .stratege"),
					$bg = $(".stratage .container .right .stratege-items .bg"),
					$content = $(".stratage .container .right .content-bottom"),
					num = 0
				;
				//hover当前的btn显示样式
				$btn.on("mouseenter",function(){
					var index = $(this).index();
					index = index / 2;
					if( num === index )return;
					if(index){
						$bg.eq(num - 1).stop().animate({top:20,opacity:0},300);
						$bg.eq(index - 1).stop().animate({top:0,opacity:1},300);
					}else{
						$bg.stop().animate({top:20,opacity:0},300);
					}
					num = index;
					$content.stop().animate({left:-index*782},300);
				});
			})();

			//将数据写入到页面中
			(function(){
				var data = strateData;
				var $content = $(".stratage .container .right .content-bottom .detail-content"),
					$a = $content.eq(0).children()
				;

				var arr = ["御魂","新手","式神","斗技","玩法","高阶"];
				var arrs = [arr[0],arr[1],arr[1],arr[0],arr[0],arr[1],arr[3],arr[0],arr[3],arr[2]];
				//渲染开始
					//针对第一组
				for(var i=0;i<10;i++){
					$a.eq(i).html(`<p class="abstract-content">【<span>${arrs[i]}</span>】
						${data[i].title}</p>
									<p class="author">作者：<span>${data[i].author}</span></p>`);
				}

				//后面四组：
				for (var i=1;i<5 ;i++ )
				{
					for(var j = 0;j < 10 ; j++ )
					{
						$content.eq(i).children().eq(j).html(`<p class="abstract-content">【<span>${arr[i]}</span>】
						${data[j+i*2+5].title}</p>
									<p class="author">作者：<span>${data[j+5].author}</span></p>`);
					}
				}
			})();

			//将下面的图标hover移动上来，然后hover内容滚动
			(function(){
				var $a = $(".special-area .controller .banner-controller a"),
					$i = $(".special-area .controller .banner-controller a i"),
					$li = $(".special-area .banners ul li"),
					$ul = $(".special-area .banners"),
					num = 0
				;

				//数据渲染
				(function(){
					var data = fanData;
					var liLength = $li.length;
					for(var i=0;i<$a.length;i++){
						for(var j=0;j<liLength;j++){
							//不知道为啥报错，但是资源都加载出来了，用try catch处理
							try{
								$li.eq(i*liLength + j).html(`<div class="img ps-r">
								<img src=${ data[i*liLength + j].url } alt="" width="650" height="366">
								<p class="cover ps-a">
									<i class="ps-a"></i>
								</p>
							</div>
							<p class="content" style="font-size:16px;line-height:30px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${data[i*liLength + j].title}</p>`);
							}catch(e){

							}

						}
					}
				})();
				//hover内容变化
				$a.mouseenter(function(){
					var index = $(this).index();
					if( index === num )return;
					$a.eq(num).removeClass("on");
					num = index;
					$a.eq(num).addClass("on");
					$ul.stop().animate({left: - index * 1200},300);
				});
			})();

			//返回顶部
			(function(){
				var $top = $(".erweicode .icon-top");

				$top.click(function(){
					$(document).scrollTop(0);
				});
			})();
		})();
