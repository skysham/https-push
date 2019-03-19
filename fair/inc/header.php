<header id="header" <?php echo (isset($sticky) && $sticky == 'header')? 'class="floating"':'';?>>
    <div class="top_bar md-only cf">
        <ul class="pullleft cf">
            <li><a href="#">About HKTDC</a></li>
            <li><a href="#">Media Room</a></li>
            <li><a href="#">Contact HKTDC</a></li>
            <li><a href="#">Register Now</a></li>
            <li><a href="#">MyExhibitors (0)</a></li>
            <li><a href="#">MyHKTDC</a></li>
            <li><a href="#">Fair Site Map</a></li>
            <li><a href="#">Login</a></li>
        </ul>
        <ul class="langs cf">
            <li><a href="#">繁體</a></li>
            <li><a href="#">简体</a></li>
        </ul>
    </div>
    <div class="head_bar">
        <div class="logo_wrapper cf">
            <a href="#" class="logo"><img class="xs-hidden" src="images/d/header_logo.png"><img class="xs-only" src="images/m/header_logo.png"></a>
            <a href="#" class="btn_menu mobile-only"><i class="icon icon-menu"></i><i class="icon icon-menu-close"></i></a>
        </div>
        <div class="btns cf">
        <?php if (!isset($simplified_header)):?>
            <a href="#">Apply Booth</a>
            <a href="#">Register</a>
            <a href="#">Contact HKTDC</a>
        <?php endif;?>
        </div>
    </div>
    <nav id="main_nav" class="nav_bar cf">
        <div class="nav_top cf">
            <ul class="langs mobile-only pullleft cf">
                <li><a href="#">繁體</a></li>
                <li><a href="#">简体</a></li>
            </ul>
            <a href="#" class="btn_login mobile-only pullright">Login</a>
        </div>
        <a href="#menu1" class="btn_nav_bar">My Favourite</a>
<!--         <div class="sub_menu sub_menu-1">
            <ul class="row cf">
            </ul>
        </div>  -->
        <a href="#" class="btn_nav_bar" data-sub-menu="sub_menu-2">For Exhibitor<i class="icon mobile-only"></i></a>
<!--         <div class="sub_menu sub_menu-2">
            <ul class="row cf">
            </ul> 
        </div> -->
        <a href="#" class="btn_nav_bar" data-sub-menu="sub_menu-3">For Visitor<i class="icon mobile-only"></i></a>
<!--         <div class="sub_menu sub_menu-3">
            <ul class="row cf">
            </ul> 
        </div> -->
        <a href="#" class="btn_nav_bar" data-sub-menu="sub_menu-4">For Press<i class="icon mobile-only"></i></a>
<!--         <div class="sub_menu sub_menu-4">
            <ul class="row cf">
            </ul> 
        </div> -->
        <a href="#" class="btn_nav_bar hasmenu" data-sub-menu="sub_menu-5">General Info<i class="icon mobile-only"></i></a>
        <!-- <ul class="sub_menu sub_menu-5 mobile-only">
            <li><a href="#">Major Asian Electronics 5</a></li>
            <li><a href="#">Major Asian Electronics 5</a></li>
            <li><a href="#">Major Asian Electronics 5</a></li>
            <li><a href="#">Major Asian Electronics 5</a></li>
        </ul>    -->
        <div class="sub_menu sub_menu-5">
            <ul class="row cf">
                <li><a href="#">Fair Details</a></li>
                <li><a href="#">Fair at a Glance</a></li>
                <li><a href="#">List of Exhibitors</a></li>
                <li><a href="#">Hall Plan</a></li>
            </ul>
            <ul class="row cf">
                <li><a href="#">Event Schedule</a></li>
                <li><a href="#">Travel Assistance</a></li>
                <li><a href="#">Shuttle Bus Service</a></li>
                <li><a href="#">Previous Fair Photo Gallery</a></li>
            </ul>
            <ul class="row cf">
                <li><a href="#">Previous Fair Information</a></li>
                <li><a href="#">Major Asian Electronics Fairs</a></li>
                <li><a href="#">Fair Video</a></li>
                <li><a href="#">Contact Us</a></li>
            </ul>
            <ul class="row cf">
                <li><a href="#">Enquiries</a></li>
            </ul> 
        </div>
        <a href="#design" class="btn_nav_bar" data-sub-menu="sub_menu-6">Design Competition<i class="icon icon-arrow-white-right mobile-only"></i></a>
        <a href="#news" class="btn_nav_bar" data-sub-menu="sub_menu-7">eNews<i class="icon icon-arrow-white-right mobile-only"></i></a>
        <a href="#other" class="btn_nav_bar">Other HKTDC Events</a>
    </nav>
   <!--  <div class="sub_menu hidden">
        <div class="content sub_menu-1">
            <ul>
                <ul class="row cf">
                    <li><a href="#">Major Asian  Fairs</a></li>
                    <li><a href="#">Major  Electronics Fairs</a></li>
                    <li><a href="#">Asian Electronics Fairs</a></li>
                    <li><a href="#">Fairs</a></li>
                </ul>
            </ul>  
        </div>
        <div class="content sub_menu-5">
                <ul class="row cf">
                    <li><a href="#">Major Asian  Fairs</a></li>
                    <li><a href="#">Major  Electronics Fairs</a></li>
                    <li><a href="#">Asian Electronics Fairs</a></li>
                    <li><a href="#">Fairs</a></li>
                </ul>
                <ul class="row cf">
                    <li><a href="#">Fairs</a></li>
                    <li><a href="#">Major Asian Electronics Fairs</a></li>
                    <li><a href="#">Major Asian Electronics Fairs</a></li>
                    <li><a href="#">Major Asian Electronics Fairs</a></li>
                </ul>
                <ul class="row cf">
                    <li><a href="#">Major Asian Electronics Fairs</a></li>
                    <li><a href="#">Major Asian Electronics Fairs</a></li>
                    <li><a href="#">Major Asian Electronics Fairs</a></li>
                    <li><a href="#">Major Asian Electronics Fairs</a></li>
                </ul>
                <ul class="row cf">
                    <li><a href="#">Major Asian Electronics Fairs</a></li>
                </ul> 
        </div>
    </div> -->
    <div id="menu_bg" class="dark_bg xs-only"></div>
</header>