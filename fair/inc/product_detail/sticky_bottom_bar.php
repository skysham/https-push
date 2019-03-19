<!-- mobile sticky bottom btns -->
<?php if(isset($_GET['ver']) && $_GET['ver'] == 'b'):?>
	<!-- printing out mobile sticky footer with only one button -->
	<div class="mobile-only bottom_btns cf ">
	    <a href="#" class="btn_icon btn-block"><i class="icon icon-mail-white"></i>Enquiry</a>
	</div>
<?php else:?>
	<!-- printing out mobile sticky footer with more then one button -->
	<div class="mobile-only bottom_btns cf">
	    <a href="#" class="btn_icon"><i class="icon icon-cart-white"></i></a>
	    <a href="#" class="btn_icon"><i class="icon icon-mail-white"></i></a>
	    <a href="#" class="btn_icon"><i class="icon icon-fav-white"></i></a>
	</div>
<?php endif;?>
