// 返回顶部功能实现
(function() {
  'use strict';
  
  // 返回顶部按钮类
  const BackToTop = {
    // 配置项
  config: {
    // 显示返回顶部按钮的滚动距离阈值
    scrollThreshold: 500,
    // 动画持续时间（毫秒）
    animationDuration: 300,
    // 按钮ID
    buttonId: 'back-to-top',
    // 按钮图标 - 使用Font Awesome 6语法
    buttonIcon: '<i class="fas fa-arrow-up"></i>',
    // 按钮可见性过渡动画持续时间
    visibilityTransitionDuration: 300,
    // 是否在滚动时隐藏导航栏
    autoHideNavbar: true,
    // 滚动隐藏导航栏的阈值
    navbarHideThreshold: 100,
    // 导航栏选择器
    navbarSelector: '.navbar'
  },
    
    // 初始化函数
    init: function(options) {
      // 合并用户配置
      if (options) {
        Object.assign(this.config, options);
      }
      
      // 创建返回顶部按钮
      this.createButton();
      
      // 添加滚动事件监听
      this.addScrollListeners();
      
      // 添加点击事件监听
      this.addClickListeners();
      
      // 初始检查滚动位置
      this.checkScrollPosition();
    },
    
    // 创建返回顶部按钮
    createButton: function() {
      // 检查按钮是否已存在
      if (document.getElementById(this.config.buttonId)) {
        this.button = document.getElementById(this.config.buttonId);
        return;
      }
      
      // 创建按钮元素
      this.button = document.createElement('button');
      this.button.id = this.config.buttonId;
      this.button.className = 'back-to-top-btn';
      this.button.innerHTML = this.config.buttonIcon;
      this.button.setAttribute('aria-label', '返回顶部');
      this.button.setAttribute('title', '返回顶部');
      this.button.style.display = 'none';
      
      // 添加到页面
      document.body.appendChild(this.button);
      
      // 添加基础CSS样式
      this.addStyles();
    },
    
    // 添加基础CSS样式
    addStyles: function() {
      const style = document.createElement('style');
      style.textContent = `
        .back-to-top-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background-color: #4285f4;
          color: white;
          border: none;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          z-index: 999;
          opacity: 0;
          visibility: hidden;
        }
        
        .back-to-top-btn.visible {
          opacity: 1;
          visibility: visible;
        }
        
        .back-to-top-btn:hover {
          background-color: #3367d6;
          transform: translateY(-3px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }
        
        .back-to-top-btn:active {
          transform: translateY(0);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .back-to-top-btn.fade-in {
          animation: fadeIn 0.3s ease forwards;
        }
        
        .back-to-top-btn.fade-out {
          animation: fadeOut 0.3s ease forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        
        /* 响应式设计 */
        @media (max-width: 768px) {
          .back-to-top-btn {
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
        }
      `;
      
      document.head.appendChild(style);
    },
    
    // 添加滚动事件监听
    addScrollListeners: function() {
      let lastScrollTop = 0;
      
      window.addEventListener('scroll', function() {
        // 检查返回顶部按钮的显示/隐藏状态
        this.checkScrollPosition();
        
        // 如果启用了自动隐藏导航栏功能
        if (this.config.autoHideNavbar) {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const navbar = document.querySelector(this.config.navbarSelector);
          
          if (navbar) {
            // 向下滚动超过阈值时隐藏导航栏
            if (scrollTop > lastScrollTop && scrollTop > this.config.navbarHideThreshold) {
              navbar.style.transform = 'translateY(-100%)';
            } else {
              // 向上滚动时显示导航栏
              navbar.style.transform = 'translateY(0)';
            }
          }
          
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }
      }.bind(this));
    },
    
    // 添加点击事件监听
    addClickListeners: function() {
      this.button.addEventListener('click', function() {
        this.scrollToTop();
      }.bind(this));
    },
    
    // 检查滚动位置，控制按钮的显示/隐藏
    checkScrollPosition: function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > this.config.scrollThreshold) {
        this.showButton();
      } else {
        this.hideButton();
      }
    },
    
    // 显示返回顶部按钮
    showButton: function() {
      if (!this.button.classList.contains('visible')) {
        // 移除淡出动画类
        this.button.classList.remove('fade-out');
        // 添加显示类和淡入动画类
        this.button.classList.add('visible', 'fade-in');
      }
    },
    
    // 隐藏返回顶部按钮
    hideButton: function() {
      if (this.button.classList.contains('visible')) {
        // 移除淡入动画类和显示类
        this.button.classList.remove('fade-in', 'visible');
        // 添加淡出动画类
        this.button.classList.add('fade-out');
        
        // 动画结束后完全隐藏按钮
        setTimeout(function() {
          this.button.classList.remove('fade-out');
        }.bind(this), this.config.visibilityTransitionDuration);
      }
    },
    
    // 平滑滚动到顶部
    scrollToTop: function() {
      const start = window.pageYOffset || document.documentElement.scrollTop;
      const startTime = performance.now();
      
      // 使用requestAnimationFrame实现平滑滚动
      function scroll(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / this.config.animationDuration, 1);
        // 使用缓动函数使滚动更加自然
        const easeProgress = this.easeOutQuart(progress);
        
        window.scrollTo(0, start * (1 - easeProgress));
        
        if (progress < 1) {
          requestAnimationFrame(scroll.bind(this));
        } else {
          // 滚动完成后触发回调
          this.onScrollComplete();
        }
      }
      
      requestAnimationFrame(scroll.bind(this));
    },
    
    // 缓动函数 - 四次方缓出
    easeOutQuart: function(t) {
      return 1 - Math.pow(1 - t, 4);
    },
    
    // 滚动完成后的回调函数
    onScrollComplete: function() {
      // 触发自定义事件
      const scrollCompleteEvent = new CustomEvent('backToTopComplete');
      window.dispatchEvent(scrollCompleteEvent);
    },
    
    // 手动显示返回顶部按钮
    show: function() {
      this.showButton();
    },
    
    // 手动隐藏返回顶部按钮
    hide: function() {
      this.hideButton();
    },
    
    // 更新配置
    updateConfig: function(options) {
      if (options) {
        Object.assign(this.config, options);
        this.checkScrollPosition();
      }
    }
  };
  
  // 将BackToTop对象暴露给全局作用域
  window.BackToTop = BackToTop;
  
  // DOM加载完成后初始化返回顶部功能
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // 检查页面是否已经有返回顶部按钮的配置
      if (typeof theme !== 'undefined' && theme.back2top) {
        BackToTop.init(theme.back2top);
      } else {
        // 使用默认配置初始化
        BackToTop.init();
      }
    });
  } else {
    // DOM已经加载完成
    if (typeof theme !== 'undefined' && theme.back2top) {
      BackToTop.init(theme.back2top);
    } else {
      BackToTop.init();
    }
  }
  
  // 支持CommonJS模块导出
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = BackToTop;
  }
})();