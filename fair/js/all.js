/*
 * Lets you say "at least X inputs that match selector Y must be filled."
 *
 * The end result is that neither of these inputs:
 *
 *	<input class="productinfo" name="partnumber">
 *	<input class="productinfo" name="description">
 *
 *	...will validate unless at least one of them is filled.
 *
 * partnumber:	{require_from_group: [1,".productinfo"]},
 * description: {require_from_group: [1,".productinfo"]}
 *
 * options[0]: number of fields that must be filled in the group
 * options[1]: CSS selector that defines the group of conditionally required fields
 */
$.validator.addMethod( "require_from_group", function( value, element, options ) {
	var $fields = $( options[ 1 ], element.form ),
		$fieldsFirst = $fields.eq( 0 ),
		validator = $fieldsFirst.data( "valid_req_grp" ) ? $fieldsFirst.data( "valid_req_grp" ) : $.extend( {}, this ),
		isValid = $fields.filter( function() {
			return validator.elementValue( this );
		} ).length >= options[ 0 ];

	// Store the cloned validator for future validation
	$fieldsFirst.data( "valid_req_grp", validator );

	// If element isn't being validated, run each require_from_group field's validation rules
	if ( !$( element ).data( "being_validated" ) ) {
		$fields.data( "being_validated", true );
		$fields.each( function() {
			validator.element( this );
		} );
		$fields.data( "being_validated", false );
	}
	return isValid;
}, $.validator.format( "Please fill at least {0} of these fields." ) );

(function() {
	var $ = jQuery,
		pauseId = 'jQuery.pause',
		uuid = 1,
		oldAnimate = $.fn.animate,
		anims = {};

	function now() { return new Date().getTime(); }

	$.fn.animate = function(prop, speed, easing, callback) {
		var optall = $.speed(speed, easing, callback);
		optall.complete = optall.old; // unwrap callback
		return this.each(function() {
			// check pauseId
			if (! this[pauseId])
				this[pauseId] = uuid++;
			// start animation
			var opt = $.extend({}, optall);
			oldAnimate.apply($(this), [prop, $.extend({}, opt)]);
			// store data
			anims[this[pauseId]] = {
				run: true,
				prop: prop,
				opt: opt,
				start: now(),
				done: 0
			};
		});
	};

	$.fn.pause = function() {
		return this.each(function() {
			// check pauseId
			if (! this[pauseId])
				this[pauseId] = uuid++;
			// fetch data
			var data = anims[this[pauseId]];
			if (data && data.run) {
				data.done += now() - data.start;
				if (data.done > data.opt.duration) {
					// remove stale entry
					delete anims[this[pauseId]];
				} else {
					// pause animation
					$(this).stop();
					data.run = false;
				}
			}
		});
	};

	$.fn.resume = function() {
		return this.each(function() {
			// check pauseId
			if (! this[pauseId])
				this[pauseId] = uuid++;
			// fetch data
			var data = anims[this[pauseId]];
			if (data && ! data.run) {
				// resume animation
				data.opt.duration -= data.done;
				data.done = 0;
				data.run = true;
				data.start = now();
				oldAnimate.apply($(this), [data.prop, $.extend({}, data.opt)]);
			}
		});
	};
})();

