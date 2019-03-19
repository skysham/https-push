<header id="header" <?php echo (isset($sticky) && $sticky == 'header')? 'class="floating"':'';?>>
    <div class="top_bar md-only cf">
        <ul class="pullleft cf">
            <li><a href="#">關於我們</a></li>
            <li><a href="#">新聞中心</a></li>
            <li><a href="#">聯絡我們</a></li>
            <li><a href="#">馬上登記</a></li>
            <li><a href="#">我的最愛</a></li>
            <li><a href="#">我的HKTDC</a></li>
            <li><a href="#">展覽會網站導覽</a></li>
            <li><a href="#">登入</a></li>
        </ul>
        <ul class="langs cf">
            <li><a href="#">EN</a></li>
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
            <a href="#">申請攤位</a>
            <a href="#">登記</a>
            <a href="#">聯絡展覽部</a>
        <?php endif;?>
        </div>
    </div>
    <nav id="main_nav" class="nav_bar cf">
        <div class="nav_top cf">
            <ul class="langs mobile-only pullleft cf">
                <li><a href="#">EN</a></li>
                <li><a href="#">简体</a></li>
            </ul>
            <a href="#" class="btn_login mobile-only pullright">登入</a>
        </div>
        <a href="#menu1" class="btn_nav_bar">我的最愛</a>
<!--         <div class="sub_menu sub_menu-1">
            <ul class="row cf">
            </ul>
        </div>  -->
        <a href="#" class="btn_nav_bar" data-sub-menu="sub_menu-2">參展商中心<i class="icon mobile-only"></i></a>
<!--         <div class="sub_menu sub_menu-2">
            <ul class="row cf">
            </ul> 
        </div> -->
        <a href="#" class="btn_nav_bar" data-sub-menu="sub_menu-3">參觀人士中心<i class="icon mobile-only"></i></a>
<!--         <div class="sub_menu sub_menu-3">
            <ul class="row cf">
            </ul> 
        </div> -->
        <a href="#" class="btn_nav_bar" data-sub-menu="sub_menu-4">傳媒中心<i class="icon mobile-only"></i></a>
<!--         <div class="sub_menu sub_menu-4">
            <ul class="row cf">
            </ul> 
        </div> -->
        <a href="#" class="btn_nav_bar hasmenu" data-sub-menu="sub_menu-5">展覽會資訊<i class="icon mobile-only"></i></a>
        <!-- <ul class="sub_menu sub_menu-5 mobile-only">
            <li><a href="#">Major Asian Electronics 5</a></li>
            <li><a href="#">Major Asian Electronics 5</a></li>
            <li><a href="#">Major Asian Electronics 5</a></li>
            <li><a href="#">Major Asian Electronics 5</a></li>
        </ul>    -->
        <div class="sub_menu sub_menu-5">
            <ul class="row cf">
                <li><a href="#">簡介</a></li>
                <li><a href="#">展覽概覽</a></li>
                <li><a href="#">參展商名單</a></li>
                <li><a href="#">展覽廳切面圖</a></li>
            </ul>
            <ul class="row cf">
                <li><a href="#">研討會及活動程序</a></li>
                <li><a href="#">旅遊支援</a></li>
                <li><a href="#">免費穿梭巴士服務</a></li>
                <li><a href="#">照片廊(上屆展覽)</a></li>
            </ul>
            <ul class="row cf">
                <li><a href="#">上屆展覽資料</a></li>
                <li><a href="#">亞洲區主要電子展覽會</a></li>
                <li><a href="#">香港貿發局展覽視頻</a></li>
                <li><a href="#">聯絡我們</a></li>
            </ul>
            <ul class="row cf">
                <li><a href="#">查詢</a></li>
            </ul> 
        </div>
        <a href="#design" class="btn_nav_bar" data-sub-menu="sub_menu-6">設計比賽<i class="icon icon-arrow-white-right mobile-only"></i></a>
        <a href="#news" class="btn_nav_bar" data-sub-menu="sub_menu-7">電郵通訊<i class="icon icon-arrow-white-right mobile-only"></i></a>
        <a href="#other" class="btn_nav_bar">其他貿發局展覽會</a>
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