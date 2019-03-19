<?php for($i=0;$i<5;$i++):?>
<div class="row cf">
	<div class="product_teaser cf">
		<img src="https://placehold.it/85x85">
		<div class="content">
			<p><b>Emergency Lighting <?php echo (isset($_GET['page']))? $_GET['page'] : '';?><?php echo $i;?></b></p>
			<p>(Model No.: ECL3)</p>
			<p>Signcomplex Ltd</p>
		</div>
		<!-- <a href="#" class="box_link">&nbsp;</a> -->
	</div>
	<div class="product_teaser cf">
		<img src="https://placehold.it/85x85">
		<div class="content">
			<p><b>Retro Lamp with Warning Light <?php echo (isset($_GET['page']))? $_GET['page'] : '';?><?php echo $i;?></b></p>
			<p>(Model No.: CL-611</p>
			<p>Shenzhen CAL Electronics-Tech Co Ltd</p>
		</div>
		<!-- <a href="#" class="box_link">&nbsp;</a> -->
	</div>		
</div>
<?php endfor;?>