(function($){
	$(function () {
	    var $body = $('body');
	    var m = '', support_vp_unit = false, ipad_pro = false,
	    freezeVp = function(e){
	    	e.preventDefault();
	    },
	    init = function(){

			// Phase2 - Add header slide menu
			/*var $mainSidebar = $( "#sidebar-main" );

			$mainSidebar.simplerSidebar( {
				attr: "sidebar-main",
				selectors: {
					trigger: "#sidebar-main-trigger",
					quitter: "a"
				},
				sidebar: {
					width: 200
				},
				animation: {
					easing: "easeOutQuint"
				}
			});*/ // End

			function closeMenu (){
				$('#header').removeClass('opened');
				$('#main_nav').fadeOut().removeClass('expanded');
				$('#menu_bg').fadeOut();
				$('#header .btn_menu').removeClass('active');
				$('body').removeClass('noscroll');
				$('.head_bar, .bottom_btns').off('scroll.lockScroll touchmove.lockMove mousewheel.lockMouse');
		    }

		    $(window).on("orientationchange", function() {
		    	closeMenu();
		    });

			$('#top-sidebar-menu').click(function () {
				$('#hidden-menu').slideToggle();
				$(this).find('.icon-menu-desktop').toggle();
				$(this).find('.icon-menu-white-close').toggle();
			});
			$('.icon-menu-white-close').hide();
			/*$('#hidden-menu-close').click(function() {
				$('#hidden-menu').slideToggle();
			});*/

			// Phase2 - Hover image effect
			$( ".landing .square_box" ).hover(
				function() {
					$(this).addClass('hover');
				}, function() {
					$(this).removeClass('hover');
				}
			);
			$( ".landing .content_box" ).hover(
				function() {
					$(this).addClass('hover');
				}, function() {
					$(this).removeClass('hover');
				}
			);

			$(window).click(function() {
				$('.top_menu').removeClass("open").addClass("closed");
			});

			// Phase2 - Top menu open effect
			$('.top_menu').click(function(event) {
				event.stopPropagation();
				if ($(event.target).hasClass('language-hints') || $(event.target).parents().hasClass('language-hints')) {
				} else {
					$('.language-hints').hide();
					if( $(this).hasClass("open") ) {
						$(this).removeClass("open").addClass("closed");
					} else {
						// if other menus are open remove open class and add closed
						$(this).siblings().removeClass("open").addClass("closed"); 
						$(this).removeClass("closed").addClass("open");
					}
				}
			}); // End

			var resizeTimer;
			$(window).resize(function(){

				var w = window.innerWidth || $(window).width();
		 		if(w >=1024){
		 			if(m != 'd' || m == ''){
						$(window).trigger('_change.tod');
		 			}
		 			m = 'd';
		 			if (w==1024) {
		 				ipad_pro = true;
		 			}
				}
				else if(w >=768){
					if(m != 't' || m == ''){
						$(window).trigger('_change.tot');
					}
					m = 't';
				}
				else if(w <768){
					if(m != 'm' || m == ''){
						$(window).trigger('_change.tom');
					}
					m = 'm';
				}

				// Phase2 - Fair Highlights
				if (w<1025) { 
					$('#landing_slider .slides').slick('slickUnfilter');
				} else {
					$('#landing_slider .slides').slick('slickUnfilter');
					$('#landing_slider .slides').slick('slickFilter','.top_banner');
				}

				if (w<1024) {
					fair_margin = 5;
				} else if (w<1500) { 
					fair_margin = 8;
				} else {
					fair_margin = 10;
				}
				clearTimeout(resizeTimer);
				resizeTimer = setTimeout(function() {
					/*fair_margin = ($('#landing_slider').height()-($('#fair_slider .content_box').height()*2)) / 2;
					$('#fair_highlights .content_box').css('margin', fair_margin+'px 0');
					$('#fair_highlights .slick-list').css('margin', '-'+fair_margin+'px 0');*/

					fair_height = ($('#fair_slider .content_box').height()*2) + (fair_margin*4);
					$('#fair_slider .slick-list').height(fair_height);
				}, 250); 
				$('#hidden-menu').slideUp();
				$('#top-sidebar-menu .icon-menu-desktop').show();
				$('#top-sidebar-menu .icon-menu-white-close').hide();
				// End

				if(!support_vp_unit){
					var wh = $(window).height();
					if(m == 'm'){
						$('#main_nav').css('maxHeight', wh-107);
		
					}
				}
		 	});

		    $body.delegate('.scroll-link', 'click', function(e){
		      e.preventDefault();
		      if ((/^#/.test($(this).attr('href')) === true)) {
		        var $el = $($(this).attr('href'));
		        var pos = $el.offset().top;
		        $("html, body").stop().animate({scrollTop:pos}, '500', 'swing', function() { });
		      }
		    });

		    $('.btn_backtotop').bind('click',function(e){
		      e.preventDefault();
		      ScrollTo(0);
		    });

			$('.btn_expand_toggle').bind('click',function(e){
				var expandable_section = $($(this).attr('href'));
				e.preventDefault();
				$(this).toggleClass('expanded');
				expandable_section.slideToggle();
			});

		    $body.delegate('.fake_link','click',function(e){
		    	e.preventDefault();
		        window.location = $(this).data('href');
		    });

		    $('.btn_dropdown_filter').bind('click',function(e){
		    	e.preventDefault();
		    	$(this).toggleClass('active').parent().find('.filter_list').slideToggle();
		    });

		    /* Samantha: click blank space to collapse dropdown */
		    $(document).on('click touchstart',function(e){
		    		var btnDF = $('.btn_dropdown_filter');
          		if (!btnDF.parent().find('*').is(e.target) && btnDF.hasClass('active')){
		    			btnDF.toggleClass('active').parent().find('.filter_list').slideToggle();
          		}
			}); /* END */

		    $('.filter_list a').bind('click',function(e){
		    	var selected_text = $(this).text();

		    	e.preventDefault();
		    	$('.filter_list a').show();
		    	$(this).hide().parents('.filter_list').slideUp();
		    	$('.btn_dropdown_filter').removeClass('active').find('span').text(selected_text);
		    });
		    $('input[placeholder], textarea[placeholder]').each(function(){
		    	$(this).data('placeholder', $(this).attr('placeholder'));
		    }).on('blur',function(){
				var placeholder = $(this).data('placeholder');
				$(this).attr('placeholder',placeholder);
			}).on('focus',function(){
				$(this).attr('placeholder','');
			});

			$('.page_head .btn_viewmore').bind('click',function(e){
				$(this).toggleClass('expanded').parent().find('.expandable_content').slideToggle();
			});

			$('.page_head .btn_delete_tag').bind('click',function(e){
				e.preventDefault();
				$(this).parent('.tag').hide();
			});

		    $(window).scroll(function(e){
    	        if($(window).scrollTop()==0 || $('header').hasClass('opened')){
			        $('.btn_backtotop').hide();
			    }else{
			        $('.btn_backtotop').show();
			      }
		    });

	        var ScrollTo = function(t, s){
		      var body = $("html, body");
		      body.stop().animate({scrollTop:t}, (s)? '500': s, 'swing', function() { });
		    },

		    // Pages controller
			landingPageController = {
				init: function(){
					var self = landingPageController;
					$('#landing_slider .slides').show().slick({
				    	arrows: true,
				    	dots: true,
				    	fade: true,
				    	infinite: true,
				    	autoplay: true,
				    	adaptiveHeight: true,
				    	autoplaySpeed: slide_autoplay_interval,
				    	pauseOnFocus: true,
				    	pauseOnHover: true,
				    	pauseOnHoverImmediate: false,
				    	responsive: [{
				        	 breakpoint: 1023,
				        	 settings: {
				        	 	arrows: false
				        	 }
				    	}]
				    });

					// fair slider
					$('#fair_slider .slides').slick({
						vertical: true,
						verticalSwiping: true,
				    	arrows: true,
				    	dots: false,
				    	infinite: true,
				    	slidesToShow: 2,
			    	 	slidesToScroll: 2,
				    	autoplay: true,
				    	autoplaySpeed: slide_autoplay_interval,
				    	pauseOnFocus: true,
				    	pauseOnHover: true,
				    	pauseOnHoverImmediate: false,
				        appendArrows: '#fair_highlights .slider-vertical-nav',
				        responsive: [{
				        	breakpoint: 1023,
				        	settings: {
				        		arrows: false
				        	}
				        }]
					});

					// buying slider
					$('#buying_leads .slides').slick({
						arrows: true,
						dots: false,
				    	slidesToShow: 6,
			    	 	slidesToScroll: 6,
				        infinite: false,
				        appendArrows: '#buying_leads .slider-nav',
				        responsive: [{
				        	 breakpoint: 1023,
				        	 settings: {
				        	 	arrows: false,
		        	 	        slidesToShow: 2, //modify form 1 to 3
		        	 	        speed: 300,
						        slidesToScroll: 2, //modify form 1 to 3
						        variableWidth: true,
				        	 }
				        }]
					});

					productSlider.init();
				},
			},
			listPageController = {
				init: function(){
					var self = listPageController;

					myFavouriteHandler();		

					$('.cate_list .cate_boxes').slick({
						arrows: true,
						dots: false,
				    	slidesToShow: 6,
			    	 	slidesToScroll: 6,
				        infinite: false,
				        lazyLoad: 'ondemand',
				        responsive: [{
				        	breakpoint: 1023,
				        	settings: {
				        		unslick: true,
				        	}
				        }]
					});

					$('#item_lists .item_img').hover(function(){
						if(m=='d') $("div.hover_img").lazyload({failure_limit : 10, placeholder:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"});
					});

					$('#item_boxes .item_box').hover(function(){
						$(this).find('.hover_box').slideDown();
			        }, function(){
						$(this).find('.hover_box').hide();
				    });


					$body.delegate('.product_list_top .cate_menu .link_ajax','click',function(e){
						e.preventDefault();
						var url = $(this).attr('href'), target = $(this).closest('ul');
						ajaxHandler(url,target);
					});
				}
			},
			detailPageController = {
				init: function(){
					var self = detailPageController;
					var $photo_slider = $('#exhibitor_description .photo_wrapper .photo_wrapper_slides');

					productSlider.init();
					myFavouriteHandler();

					$('#exhibitor_description .slides').slick({
						arrows: true,
						dots: false,
				    	slidesToShow: 1,
			    	 	slidesToScroll: 1,
				        infinite: false,
					});

					$(window).bind('_change.tod', function(){
						self.resized('d');
					}).bind('_change.tot', function(){
						self.resized('t');
					}).bind('_change.tom', function(){
						self.resized('m');
					});;

					if($body.hasClass('product_detail')){
						self.thumbnailHandler();
					}
					$photo_slider.slick(self.photo_slider_opt);
				},
				slider_opt: {
					m: {
						arrows: false,
						dots: true,
				    	slidesToShow: 1,
			    	 	slidesToScroll: 1,
				        infinite: true,
					}
				},
				photo_slider_opt: {
			        responsive: [{
			        	breakpoint: 9999,
						settings: 'unslick'		        		
			        },
			        {
			        	breakpoint: 1024,
			        	settings: {
					    	arrows: false,
					    	dots: false,
					    	infinite: false,
					    	slidesToShow: 4,
				    	 	slidesToScroll: 4			        		
				    	}
			        },
			        {	
			        	breakpoint: 768,
			        	settings: {
					    	arrows: false,
					    	dots: false,
					    	infinite: false,
					    	slidesToShow: 2.5,
				    	 	slidesToScroll: 2	        		
			        	}
			        }]
				},
				resized: function(_m){
					var $slider = $('#product_description .slides');
						var $photo_slider = $('#exhibitor_description .photo_wrapper .photo_wrapper_slides');

					initalized = ($slider.hasClass('slick-slider'))? true: false;
					if(initalized){
						$slider.slick('unslick');
					}
				// product_description large slider
					if(_m == 'm' || _m == 't'){
						$slider.slick(detailPageController.slider_opt.m);
						$photo_slider.slick('reinit');
						if ($('#product_description .slide_lg .bg_img').length > 0) {
							$slider.slick('slickRemove', 1, true);
						}						
						//$photo_slider.slick('reinit');
					} else if (_m == "d") {
						$slider.slick(detailPageController.photo_slider_opt);
						if ($('#product_description .slide_lg .bg_img').length <= 0) {
							$slider.slick('slickAdd', '<div class="slide slide_lg">'+$slider.find(".slide:nth-child(1)").html()+'</div>', 0, true);
							this.thumbnailHandler();
						}
					}
				},
				thumbnailHandler: function(){
					var default_img_src = $('#product_description .slide_lg .bg_img').data('img-src'),
						default_img = $('#product_description .slide_lg .bg_img');
					var prev_img_src = default_img_src;

					$('#product_description .slide').hover(function(){
						var img_src = $(this).find('.bg_img').data('img-src');
						default_img.css('background-image','url('+img_src+')');

					}, function(){
						default_img.css('background-image','url('+default_img_src+')');					
						default_img.css('background-image','url('+prev_img_src+')');					
					});

					$('#product_description .slide').click(function(){
						var img_src = prev_img_src = $(this).find('.bg_img').data('img-src');
						default_img.css('background-image','url('+img_src+')').addClass("clicked");

					});
				}
			},

			categoriesPageController = {
				init: function(){
					var self = categoriesPageController;

					$('#product_categories_wrapper .btn_expand').bind('click',function(e){
						e.preventDefault();
						var $list = $(this).closest('.list');
						var $subcat = $(this).parent().parent().parent();

						// first level's tree to collapse other same level's expanded category
						if($list.find('.btn_expand.expanded').length > 0 && !$(this).hasClass('expanded')) {
							
							// double check if it's not second level's parent
							if ($subcat.attr('class') != 'list_expandable') {
								self.expand($list.find('.btn_expand.expanded'),'.list_expandable');
							}
							// second level's tree to collapse other same level's expanded category
							else if($subcat.find('.btn_expand.expanded').length > 0) {
								self.expand($subcat.find('.btn_expand.expanded'),'.list_expandable');
							}
							// close itself
							else if($(this).hasClass('expanded')) {	
								self.expand($(this),'.list_expandable');
							}
						}
						
						if($(this).hasClass('expanded')){
							self.expand($(this).parent().parent().find('.btn_expand.expanded'),'.list_expandable');
						}
						else{
							self.expand($(this),'.list_expandable');
						}
						//if($(this).hasClass('expanded'))
					});
					$('#product_categories_wrapper .btn_more').bind('click',function(e){
						e.preventDefault();
						self.expand($(this),'.expandable_items');
					});
					$('#product_categories_wrapper .btn_more_cates').bind('click',function(e){
						e.preventDefault();
						self.expand($(this),'.expandable_cates');
					});
				},
				expand: function(btn,target){
					btn.toggleClass('expanded').parent().parent().children(target).slideToggle();
				},
			},
			galleryPageController = {
				init: function(){
					var self = galleryPageController, gallery_overlay = $('#image_overlay');

					$('.gallery_box .link_ajax').bind('click',function(e){
						var photo_order = $(this).parents('.gallery_box').data('photo-order'),
						 	url = $(this).attr('href'), target = gallery_overlay.find('.slides');

						e.preventDefault();
						gallery_overlay.fadeIn();

				        $.ajax({
				        	url: url,
				          	success: function(data){
				            target.html(data);
				        	self.slider();
				        },
				        	error: function(){
				         	}
				        });

					});	

					gallery_overlay.find('.btn_close').bind('click',function(e){
						e.preventDefault();
						gallery_overlay.hide().find('.slides').slick('unslick');
					});
				},
				slider: function(){
					$(".slide.lazy").lazyload();
					$('#image_overlay .slides').slick({
						arrows: true,
						dots: false,
				    	slidesToShow: 1,
			    	 	slidesToScroll: 1,
				        infinite: true
					});

					// $('.gallery_overlay .slides').slick('slickGoTo', photo_order);
				},
			},
			newsPageController = {
				init: function(){
					$('.news_boxes .news_box').hover(function(){
						if(m!='m'){
							$(this).find('.expand_title').slideDown();
						}
			        }, function(){
			        	if(m!='m'){
							$(this).find('.expand_title').hide();
			        	}
				    });
				},
			},
			ellipsisFallback = {
				selector: '',
				init: function(arr){
					var str = '';
					for(var i=0; i<arr.length; i++){
						$(arr[i]).dotdotdot({
							wrap: 'wrap',
							height: function(){return parseInt($(this).css('maxHeight'));}
						});
						str += arr[i];
						if(i+1 < arr.length){
							str += ',';
						}
					}
					if(arr.length>=1){
						$(window).bind('resize', function(){
							if(ellipsisFallback.selector!= ''){
								setTimeout(function(){
									$(ellipsisFallback.selector).trigger("update.dot");
								}, 10);
							}
						});
						ellipsisFallback.selector = str;
					}
				}
			},
			productSlider = {
				init: function(){
					var self = productSlider;
					var $slider = $('#product_slider .slides');

					$(window).bind('_change.tod', function(){
						self.resized('d');
					}).bind('_change.tot', function(){
						self.resized('t');
					}).bind('_change.tom', function(){
						self.resized('m');

						$($slider).on('afterChange', function(event, slick, currentSlide) {
							var slength = slick.$slides.length;
						  console.log((slength), currentSlide);
						  if ((slength%3 !== 0 && slength-currentSlide <4) || (slength%3 === 0 && slength-currentSlide ===3)) {
						    console.log("Last slide");
						    $('#product_slider').addClass('whiteFadeOut');
						  }  else {
						    $('#product_slider').removeClass('whiteFadeOut');
						  }
						});
					});

				},
				slider_opt: { 
					m: {
				    	arrows: false,
				    	dots: false,
					infinite: false,
			    	 	slidesToScroll:3, /*Samantha : due to removed variableWidth, now change back to use 3.*/
			    	 	slidesToShow: 3,
			    	 	speed: 400,
			    	 	autoplay: false, //modify autoplay to false
					pauseOnHoverImmediate: false
					},  
					d: {
				    	arrows: true,
				    	dots: false,
				    	infinite: false,
				    	slidesToShow: 4,
			    	 	slidesToScroll: 4,
					},
					d_landing_page: {
				    	
						arrows: true, 
                        dots: false,
                        infinite: false,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        autoplay: false,
				        appendArrows: '#product_highlights .slider-nav',
					},
					t: {
				    	arrows: false,
				    	dots: false,
				    	infinite: false,
				    	slidesToShow:2,
			    	 	slidesToScroll: 2,
					},
					t_landing_page: {
				    	arrows: false,
				    	dots: false,
				    	infinite: false,
				    	slidesToShow:2,
			    	 	slidesToScroll: 2,
					},
					t_detail_page: {
				    	arrows: false,
				    	dots: false,
				    	infinite: false,
				    	slidesToShow: 4,
			    	 	slidesToScroll: 4
					}
				},
				resized: function(_m){
					var $slider = $('#product_slider .slides'),
					initalized = ($slider.hasClass('slick-slider'))? true: false;
					if(initalized){
						$slider.slick('unslick');
					}
					if(_m == 'd' || _m == 't'){
						if(!$body.hasClass('item_detail')){
							if($('#product_slider .square_boxes').length ==0){

								var $square_box = $('#product_slider .square_box_sm'),
									slice_num = 4;
								$('#product_slider .square_box_lg').wrap('<div class="square_boxes"></div>');

								for (var i=0; i<$square_box.length; i+=slice_num) {
								    var $div = $("<div/>", {class:'square_boxes'});
								    $square_box.slice(i, i+slice_num).wrapAll($div);
								}
							}
						}

						if(_m == 'd'){
							if($body.hasClass('landing')){
								$slider.slick(productSlider.slider_opt.d_landing_page);

								// landing product slider arrows
								$slider.find('.slick-prev').bind('click',function(e){
									e.preventDefault();
									//$slider.slick('slickPause').slick('slickSetOption', 'slidesToScroll', -1).slick('slickPlay');
								});
								$slider.find('.slick-next').bind('click',function(e){
									e.preventDefault();
									//$slider.slick('slickPause').slick('slickSetOption', 'slidesToScroll', 1).slick('slickPlay');
								});	
							}else{
								$slider.slick(productSlider.slider_opt.d);
							}
						}
						else{
							if($body.hasClass('landing')){
								$slider.slick(productSlider.slider_opt.t_landing_page);	
							} else if($body.hasClass('item_detail')){
								$slider.slick(productSlider.slider_opt.t_detail_page);	
							}else{
								$slider.slick(productSlider.slider_opt.t);	
							}
						}
					}
					else{
						if($('#product_slider .square_boxes').length >= 1){
							$('.square_box').unwrap('<div class="square_boxes"></div>');
						}
					 	$slider.slick(productSlider.slider_opt.m);						
					}			


						if ($slider.slick("getSlick").slideCount <= 3) {
							$('#product_slider').addClass('whiteFadeOut');
						} else {
							$('#product_slider').removeClass('whiteFadeOut');
						}
				}
			},

			headerHandler = function(){
				var sub_menu = $('.sub_menu'), nav_bar_btn = $('#main_nav .btn_nav_bar, #main_nav .btn_nav_bar .icon'), head_bar = $('#header .head_bar');

				// desktop nav bar btn
				nav_bar_btn.hover(function(e){
					if (m != 'd' && ipad_pro == false) return; // Samantha: ensure it is desktop
					nav_bar_btn.removeClass('active');
					sub_menu.removeClass('active');

					if($(this).hasClass('hasmenu') && m!='m'){
						$(this).addClass('active');
						var el = $('.'+$(this).data('sub-menu'));
						el.addClass('active');
					}
				});

				head_bar.hover(function(e){
					if (m != 'd' && ipad_pro == false) return; // Samantha: ensure it is desktop
					nav_bar_btn.removeClass('active');
					sub_menu.removeClass('active');						
				});

				// desktop sub menu
			    sub_menu.hover(function(){
			    	if (m != 'd' && ipad_pro == false) return; // Samantha: ensure it is desktop
					// nav_bar_btn.addClass('active');
					//sub_menu.addClass('active');
					$(this).addClass('active');
					
			    }, function(){	        
			    	if (m != 'd' && ipad_pro == false) return; // Samantha: ensure it is desktop
			    	$(this).removeClass('active');
					sub_menu.removeClass('active');
					nav_bar_btn.removeClass('active');

			    });

			    // tablet click empty space hide submenu
				$(document).on('click touchstart',function(e){
					if (m == 'd' && ipad_pro != true) return; // Samantha: ensure it is NOT desktop
	          		if (!sub_menu.find('*').is(e.target) && !sub_menu.is(e.target) && !nav_bar_btn.find('*').is(e.target) && !nav_bar_btn.is(e.target)){
						sub_menu.removeClass('active');
						nav_bar_btn.removeClass('active');
	          		}
				});

				var $nav = $('#main_nav'), $menu_bg = $('#menu_bg');
				var $header = $('#header');

				$('#menu_bg').on("touchmove", freezeVp);
				$('#main_nav').on("touchmove", function(e){
					if(m != 'm' && ipad_pro == false) return; 
					if($('#main_nav')[0].scrollHeight+$('#header').height() <= $(window).height()){
						e.preventDefault();
					}
				});
				// mobile menu btn
				$('#header .btn_menu').bind('click',function(e){
					e.preventDefault();
					if (m == 'd' && ipad_pro != true) return; // Samantha: ensure it is NOT desktop
					if ($(this).hasClass('active')) {
						$('.head_bar, .bottom_btns').off('scroll.lockScroll touchmove.lockMove mousewheel.lockMouse');
					} else {
						$('.head_bar, .bottom_btns').on('scroll.lockScroll touchmove.lockMove mousewheel.lockMouse', function(e){
							e.preventDefault();
							e.stopPropagation();
							return false;
						});
					}
					$(this).toggleClass('active');
					$('body').toggleClass('noscroll');
					$header.toggleClass('opened');
					$nav.fadeToggle().toggleClass('expanded').css('max-height', window.innerHeight-$('.head_bar').height());
					$menu_bg.fadeToggle();
				});

				// // mobile nav_bar btn expand sub_menu
				nav_bar_btn.bind('click',function(e){
					if (m == 'd' && ipad_pro != true) return; // Samantha: ensure it is NOT desktop
					var el = $('.'+$(this).data('sub-menu'));
					// if(!$(this).hasClass('active') && $(this).hasClass('hasmenu')){
					// 	e.preventDefault();
						// sub_menu.slideUp();
						// nav_bar_btn.removeClass('active');

						// $(this).addClass('active');
						// el.slideDown();
					// }

					if($(this).hasClass('hasmenu')){
						e.preventDefault();
						// Samantha: close other submenu before
						nav_bar_btn.not($(this)).removeClass("active"); // exclude itself
						$('.sub_menu ').not(el).removeClass("active"); // exclude itself
						// END
						$(this).toggleClass('active');
						el.toggleClass('active');		
					}

				});

				// mobile hide menu
				$menu_bg.bind('click',function(e){
					e.preventDefault();
					if (m == 'd' && ipad_pro != true) return; // Samantha: ensure it is NOT desktop
					closeMenu();
				});
				var $m_sticky = ($header.hasClass('floating'))? $header : (($('#main_search').hasClass('floating'))? $('#main_search') : null),
				sticky_waypoint;
				if($m_sticky) sticky_waypoint = $m_sticky.position().top;
				$(window).scroll(function(){
					if(m == 'm' && $m_sticky){
						var t = $(window).scrollTop();
						if(t < sticky_waypoint){
							$m_sticky.removeClass('sticky');
						}
						else{
							$m_sticky.addClass('sticky');
						}
					}
				});
			},
			footerHandler = function() {
				$(window).bind('_change.tod', function(){
					if($('#footer_event .ads_lg').hasClass('slick-slider')){
						$('#footer_event .ads_lg').slick('unslick');
					}
				}).bind('_change.tom _change.tot', function(){
					if(!$('#footer_event .ads_lg').hasClass('slick-slider')){
						$('#footer_event .ads_lg').slick({
			      	 		arrows: false,
					    	dots: true,
					    	infinite: true
				
						});
					}
				});
			},
			imageHandler = function(){
				$("img.lazy").lazyload();
				$("div.lazy").lazyload({failure_limit : 10, load: function(){
					$(this).removeClass('lazy');
				}});
			},
			searchHandler = function() {
				if($('#search_widget').length == 0) return;
				var $search = $('#search_widget'), $search_popup_box = $search.find('.search_popup_box'), search_bg = $('#search_bg');

				$search.find('.search_field input').focus(function(){
					$search_popup_box.show();
					$search.addClass('show_pop_keywords');
				}).keyup(function(e){
		            if(this.value.length ==0){
						$search.removeClass('show_search_list').addClass('show_pop_keywords');
			        }else{
						$search.removeClass('show_pop_keywords').addClass('show_search_list');
			        }
				});
				$search.find('.search_field input:first').data('placeholder-default', $search.find('.search_field input:first').attr('placeholder'));
				$(document).on('click touchstart',function(e){
	          		if (!$search.find('*').is(e.target) && $search_popup_box.is(':visible')){
						var placeholder_default = $('.search_field input').data('placeholder-default');
						$search.removeClass('show_pop_keywords').find('.search_field input').blur();
						$search_popup_box.hide();
						$search.find('.search_field input').attr('placeholder',placeholder_default).data('placeholder',placeholder_default);
	          		}
				});
				// click radio btn change placeholder
				$search.find('.search_popup_box .radio_group input').bind('click',function(e){
					var placeholder = $(this).data('placeholder');
					$search.find('.search_field input').attr('placeholder',placeholder).data('placeholder',placeholder);
				});

				//mobile click search btn show $search
				$('.toggle_search').bind('click',function(e){
					e.preventDefault();
					$(this).toggleClass('clicked');
				 	search_bg.fadeToggle();
					$search.fadeToggle();
				});
				
				search_bg.bind('click',function(e){
					e.preventDefault();
					$('.toggle_search').removeClass('clicked');
				 	search_bg.fadeOut();
					$search.fadeOut();
				});

				$('.main_search .btn_supplier').bind('click',function(e){
					var m_href = $(this).data('m-href');
					if(m=='m'){
						e.preventDefault();
						// $('#exhibitor_list_overlay').fadeIn();
						window.location = m_href;
					}
				});

				$('#exhibitor_list_overlay').delegate('.link_ajax','click',function(e){
					e.preventDefault();
					var url = $(this).attr('href'), target = $(this).closest('ul');
					ajaxHandler(url,target);
				});


			},
			similarProduct = {
				page: 1,
				totalpage: 0,
				url: '',
				overlay: null,
				init: function(){
					this.overlay = $('#similar_products_overlay');
					if(this.overlay.length == 0) return;
					var self = similarProduct;
					self.url = $('#similar_products_overlay').data('ajaxurl');
					self.totalpage = self.overlay.find('.pagination a').length - 4;
					// open similar_products_overlay
					$('.link_similar_products').bind('click',function(e){
						e.preventDefault();
						//load 1st page content
						if(self.page != 1){
						 self.loadMore(1, false);
						}
						self.overlay.fadeIn().addClass('expanded');
						$('body').addClass('noscroll');
					});
					
					//close similar_products_overlay
					self.overlay.find('.btn_close, .white_bg').bind('click',function(e){
						e.preventDefault();
						self.overlay.fadeOut().removeClass('expanded');			
						$('body').removeClass('noscroll');
					});
					
					// similar_products_overlay mobile view more btn ajax load content
					self.overlay.delegate('.link_ajax','click',function(e){
						e.preventDefault();
						if($(this).hasClass('active')) return;
						var p;
						if($(this).data('page')){
							p = parseInt($(this).data('page'));
						}
						else if($(this).hasClass('next')){
							p = self.page +1;
							
						}
						else{
							p = self.page - 1;
						}
						self.loadMore(p, $(this).hasClass('btn_more'));


					})
				},
				loadMore: function(p, is_append){
					var self = similarProduct, target = self.overlay.find('.ajax_content');
					if(!is_append){
						target.html('');
					}
			        $.ajax({
			        	url: self.url,
			        	data: "page="+p,
			          	success: function(data){
			          		if(is_append){
			            		target.append(data);
			          		}
			          		else{
			          			target.html(data);
			          		}
			            	var pagin = self.overlay.find('.pagination');
			            	if(p == 1){
			            		pagin.find('.prev').hide();
			            	}
			            	else{
			            		pagin.find('.prev').show();	
			            	}
			            	if(p >= self.totalpage){
			            		pagin.find('.next').hide();	
			            		self.overlay.find('.btn_more').hide();
			            	}
			            	else{
			            		pagin.find('.next').show();		
			            	}
			            	pagin.find('a:eq('+(p+1)+')').addClass('active').siblings('.active').removeClass('active');
			            	self.page = p;
			        	},
			        	error: function(){
			         	}
			        });
				}
			},
			formHandler = {
				loading: false,
				init: function(){
					var self = formHandler;
					var ref_sample_table_overlay = $('#ref_sample_table_overlay'),
						ref_sample_table = $('#ref_sample_table'), ref_sample = $('.ref_sample');



					$('.link_viewsample').hover(function(){
						ref_sample_table.show();
					}, function(){
						ref_sample_table.hide();	

					// open ref_sample_table_overlay
					}).bind('click',function(e){
						e.preventDefault();
						ref_sample_table_overlay.fadeIn().find('.table').append(ref_sample_table);
					});
					$('.businessNatureHolder').bind('click', function(e){
						// e.preventDefault();
						if(!$(this).hasClass('active')){
							$(this).addClass('active').removeClass('selected');
						}
					});
					$(".form").click(function(e) {
				        var target = $(e.target);
				        if(target.parents('.checkbox_list:first').length == 0){
				        	$('.businessNatureHolder').removeClass('active').find('.checkboxes');
				        	var checked = $('input[name="businessNature"]').parent().removeClass('checked').end().filter(':checked').parent().addClass('checked');
				        	if(checked.length > 0){
				        		$('.businessNatureHolder').addClass('selected');
				        	}
				        	else{
				        		$('.businessNatureHolder').removeClass('selected');	
				        	}
				        }

				    });
					//close ref_sample_table_overlay
					$('#ref_sample_table_overlay .btn_close, #ref_sample_table_overlay .white_bg').bind('click',function(e){
						e.preventDefault();
						ref_sample_table_overlay.hide();
						ref_sample.append(ref_sample_table);			
					});

					$('.btn_form_msg').bind('click',function(e){
						e.preventDefault();
					});
					if($('#get_latest_price_overlay').length == 1){
						var get_latest_price_overlay = $('#get_latest_price_overlay');
						// open get_latest_price_overlay
						$('.btn_price').bind('click',function(e){
							e.preventDefault();
							get_latest_price_overlay.find('.form_wrapper').show().end().find('.thankyou_wrapper').hide().end().fadeIn();
							self.formReset(get_latest_price_overlay.find('form'));
							$('html').addClass('fixDetailScroll');
						});

						// close get_latest_price_overlay
						$('#get_latest_price_overlay .btn_close, #get_latest_price_overlay .white_bg').bind('click',function(e){
							e.preventDefault();
							get_latest_price_overlay.fadeOut();
							self.formReset(get_latest_price_overlay.find('form'));
							$('html').removeClass('fixDetailScroll');
						});

		
					}
					if($('#thankyou_overlay').length == 1){
						// close get_latest_price_overlay
						$('#thankyou_overlay .btn_close, #thankyou_overlay .white_bg').bind('click',function(e){
							e.preventDefault();
							$(this).closest('#thankyou_overlay').fadeOut();
						});
					}

					//resset country dropdown
					$('.parent_dropdown').change(function(){
					    $('.child_dropdown').prop('selectedIndex',0);
					});
					self.formValidate();
				},
				formValidate: function(){
					var self = formHandler;
					var error = 'error', form_component = '.form_component', form = $('.hktdc_form');

					// define form error msg
					$.validator.messages.required = 'This field cannot be empty';

					$(form).each(function(){
						$(this).validate({
				        errorClass: error,
		      	        errorPlacement: function(error, element) {				          	
				          	if (element.attr('name') == 'country_code' || element.attr('name') == 'tel_no') {
				          		form.find('.country_fileds').find('.btn_notice span').text(error[0].textContent);
				          	} else {
				          		element.closest(form_component).find('.btn_notice span').text(error[0].textContent);
				          	}
				        },
				        highlight: function(element, errorClass, validClass) {
				          	if ($(element).attr('name') == 'country_code' || $(element).attr('name') == 'tel_no') {
				          		form.find('.country_fileds').addClass(errorClass);
				          	}
				          	$(element).closest(form_component).addClass(errorClass);
				        },
				        unhighlight: function(element, errorClass, validClass) {
				          	if ($(element).attr('name') == 'country_code' || $(element).attr('name') == 'tel_no') {
				          		form.find('.country_fileds').removeClass(errorClass);
				          	}
				          	$(element).closest(form_component).removeClass(errorClass);
				        },
				        submitHandler: function(form) {
				        	if(!self.loading){
				        		self.loading = true;
					        	//setTimeout(function(){
					        	if(!$(form).is('#get_latest_price_form')){
					        		/*!!For Demo only, this should be redirected by server*/
						        	var thank_you_url = '';
						        	if($body.hasClass('contact_us')){
						        		thank_you_url = 'contact_us_thankyou.php';
						        	}
						        	else if($body.hasClass('contact_supplier')){
						        		thank_you_url = 'contact_supplier_thankyou.php';
						        	}
							        $.ajax({
							            url: form.action,
							            type: form.method,
							            data: $(form).serialize(),
							            success: function(response) {
							            	if(thank_you_url!=''){
							            		window.location.replace(thank_you_url);
							            	}
							            	else{
							            		$('#thankyou_overlay').fadeIn()
							            	}
							            }            
							        });
								    
					        	}
					        	else{

							        $.ajax({
							            url: form.action,
							            type: form.method,
							            data: $(form).serialize(),
							            success: function(response) {
						        			form.reset();
						        			$('#get_latest_price_overlay').find('.form_wrapper').hide().end().find('.thankyou_wrapper').fadeIn();
							            }            
							        });
					        	}
					        	self.loading = false;
					        	//}, 5000);
				        	}
				        }
						});
					});


					$('.required_field, .email_field, .digit_field, .maxlength, .form_group, .equalto').each(function() {
						var rules = {};
						if($(this).hasClass('required_field')){
							rules.required = true;
						}
						if($(this).hasClass('email_field')){
							rules.email = true;
						}
						if($(this).hasClass('digit_field')){
							rules.number = true;
						}
						if($(this).hasClass('maxlength')){
							rules.maxlength = parseInt($(this).attr('maxlength'));
							$(this).attr('maxlength', rules.maxlength+1);
						}
						if($(this).hasClass('form_group')){
							rules.require_from_group =  [2, '.'+$(this).data('group'), $(this).data('msg')];
						}
						if($(this).hasClass('equalto')){
							rules.equalTo = $(this).data('equalto');
						}
			            $(this).rules("add", rules);
					});
					$('select.country_region').change(function() {
					  $(this).parents('form:eq(0)').find('select.region').prop('selectedIndex',0);
					});
					// set select list first choice to be empty
					// $('select.required_field option').each(function(){
			  //           $(this).rules("add", {
			  //           	regex: "^([0-9\(\)\/\+ \-]+)$"
			  //           });
					// });

				},
				formReset : function($form){
					$form.get(0).reset();
					$form.find('.error').removeClass('error');
				}
			},
			filterHandler = function(){

				$('.bottom_btns .btn_filter').bind('click',function(e){
					e.preventDefault();
					$(this).toggleClass('active');
					$('#list_filters').fadeToggle();
					$('html').toggleClass('fixScroll');
					if ($('#overlaybg').length<=0) {
						$('#root').append('<div id="overlaybg"></div>');
					}
					$("#overlaybg").fadeToggle();
				});	
				$('#list_filters').delegate('.list a', 'click', function(e){
					if($(this).hasClass('title')){
						e.preventDefault();
						var $e = $(this).parent();
						if($e.hasClass('expanded')){
							$e.removeClass('expanded').find('.list_expandable').slideUp();
						}
						else{
							$e.siblings('.expanded:not("#sidebar_related_cat")').find('.title').trigger('click');
							$e.addClass('expanded').find('.list_expandable').slideDown(function(){
								$('#list_filters').animate({
								    scrollTop: $e.position().top  +  $("#list_filters").scrollTop()
								}, 600);
							});

						}
					}
					else if($(this).hasClass('btn_viewmore')){
						e.preventDefault();
						$(this).toggleClass('expanded').parent().find('.expandable_content').slideToggle();
					}
					else if($(this).hasClass('link_ajax')){
						e.preventDefault();
						var url = $(this).attr('href'), target = $(this).closest('.list_expandable');
						ajaxHandler(url,target);
					}
					else{
						console.log('refresh:'+$(this).attr('href'));
						if(m == 'm')
							$('.bottom_btns .btn_filter').trigger('click');
					}

				});
	
			},
			myFavouriteHandler = function() {
				var my_fav_num = $('.my_fav_num');	

				my_fav_num.text($('.btn_my_fav.active').length);

				$('.btn_my_fav').bind('click',function(e){
					e.preventDefault();
					$(this).toggleClass('active');
					my_fav_num.text($('.btn_my_fav.active').length);
				});
			},
		    ajaxHandler = function(url,target){
		        $.ajax({
		        	url: url,
		          	success: function(data){
		            target.html(data);
		        },
		        	error: function(){
		         	}
		        });
		    },
		    videoHandler = function(){
		    	$('body').delegate('.video-link', 'click', function(e){
		    		e.preventDefault();
		    		var url = $(this).attr('href');
		    		jwplayer("video_player").setup({
		    		'allowscriptaccess': 'always',
					'flashplayer': 'http://www.hktdc.com/static/jwplayer/58/player.swf',
					"file": url,
					// "image": $(this).data('cover'),
					"width": "100%",
					"height": 'auto',
					"autostart": "false",
					});
					// $(this).toggleClass('active');
					$('#video_overlay').fadeToggle();
		    	});
		    	$('#video_overlay').find('.btn_close').bind('click',function(e){
					e.preventDefault();
					$('#video_overlay').hide();
					jwplayer("video_player").remove();
				});
				// $('#video_overlay .placeholder').bind('click',function(e){
				// 	e.preventDefault();
				// 	jwplayer("video_player").play();
				// });
		    };
		    elemWidth = parseInt(getComputedStyle(document.querySelector("#checkVw"), null).width, 10);
			halfWidth = parseInt(window.innerWidth / 2, 10);
			support_vp_unit = ((elemWidth == halfWidth) ? true : false) ;
  			if(!support_vp_unit){
  				$('body').addClass('no-vp-unit');
  			}
			footerHandler();
			headerHandler();
			imageHandler();
			searchHandler();
			filterHandler();
			videoHandler();
			similarProduct.init();
			if($body.hasClass('form_page')){
				formHandler.init();
			}

			// init page controller
			if($body.hasClass('landing')){
				landingPageController.init();
			}
			else if($body.hasClass('product_list') || $body.hasClass('exhibitor_list')){
				listPageController.init();
			}
			else if($body.hasClass('item_detail')){
				detailPageController.init();
			}
			else if($body.hasClass('fair_photo_gallery')){
				galleryPageController.init();
			}
			else if($body.hasClass('product_categories')){
				categoriesPageController.init();
			}
			else if($body.hasClass('market_news')){
				newsPageController.init();
			}


			$(window).resize();
			$(window).load(function(){
				if($('html').hasClass('ellipsis')){
					$body.addClass('css_ellipsis');
				}
				else{
					ellipsisFallback.init(['.truncate']);
				}
			});

		};

		init();
	})
})(jQuery);

/* fix ipad zoom in then rotate issue, UAT16806 */
var pCSlider = false;

window.addEventListener("orientationchange", function() { // rotate only, filter desktop clients
	 if ($('body.landing').length > 0) { // homepage only
	 	buying_width = ($(window).width()-60)/6;

	 	$('#buying_leads .box').width(buying_width);
		/*var zoom = document.documentElement.clientWidth / window.innerWidth;
		if (zoom > 1 || pCSlider){  // zoomed in only
			if (window.orientation == 90 || window.orientation == -90) { // landscape
					pCSlider = true;
					$("#fair_slider .slides").slick('unslick'); 
							$('#fair_slider .slides').slick({
						    	arrows: true,
						    	dots: false,
						    	infinite: true,
						    	slidesToShow: 4,
					    	 	slidesToScroll: 4,
						    	autoplay: false,   //change autoplay to false
						    	autoplaySpeed: 10000
							});

					$("#buying_leads .slides").slick('unslick'); 
					// buying slider
					$('#buying_leads .slides').slick({
						arrows: true,
						dots: false,
						slidesToShow: 6,
						slidesToScroll: 6,
						infinite: false
					});
			} else {
				 // portrait mode
				 if (pCSlider) {
				 	pCSlider = false;
					$("#fair_slider .slides").slick('unslick'); 

							// fair slider
							$('#fair_slider .slides').slick({
						    	arrows: true,
						    	dots: false,
						    	infinite: true,
						    	slidesToShow: 4,
					    	 	slidesToScroll: 4,
						    	autoplay: false,   //change autoplay to false
							
		    
						    	autoplaySpeed: 10000,
						        responsive: [{
						        	breakpoint: 1023,
						        	settings: {
						        	 	arrows: false,
				        	 	        slidesToShow: 2,
								        slidesToScroll: 2, 
								        variableWidth: true,
								        speed: 300,
								        // infinite: false
						        	}
						        }]
							});

							$("#buying_leads .slides").slick('unslick'); 
							// buying slider
							$('#buying_leads .slides').slick({
								arrows: true,
								dots: false,
						    	slidesToShow: 6,
					    	 	slidesToScroll: 6,
						        infinite: false,
						        responsive: [{
						        	 breakpoint: 1023,
						        	 settings: {
						        	 	arrows: false,
				        	 	        slidesToShow: 2, //modify form 1 to 3
				        	 	        speed: 300,
								        slidesToScroll: 2, //modify form 1 to 3
								        variableWidth: true,
						        	 }
						        }]
							});
		 		}
			}
		} */// end zoom in
	 }
});

/* fix ipad zoom in then rotate issue, UAT16806  END*/
/* PCR4332 Start */
$(document).click(function(e){
	if ($(e.target).parents().hasClass('language-switcher') || $(e.target).hasClass('language-switcher')) {
	} else {
		$('.language-switcher ul').hide();
	}
});
$('.language-switcher').click(function() {
	$('.language-switcher ul').toggle();
});
$('.language-hints .btn-close').click(function(e) {
	e.preventDefault();
	$('.language-hints').hide();
});
/* PCR4332 End */
