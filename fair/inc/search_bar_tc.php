<section id="main_search" class="main_search cf <?php echo (isset($sticky) && $sticky == 'main_search')? 'floating':'';?>">
	<a href="exhibitor_list.php" data-m-href="exhibitor_list.php" class="btn_icon btn_supplier"><span><i class="icon icon-supplier"></i><span class="txt">參展商/<br class="xs-only"/>供應商</span></span></a>
	<a href="product_list.php" class="btn_icon btn_product"><span><i class="icon icon-product"></i><span class="txt">產品</span></span></a>
	<div class="dark_bg mobile-only" id="search_bg"></div>
	<div id="search_widget" class="search_wrapper">
		<div class="search_field">
			<input type="text" name="search" placeholder="參展商/供應商/產品/攤位編號/品牌">
			<a href="#" class="btn_icon btn_search"><i class="icon icon-search"></i></a>
		</div>
		<div class="search_popup_box">
			<div class="radio_group cf">
				<div class="radio_btn">
		        	<input type="radio" name="search_type" id="search_type_1" value="0" data-placeholder="搜尋參展商/供應商" checked><label for="search_type_1"><span></span>參展商/供應商</label>
				</div>
				<div class="radio_btn">
		        	<input type="radio" name="search_type" id="search_type_2" value="1" data-placeholder="搜尋產品"><label for="search_type_2"><span></span>產品</label>
				</div>
			</div>
			<div class="pop_keywords">
				<p>熱門關鍵字</p>
				<ul class="cf">
					<li><a href="#"><span>Memory Card</span></a></li>
					<li><a href="#"><span>Quadcopter Drone</span></a></li>
					<li><a href="#"><span>Watch</span></a></li>
					<li><a href="#"><span>Double A4 Paper</span></a></li>
					<li><a href="#"><span>T Shirt</span></a></li>
					<li><a href="#"><span>LED Bulb</span></a></li>
					<li><a href="#"><span>Hoverboard</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
					<li><a href="#"><span>Clothing</span></a></li>
				</ul>
			</div>
			<div class="last_search search_list md-only">
				<p>上次搜尋紀錄</p>
				<ul>
					<li><a href="#">diamond</a></li>
					<li><a href="#">gem</a></li>
					<li><a href="#">jewellery</a></li>
				</ul>
			</div>
			<div class="recommended_search search_list">
				<p class="md-only">建議搜尋</p>
				<ul>
					<li><a href="#">tv</a></li>
					<li><a href="#">tag</a></li>
					<li><a href="#">tea</a></li>
					<li><a href="#">tv</a></li>
					<li><a href="#">tag</a></li>
					<li class="md-only"><a href="#">tea</a></li>
					<li class="md-only"><a href="#">tv</a></li>
					<li class="md-only"><a href="#">tag</a></li>
					<li class="md-only"><a href="#">tea</a></li>
				</ul>
			</div>
		</div>
	</div>
	<div class="xs-only">
		<a href="#" class="btn_icon btn_search toggle_search"><span><i class="icon icon-search"></i><span class="txt">搜尋</span></span></a>
		<div class="landing-only">
			<a href="#" class="btn_icon btn_visitors"><span><i class="icon icon-visitors"></i><span class="txt">參觀人士中心</span></span></a>
			<a href="#" class="btn_icon btn_exhibitor"><span><i class="icon icon-exhibitor"></i><span class="txt">參展商中心</span></span></a>
			<a href="#" class="btn_icon btn_press"><span><i class="icon icon-press"></i><span class="txt">傳媒中心</span></span></a>
		</div>
	</div>
</section>
<div id="main_search_spacer"></div>
<?php include('exhibitor_list_overlay.php');?>