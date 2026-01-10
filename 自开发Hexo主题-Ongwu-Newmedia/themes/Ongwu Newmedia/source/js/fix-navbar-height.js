// 强制设置移动端导航栏高度
(function() {
  // 等待DOM加载完成
  document.addEventListener('DOMContentLoaded', function() {
    // 检测窗口尺寸变化
    function updateNavbarHeight() {
      // 移动设备检测 (宽度小于等于768px)
      if (window.innerWidth <= 768) {
        // 获取导航栏相关元素
        const navbar = document.querySelector('.navbar');
        const navbarContainer = document.querySelector('.container.navbar-container');
        const navbarBrand = document.querySelector('.navbar-brand');
        const navbarRight = document.querySelector('.navbar-right');
        const logoText = document.querySelector('.logo-text');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        const body = document.body;
        const mainContent = document.querySelector('.main-content');
        
        // 强制设置高度为48px
        if (navbar) {
          navbar.style.height = '48px';
          navbar.style.minHeight = '48px';
          navbar.style.maxHeight = '48px';
        }
        
        if (navbarContainer) {
          navbarContainer.style.height = '48px';
          navbarContainer.style.minHeight = '48px';
          navbarContainer.style.maxHeight = '48px';
          navbarContainer.style.alignItems = 'center';
        }
        
        if (navbarBrand) {
          navbarBrand.style.height = '48px';
          navbarBrand.style.minHeight = '48px';
          navbarBrand.style.maxHeight = '48px';
        }
        
        if (navbarRight) {
          navbarRight.style.height = '48px';
          navbarRight.style.minHeight = '48px';
          navbarRight.style.maxHeight = '48px';
          navbarRight.style.alignItems = 'center';
        }
        
        if (logoText) {
          logoText.style.fontSize = '16px';
          logoText.style.lineHeight = '48px';
        }
        
        if (mobileMenuBtn) {
          mobileMenuBtn.style.margin = '0 5px';
        }
        
        if (mobileMenu) {
          mobileMenu.style.top = '48px';
        }
        
        if (body) {
          body.style.marginTop = '48px';
        }
        
        if (mainContent) {
          mainContent.style.marginTop = '55px';
        }
      }
    }
    
    // 初始执行一次
    updateNavbarHeight();
    
    // 监听窗口尺寸变化
    window.addEventListener('resize', updateNavbarHeight);
  });
})();