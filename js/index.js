

	$(function(){

			//Í·²¿ÂÖ²¥
			(function(){
				var $banner = $('.header .toolbar .news-banner .banner-toobar');
				var $li = $banner.children();
				var num = 0;
				setInterval(function(){
					num++
					$banner.animate({top:-num*$li.height()},500,function(){
						if(num == $li.length - 1){
							$banner.css({top:0});
							num =0;
						}
					})
				},2000);
			})();


			//hover的时候出现背景
			(function(){
				var $bg = $('.nav-lead .nav-bgc').eq(0);
				var $li = $('.nav-cont .left-nav .list-product > li ');//这个下面还有li，所以必须写>
				var arr = [0,4,5];//记录hover发生背景变化的每一个li的下标
				//hover的时候发生变化
				$(arr).each(function(index,value){
					$li.eq(value).hover(function(){
						$bg.addClass('transform');
					},function(){
						$bg.removeClass('transform');
					});
				})
				
				//在向下滚的时候监听
				window.addEventListener('scroll',function(e){
					if($(document).scrollTop() >=50){
						$bg.css({
							transform:'rotateX(0deg)',
							opacity:1
						})
					}else{
						$bg[0].style.cssText = '';
					}
				},false);
			})();



			//videoÂÖ²¥
			(function(){
				var $video = $('.head-banner .video-banner video');
				var length = $video.length;//2
				var num = 0;
				var progress;
				var $oldVideo = $video.eq(num%length);
				var $currentVideo;
				var $btn = $('.banner-controler ul li');
				var $i = $('.banner-controler ul li a i');
				$oldVideo.css({'z-index':2});
				var arr = ['vote_bg_video.mp4','magic_bg_video.mp4','shelves_video.mp4','trading_video.mp4'];



				request();
				function request(){
					progress = $oldVideo[0].currentTime/$oldVideo[0].duration;//»ñÈ¡µ½²¥·Å½ø¶È
					$currentVideo = $video.eq((num+1)%length);
					$i.eq(num).css({width:progress*75});
					if(progress >0.95 ){//²¥·Å½ø¶È´ïµ½0.95Ê±£¬¾Í·ÅÏÂÒ»¸öÊÓÆµ
						//ÏÈ½«ÐÂÊÓÆµ¼ÓÔØ³öÀ´
						$currentVideo[0].src = 'video/'+arr[(num+1)%arr.length];
						$currentVideo[0].play();
						$currentVideo.css({'z-index':2});
						//È¥µôÀÏµÄÊÓÆµµÄsrc
						$oldVideo.animate({opacity:0},2000);
						$oldVideo[0].pause();
						$oldVideo[0].src = '';
						$oldVideo.css({'z-index':1});
						$i.eq(num).css({width:0});
						num++;
						num = num%arr.length;//µÚÒ»ÂÖÅÜÍêÃ»ÅÜµÚ¶þÂÖÊÇÒòÎªÃ»ÓÐ¼ÓÕâ¸ö¡£
						//¸üÐÂ
						$oldVideo = $currentVideo;
						//$i.eq(num).css({width:progress*75});
						$oldVideo.animate({opacity:1},1000);
					}
					requestAnimationFrame( request );
				};

				$btn.click(function(){
					$oldVideo[0].src='';
					$oldVideo.css({'z-index':1});
					$oldVideo.animate({opacity:0},2000);
					$i.eq(num).css({width:0});
					num = $(this).index();//¸üÐÂ
					$oldVideo = $video.eq(num%length);
					$oldVideo.css({'z-index':2});
					$oldVideo.animate({opacity:1},1000);
					$oldVideo[0].src= 'video/'+arr[num%arr.length];
					$i.eq(num).css({width:progress*75});
					request();
				});
			})();


			//part-inner banner
			(function(){
				var $banner = $('.part-inner .video-make .top-banner ul');
				var $li = $banner.children();
				var num = 0;
				setInterval(function(){
					num++
					$banner.animate({top:-num*$li.height()},500,function(){
						if(num == $li.length - 1){
							$banner.css({top:0});
							num =0;
						}
					})
				},2000);
			})();



			//µã»÷°´Å¥³öÏÖÐÂ»­Ãæ
			(function(){
				var $btn = $('.click-btn');
				var $area = $('.head-banner .video-part');
				var $video = $('.video video');
				var $close = $('.video .close');
				var num = 0;//ÓÃÀ´¼ÇÂ¼µ½µ×ÔÚ·ÅµÚ¼¸¸öÊÓÆµ
				var arr = ['video/zongyi.mp4','video/yingyong_sp2_720p.mp4','video/yingyongmeiz1110_720p.mp4'];
				var $controller = $('.popup-videobanner ul li');
				var $popup =  $('.head-banner .popup');
				$btn.on('click',function(){
					$(this).animate({width:0,opacity:0},500,function(){
						$popup.css({opacity:1});
						$popup.animate({left:'50%',top:'50%'},500);
						$popup.animate({
							width:3800,
							height:3800,
							marginLeft: -1900,
							marginTop:-1900},500,function(){
								$video[0].src = 'video/zongyi.mp4';
								$area.css({display:'block'})
						});
						$('body').css({overflow:'hidden'});
					});
				});


				$controller.click(function(){
					if(num!==$(this).index()){
						$video[0].pause();
						num = $(this).index();
						$video[0].src = arr[num%arr.length];
					}else{
						return false;
					}
				})


				//µã»÷¸´Ô­
				$close.click(function(){
					$('body').css({overflow:'auto'});
					$video[0].pause();
					$video[0].src = '';
					$area.css({display:'none'});
					$popup.animate({
						width:50,
						height:50,
						marginLeft: 0,
						marginTop:0
					},500)
					$popup.animate({
							left:'34%',
							top:'53%'
					},500);
					$popup.animate({opacity:0},500,function(){
						$btn.animate({width:143,opacity:1},500);
					});
				});
			})();



			//Êó±ê»®Èëcont-clickÏÂÃæaµÄafterÔªËØ¿í¶È±ä»¯
			(function(){
				var $btn = $('.canvas .value-video .right-cont .cont-click a');
				var $i = $('.canvas .value-video .right-cont .cont-click a i');
				var $img = $('.canvas .value-video .img-feature img');
				var num = 0;
				var index;
				$img.eq(num).css({opacity:1});
				$btn.click(function(){
					index = $(this).index();
					if(num === index){
						$img.eq(index).css({opacity:1});
					}else{
						$img.eq(num).animate({opacity:0},500);
						num = index;
						$img.eq(num).animate({opacity:1},500);
					}
				});

			})();



			//ÏÂÃæµÄµã»÷³öÏÖÄÚÈÝ£¬µã»÷ÁíÍâÒ»¸öÄÚÈÝÏûÊ§¡£
			(function(){
				function show(str){
					var $li = $('.'+str+' .cont-click ul li');
					var $a = $('.'+str+' .cont-click ul li a');
					var $i = $('.'+str+' .cont-click ul li i');
					var index;
					var num = 0;
					$li.eq(num).css({height:105});
					$i.eq(num).css({width:255,backgroundColor:'#29dbb3'});
					$a.eq(num).css({fontSize:18});
					$li.click(function(){
						index = $(this).index();
						if( num == index){
							$a.eq(num).css({fontSize:18});
							$li.eq(index).css({height:105});
						}else{
							$a.eq(num).css({fontSize:14});
							$i.eq(num).css({width:0,backgroundColor:'#29dbb3'});
							$li.eq(num).css({height:25});
							$a.eq(index).css({fontSize:18});
							$li.eq(index).animate({height:105},500,function(){
								$i.eq(num).css({width:255,backgroundColor:'#29dbb3'});
							});
							num = index;
						}
					});
				}


				//Ö±½Óµ÷ÓÃº¯Êý
				show('stratege');
				show('system');
				show('media');
			})();




			//¼ÆÊýÆ÷Ê¹ÓÃ
			(function(){
				//¼ÆÊýÆ÷º¯Êý
				function count(obj,target,speed){
					var num = 0;
					var timer;

					//×ÔÔö
					(function(){
						num +=speed;
						if( num >=target){
							num = target;
							cancelAnimationFrame(timer);
						}
						var num1 = Math.floor(num/1000/1000);//Á½¸ö¶ººÅÖ®Ç°µÄÊý×Ö
						var num2 = Math.floor((num - Number( num1 + '000000'))/1000);//Ò»¸ö¶ººÅÖ®Ç°µÄÄÚÈÝ
						var num3 = num - Number( num1 + '000000') - Number( num2 + '000');//×îºóÒ»¸ö¶ººÅÖ®Ç°µÄÄÚÈÝ
						if(num1 == 0 && num2 == 0){
							obj.innerHTML = num;
						}else if(num1 == 0){
							obj.innerHTML = num2 + ',' +num3;
						}else{
							obj.innerHTML = num1 + ',' + num2 + ',' + num3;
						}
						timer = requestAnimationFrame(arguments.callee);
					})();
				}


				//Ö±½Óµ÷ÓÃº¯Êý
				var $b = $('.open-video .center-content .top-title .rol a .num b');
				var $lb = $('.open-video .center-content .down-banner h3 b');
				count($b.eq(0)[0],106502970,100);
				count($b.eq(1)[0],340,10);
				count($b.eq(2)[0],3.6,1);
				count($lb.eq(0)[0],16562,60);
			})();

			//Í¼Æ¬×Ô¶¯×óÓÒÔË¶¯
			(function(){
				var $img = $('.open-video .center-content .down-banner .banner img');
				var onoff = true;//¶¨Òå×óÓÒÅÜµÄ·½Ïò trueÎª×óÅÜ  false ÎªÓÒÅÜ
				(function run(){
					if(onoff){
						$img.animate({left:'-2%'},8000,'linear');
					}else{
						$img.animate({left:'-48%'},8000,'linear');
					}
					onoff = !onoff;
					requestAnimationFrame(run);
				})();
			})();



            //波浪
            (function(){
                var canvas = document.getElementById('wave');
                var ctx =  canvas.getContext('2d');
                var  w =  canvas.width =  canvas.parentNode.offsetWidth;
                var  h =  canvas.height =  canvas.parentNode.offsetHeight;

                var waveDefault = h/2;//默认高度
                var waveBo = waveDefault/4;//波浪最大高度
                var colors = ["rgba(0,222,255, 0.2)",
                               "rgba(157,192,249, 0.2)",
                               "rgba(0,168,255, 0.2)"];
                var num=0;
                (function requestA(){
                    ctx.clearRect(0,0,w,h);//擦除画布
                    num++;
                    for(var i=0;i<colors.length;i++){
                        var angle = (num+i*50)*Math.PI/180;
                        var sinHeight = Math.sin( angle )*waveBo;//左边
                        var cosHeight = Math.cos( angle )*waveBo;//右边
                        ctx.strokeStyle=colors[i];   //绘制边框
                        ctx.beginPath();//开始路径
                        ctx.moveTo(0,waveDefault+sinHeight);//(x,y)移动画笔
                        ctx.bezierCurveTo(w/2,waveDefault-waveBo+sinHeight,w/2,waveDefault-waveBo+cosHeight,w,waveDefault+cosHeight);
                        //ctx.lineTo(w,h);     //右下角
                        //ctx.lineTo(0,h);    //左下角
                        ctx.lineTo(0,waveDefault+sinHeight);//移动画笔
                        ctx.stroke();          //画 填充
                    }
                    requestAnimationFrame(requestA);
                })();
            })();
			

			//绘制半圆
			(function(){
				var canvas = document.getElementById('canvas');
				var ctx = canvas.getContext('2d');
				var w = canvas.width = canvas.offsetParent.offsetWidth;
				var h = canvas.height = canvas.offsetParent.offsetHeight;
				var r = 200;//最小圆的半径
				var R = Math.sqrt( Math.pow(w/2,2)+Math.pow(h,2));//最大圆半径
				var offset = 125;//圆与圆之间的距离
				var num = Math.floor( (R - r)/offset );//能够绘制的个数
				var arr = [];//用来存每一个圆的半径
				for(var i=0;i<=num;i++){
					var obj = {};
					obj.r = offset*i+r;
					arr.push(obj);
				}
				//console.log(arr);
				(function(){
					ctx.clearRect(0,0,w,h);
					for(var i=0;i<arr.length;i++){
						if(arr[i].r >=R){
							arr[i].r = r;
						}else{
							arr[i].r++;
						}
						arr[i].opacity = (R - arr[i].r)/R;//设置透明度，越是外面越透明
						draw(arr[i]);
					}
					requestAnimationFrame(arguments.callee);
				})();

				function draw(obj){
					ctx.beginPath();//开始绘画
					ctx.strokeStyle = 'rgba(0,0,0,'+obj.opacity+')';//设置颜色
					ctx.arc(w/2,h,obj.r,0,360*Math.PI/180,true);//第一二个参数，表示圆心坐标，第三个是半径，第四五个表示绘制的是半圆，圆还是圆弧，0为开始度数，360为结束度数，最后一个参数，bool值，false 表示顺时针绘制，true表示逆时针绘制
					ctx.stroke();
				}
			})();

			//ÄÚÈÝÂÖ²¥¼ÓÍ¼Æ¬±ä»¯¼Óµã»÷
			(function(){
				var $ul = $('.company .container .conten-top .top-left .content-banner');
				var $li = $('li',$ul);
				var $img = $('.company .container .conten-top  .top-right .inner-img img');
				var $a = $('.company .container .banner-bottom .banner-control a');
				var $i = $('.company .container .banner-bottom .banner-control a i');
                var h = $li.eq(0).innerHeight();
				var num = 0;//¼ÇÂ¼¹öµ½µÚ¼¸¸öleftÁË¡£
				var timer;

                for(var i=0;i<$li.length;i++){
                    $li.css({top: -h,opacity:0});
                }
                $li.eq(num).css({top: 0,opacity:1});
                $img.eq(num).css({opacity:1});
                $i.eq(num).css({backgroundColor:'#50E3C2'});

                request();
                //动画轮播
                function request(){
                    //让之前的消失
                    $i.eq(num).css({backgroundColor:'#e5e5eb'});
                    $img.eq(num).animate({opacity:0},500);
                    $li.eq(num).animate({top:h,opacity:0},500,function(){
                        $(this).css({top: -h,opacity:0});//做完之后马上让这个li回到原位
                    });
                    num++;
                    num %=$img.length;
                     $i.eq(num).css({backgroundColor:'#50E3C2'});
                    $li.eq(num).animate({top:0,opacity:1},500,function(){
                    });
                    $img.eq(num).animate({opacity:1},500);
                    timer = setTimeout(request,3000);
                };

                //点击事件
                $a.click(function(){
                    //index = $(this).index();
                    clearTimeout(timer);
                    $i.eq(num).css({backgroundColor:'#e5e5eb'});
                    $img.eq(num).animate({opacity:0},500);
                    $li.eq(num).stop(true,true);
                    $li.eq(num).animate({top:-h,opacity:0});
                    num = $(this).index();
                    $i.eq(num).css({backgroundColor:'#50E3C2'});
                    $li.eq(num).animate({top:0,opacity:1},500);
                    $img.eq(num).animate({opacity:1},500,function(){
                         request();
                    });
                });
			})();


			//ÓÒÏÂ½ÇµÄÓöµ½ÎÊÌâ
			(function(){
				var $onoff =  $('.sidebar .face-after .input-area .onoff');
				var $i = $('.sidebar .face-after .input-area .onoff i');
				var $click_i = $('.sidebar .face-after .input-area .choose a .emojj');
				var textarea = $('.sidebar .face-after .input-area textarea');
				var $btn = $('.sidebar .face-after .input-area .choose p');
				var $comu = $('.sidebar .face-after .comunicate');
				var $face = $('.sidebar .face');
				var $after = $('.sidebar .face-after');
				var $close = $('.sidebar .face-after .robort  .person a  .close');
				var onoff = false;//ÏûÊ§

				//¸ø24¸ö±íÇé°üÌí¼Óbackground-position
				for(var i=0;i<$i.length;i++){
					$i.eq(i).css({'background-position':'0 '+(-i*25)+'px'});
				}

				//Ìí¼Óµã»÷ÊÂ¼þÀ´¿ØÖÆ³öÏÖºÍÏûÊ§
				$click_i.click(function(){
					if(onoff){
						$onoff.css({display:'none'});
					}else{
						$onoff.css({display:'block'});
					}
					onoff = !onoff;
				});

				//ÊäÈëÎÄ×ÖÖ®ºó°´Å¥¾Í¿ÉÒÔ·¢ËÍ£¬Ã»ÓÐÎÄ×Ö¾ÍÎÞ·¨·¢ËÍ
				(function request(){
					if(textarea[0].value){
						$btn.css({'background-color':'#3f2aa0'});
					}else{
						$btn.css({'background-color':'#f7f7f7'})
					}
					requestAnimationFrame(request);
				})();


				//µã»÷°´Å¥¾Í·¢ËÍ£¬È»ºóÇå¿Õ
				$btn.click(function(){
					var d = new Date();
					var hour = d.getHours();
					var min = d.getMinutes();
					var noon;
					if(hour>=12){
						noon = 'PM';
					}else{
						noon = 'AM';
					}
					var div = document.createElement('div');
					div.innerHTML = '<p><b>'+addZero(hour)+':'+addZero(min)+noon+'</b></p><div class="info"><div class="info1"><p>'+textarea[0].value+'</p></div></div>';
					div.className = 'information';
					$comu.append(div);
					textarea[0].value = '';

					function addZero(num){
						return num >=10?num:'0'+num;
					}
				});

				//µã»÷Ò»´Î³öÏÖ£¬µã»÷Ò»´ÎÏûÊ§
				$face.click(function(){
					$after.css({display:'block'});
					$face.css({display:'none'});
				});

				$close.click(function(){
					$after.css({display:'none'});
					$face.css({display:'block'});
				})
			})();


			//响应式按钮点击：
			(function(){
				var $btn =  $('.nav-lead .nav-cont .btn-list');
				var $span = $('span',$btn);
				var $ul = $('.nav-lead .nav-cont .left-nav ul').eq(0);
				var onoff = true;//关闭状态

				//点击btn
				$btn.click(function(){
					if(onoff){
						$span.eq(0).addClass('top-line-rotate');
						$span.eq(1).addClass('bottom-line-rotate');
						$ul.animate({height:663},500,function(){
							onoff= !onoff;
						});
					}else{
						$span.eq(0).removeClass('top-line-rotate');
						$span.eq(1).removeClass('bottom-line-rotate');
						$ul.animate({height:0},500,function(){
							onoff= !onoff;
						});
					}
				})
			})();
			
			//问题：怎么在响应式某一个宽度的情况下来做判断
			//缩小之后滚动en出现，最上面不出现
			(function(){
				window.addEventListener('scroll',function(){
					var $en = $('.right-login .en');
					if($(document).scrollTop() >=50){
						$en.css({display:'block'});
					}else{
						$en.css({display:'none'});
					}
				},false);
			})();




	})



















