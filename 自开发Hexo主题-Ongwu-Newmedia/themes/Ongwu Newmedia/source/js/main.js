// 等待DOM加载完成
$(document).ready(function() {
  // 移动端菜单切换
  $('.mobile-menu-btn').on('click', function() {
    $('.mobile-menu').toggleClass('active');
    
    // 切换图标
    const icon = $(this).find('i');
    if (icon.hasClass('fa-bars')) {
      icon.removeClass('fa-bars').addClass('fa-times');
    } else {
      icon.removeClass('fa-times').addClass('fa-bars');
    }
  });
  
  // 点击移动端菜单项后关闭菜单
  $('.mobile-menu a').on('click', function() {
    $('.mobile-menu').removeClass('active');
    $('.mobile-menu-btn i').removeClass('fa-times').addClass('fa-bars');
  });
  
  // 返回顶部按钮
  const backToTopBtn = $('#back-to-top');
  
  // 导航栏静态固定
  $(document).ready(function() {
    $('body').addClass('header-fixed');
  });
  
  // 监听滚动显示/隐藏返回顶部按钮
  $(window).on('scroll', function() {
    if ($(window).scrollTop() > 500) {
      backToTopBtn.fadeIn();
    } else {
      backToTopBtn.fadeOut();
    }
  });
  
  // 点击返回顶部
  backToTopBtn.on('click', function() {
    $('html, body').animate({scrollTop: 0}, 300);
  });
  

  
  // 点赞功能
  const likeBtn = $('.like-btn');
  
  if (likeBtn.length > 0) {
    likeBtn.on('click', function() {
      const $this = $(this);
      const likeCount = $this.find('.like-count');
      
      // 检查是否已经点赞
      if ($this.hasClass('liked')) {
        // 取消点赞
        $this.removeClass('liked');
        $this.find('.like-text').text('点赞');
        $this.find('i').removeClass('fas').addClass('far');
        
        // 减少点赞数
        let count = parseInt(likeCount.text().replace(/\D/g, ''));
        count = Math.max(0, count - 1);
        likeCount.text('(' + count + ')');
        
        // 保存到localStorage
        localStorage.setItem('post_' + window.location.pathname, 'false');
      } else {
        // 点赞
        $this.addClass('liked');
        $this.addClass('active');
        $this.find('.like-text').text('已点赞');
        $this.find('i').removeClass('far').addClass('fas');
        
        // 增加点赞数
        let count = parseInt(likeCount.text().replace(/\D/g, ''));
        count += 1;
        likeCount.text('(' + count + ')');
        
        // 保存到localStorage
        localStorage.setItem('post_' + window.location.pathname, 'true');
        
        // 移除active类，以便下次点击时可以再次触发动画
        setTimeout(function() {
          $this.removeClass('active');
        }, 300);
      }
    });
    
    // 检查localStorage中是否有点赞记录
    const postKey = 'post_' + window.location.pathname;
    const isLiked = localStorage.getItem(postKey);
    
    if (isLiked === 'true') {
      likeBtn.addClass('liked');
      likeBtn.find('.like-text').text('已点赞');
      likeBtn.find('i').removeClass('far').addClass('fas');
    }
  }
  
  // 图片懒加载
  if (typeof theme !== 'undefined' && theme.lazyload && theme.lazyload.enable) {
    // 简单的图片懒加载实现
    const lazyImages = document.querySelectorAll('img.lazy');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const image = entry.target;
            image.src = image.dataset.src;
            image.classList.add('lazy-loaded');
            imageObserver.unobserve(image);
          }
        });
      });
      
      lazyImages.forEach(function(image) {
        imageObserver.observe(image);
      });
    } else {
      // 降级处理
      let lazyLoadThrottleTimeout;
      
      function lazyLoad() {
        if (lazyLoadThrottleTimeout) {
          clearTimeout(lazyLoadThrottleTimeout);
        }
        
        lazyLoadThrottleTimeout = setTimeout(function() {
          const scrollTop = window.pageYOffset;
          
          lazyImages.forEach(function(img) {
            if (img.offsetTop < (window.innerHeight + scrollTop)) {
              img.src = img.dataset.src;
              img.classList.add('lazy-loaded');
            }
          });
          
          if (lazyImages.length === 0) {
            document.removeEventListener('scroll', lazyLoad);
            window.removeEventListener('resize', lazyLoad);
            window.removeEventListener('orientationchange', lazyLoad);
          }
        }, 20);
      }
      
      document.addEventListener('scroll', lazyLoad);
      window.addEventListener('resize', lazyLoad);
      window.addEventListener('orientationchange', lazyLoad);
      
      // 初始加载
      lazyLoad();
    }
  }
  
  // 标签随机颜色
  function randomTagColors() {
    const tags = document.querySelectorAll('.tag-link');
    const colorCount = 10; // 颜色数量
    
    tags.forEach(function(tag) {
      // 随机选择一个颜色类
      const randomColor = Math.floor(Math.random() * colorCount) + 1;
      tag.classList.add('tag-color-' + randomColor);
    });
  }
  
  // 初始化标签颜色
  randomTagColors();
  
  // 平滑滚动
  $('a[href^="#"]').on('click', function(event) {
    event.preventDefault();
    
    const targetId = $(this).attr('href');
    if (targetId === '#') return;
    
    const targetElement = $(targetId);
    if (targetElement.length) {
      $('html, body').animate({
        scrollTop: targetElement.offset().top - 70 // 减去导航栏高度
      }, 500);
    }
  });
  
  // 页面切换动画
  if (typeof theme !== 'undefined' && theme.animation && theme.animation.page_transition) {
    // 创建页面过渡元素
    const pageTransition = $('<div class="page-transition"></div>');
    $('body').append(pageTransition);
    
    // 页面加载时的动画
    setTimeout(function() {
      pageTransition.addClass('fade-out');
      setTimeout(function() {
        pageTransition.removeClass('active fade-out');
      }, 600);
    }, 100);
    
    // 监听页面链接点击
    $('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])').on('click', function(e) {
      const href = $(this).attr('href');
      
      // 检查是否为当前站点链接
      if (href && !href.startsWith('http')) {
        e.preventDefault();
        
        // 显示过渡动画
        pageTransition.addClass('active');
        
        // 延迟跳转
        setTimeout(function() {
          window.location.href = href;
        }, 300);
      }
    });
  }
  
  // 搜索功能增强
  const searchButton = $('#search-button');
  const headerSearchForm = $('.header-search-form');
  const searchInput = headerSearchForm.find('.search-input');
  const searchForm = $('.search-form');
  
  // 点击搜索按钮显示搜索输入框
  if (searchButton.length > 0 && searchInput.length > 0) {
    searchButton.on('click', function(e) {
      if (searchInput.is(':hidden')) {
        e.preventDefault();
        searchInput.show();
        searchInput.focus();
        headerSearchForm.addClass('expanded');
      }
    });
    
    // 点击页面其他地方隐藏搜索输入框
    $(document).on('click', function(e) {
      if (!headerSearchForm.is(e.target) && headerSearchForm.has(e.target).length === 0) {
        if (searchInput.is(':visible')) {
          searchInput.hide();
          headerSearchForm.removeClass('expanded');
        }
      }
    });
  }
  
  // 处理搜索表单提交
  if (searchForm.length > 0) {
    searchForm.on('submit', function(e) {
      e.preventDefault(); // 始终阻止表单提交到/search路径
      
      const searchInput = $(this).find('input[id="searchInput"]');
      const searchValue = searchInput.val().trim();
      
      // 检查搜索内容是否为空
      if (searchValue === '') {
        searchInput.addClass('error');
        
        // 添加抖动动画
        searchInput.animate({left: '-10px'}, 50)
          .animate({left: '10px'}, 50)
          .animate({left: '-10px'}, 50)
          .animate({left: '10px'}, 50)
          .animate({left: '0'}, 50);
        
        // 移除错误类
        setTimeout(function() {
          searchInput.removeClass('error');
        }, 1000);
      } else {
        // 调用searchFunc函数处理搜索
        if (typeof searchFunc === 'function') {
          searchFunc();
        }
      }
    });
    
    // 输入时移除错误类
    searchForm.find('.search-input').on('input', function() {
      $(this).removeClass('error');
    });
  }
  
  // 分享到微信功能
  const shareWechat = $('.share-wechat');
  
  if (shareWechat.length > 0) {
    shareWechat.on('click', function() {
      // 创建分享弹窗
      const shareModal = $('<div class="share-modal"></div>');
      const shareContent = $('<div class="share-content"><h3>分享到微信</h3><p>请使用微信扫描下方二维码分享本文</p><div class="qr-code">二维码图片</div><p>或点击右上角「...」分享给朋友</p></div>');
      const closeBtn = $('<button class="close-btn">&times;</button>');
      
      shareModal.append(shareContent);
      shareModal.append(closeBtn);
      $('body').append(shareModal);
      
      // 显示弹窗
      setTimeout(function() {
        shareModal.addClass('active');
      }, 10);
      
      // 关闭弹窗
      closeBtn.on('click', function() {
        shareModal.removeClass('active');
        setTimeout(function() {
          shareModal.remove();
        }, 300);
      });
      
      // 点击弹窗外部关闭
      shareModal.on('click', function(e) {
        if (e.target === shareModal[0]) {
          closeBtn.trigger('click');
        }
      });
    });
  }
  
  // 代码高亮增强
  if (typeof hljs !== 'undefined') {
    // 自动应用代码高亮
    hljs.highlightAll();
    
    // 添加复制代码按钮
    $('pre code').each(function() {
      const codeBlock = $(this).closest('pre');
      const copyBtn = $('<button class="copy-code-btn" title="复制代码"><i class="far fa-copy"></i></button>');
      
      codeBlock.append(copyBtn);
      
      copyBtn.on('click', function() {
        const codeText = $(this).siblings('code').text();
        
        // 使用现代的Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(codeText).then(function() {
            copyBtn.html('<i class="fas fa-check"></i>');
            setTimeout(function() {
              copyBtn.html('<i class="far fa-copy"></i>');
            }, 2000);
          });
        } else {
          // 降级处理
          const textArea = document.createElement('textarea');
          textArea.value = codeText;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          textArea.style.top = '-999999px';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
            document.execCommand('copy');
            copyBtn.html('<i class="fas fa-check"></i>');
          } catch (err) {
            console.error('复制失败:', err);
          }
          
          document.body.removeChild(textArea);
          
          setTimeout(function() {
            copyBtn.html('<i class="far fa-copy"></i>');
          }, 2000);
        }
      });
    });
  }
  
  // 响应式表格处理
  const responsiveTables = $('.post-content table, .page-content table');
  
  if (responsiveTables.length > 0) {
    responsiveTables.each(function() {
      const tableWrapper = $('<div class="table-wrapper"></div>');
      $(this).wrap(tableWrapper);
    });
  }
  
  // 添加平滑滚动到页面锚点
  if (window.location.hash) {
    const hash = window.location.hash;
    const targetElement = $(hash);
    
    if (targetElement.length) {
      setTimeout(function() {
        $('html, body').animate({
          scrollTop: targetElement.offset().top - 70 // 减去导航栏高度
        }, 500);
      }, 100);
    }
  }
  
  // 窗口大小变化时的处理
  $(window).on('resize', function() {
    // 当窗口大小变化到桌面模式时，关闭移动端菜单
    if ($(window).width() >= 768) {
      $('.mobile-menu').removeClass('active');
      $('.mobile-menu-btn i').removeClass('fa-times').addClass('fa-bars');
    }
  });
});