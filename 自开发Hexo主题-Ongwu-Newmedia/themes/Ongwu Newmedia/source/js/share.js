// 社交媒体分享功能实现
(function() {
  'use strict';
  
  // 分享功能类
  const ShareSystem = {
    // 配置项
    config: {
      // 支持的社交平台
      platforms: [
        'wechat',
        'weibo',
        'twitter',
        'facebook',
        'linkedin',
        'copyLink'
      ],
      // 分享按钮的选择器
      buttonSelector: '.share-btn',
      // 分享模态框的选择器
      modalSelector: '.share-modal',
      // 微信二维码容器的选择器
      qrCodeSelector: '.qr-code',
      // 是否在新窗口中打开分享链接
      openInNewTab: true,
      // 复制链接后的提示持续时间（毫秒）
      copyLinkToastDuration: 2000,
      // 微信分享模态框的关闭按钮选择器
      closeButtonSelector: '.close-btn',
      // 微信分享模态框的背景选择器
      modalBackgroundSelector: '.share-modal'
    },
    
    // 初始化函数
    init: function(options) {
      // 合并用户配置
      if (options) {
        Object.assign(this.config, options);
      }
      
      // 添加分享按钮的点击事件监听
      this.addShareButtonListeners();
      
      // 添加复制链接功能
      this.addCopyLinkFunctionality();
      
      // 添加微信分享模态框处理
      this.addWechatModalHandling();
    },
    
    // 获取当前页面信息用于分享
    getPageInfo: function() {
      const title = document.title || '';
      const url = window.location.href;
      const description = document.querySelector('meta[name="description"]') ? 
        document.querySelector('meta[name="description"]').getAttribute('content') : '';
      const image = document.querySelector('meta[property="og:image"]') ? 
        document.querySelector('meta[property="og:image"]').getAttribute('content') : '';
      
      return {
        title: title,
        url: url,
        description: description,
        image: image
      };
    },
    
    // 根据平台生成分享链接
    generateShareLink: function(platform, pageInfo) {
      const encodedTitle = encodeURIComponent(pageInfo.title);
      const encodedUrl = encodeURIComponent(pageInfo.url);
      const encodedDesc = encodeURIComponent(pageInfo.description);
      const encodedImage = encodeURIComponent(pageInfo.image);
      
      switch (platform) {
        case 'weibo':
          return `http://service.weibo.com/share/share.php?url=${encodedUrl}&title=${encodedTitle}&pic=${encodedImage}`;
        case 'twitter':
          return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
        case 'facebook':
          return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        case 'linkedin':
          return `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDesc}`;
        default:
          return pageInfo.url;
      }
    },
    
    // 打开分享链接
    openShareLink: function(url) {
      if (this.config.openInNewTab) {
        window.open(url, '_blank', 'width=600,height=400,toolbar=0,menubar=0,scrollbars=yes');
      } else {
        window.location.href = url;
      }
    },
    
    // 添加分享按钮的点击事件监听
    addShareButtonListeners: function() {
      const shareButtons = document.querySelectorAll(this.config.buttonSelector);
      
      shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
          const platform = this.getAttribute('data-platform');
          
          if (platform && this.config.platforms.includes(platform)) {
            if (platform === 'wechat') {
              // 微信分享特殊处理
              this.showWechatModal();
            } else if (platform === 'copyLink') {
              // 复制链接特殊处理
              this.copyCurrentLink();
            } else {
              // 其他平台的分享处理
              const pageInfo = this.getPageInfo();
              const shareLink = this.generateShareLink(platform, pageInfo);
              this.openShareLink(shareLink);
            }
          }
        }.bind(this));
      });
    },
    
    // 显示微信分享模态框
    showWechatModal: function() {
      const modal = document.querySelector(this.config.modalSelector);
      
      if (modal) {
        // 生成二维码（实际项目中应该调用二维码生成API）
        this.generateQRCode();
        
        // 显示模态框
        modal.style.display = 'flex';
        setTimeout(() => {
          modal.classList.add('active');
        }, 10);
        
        // 阻止背景滚动
        document.body.style.overflow = 'hidden';
      }
    },
    
    // 隐藏微信分享模态框
    hideWechatModal: function() {
      const modal = document.querySelector(this.config.modalSelector);
      
      if (modal && modal.classList.contains('active')) {
        modal.classList.remove('active');
        
        // 动画结束后完全隐藏
        setTimeout(() => {
          modal.style.display = 'none';
          // 恢复背景滚动
          document.body.style.overflow = '';
        }, 300);
      }
    },
    
    // 生成二维码（模拟实现）
    generateQRCode: function() {
      const qrCodeContainer = document.querySelector(this.config.qrCodeSelector);
      const pageUrl = window.location.href;
      
      if (qrCodeContainer) {
        // 实际项目中，这里应该调用二维码生成API
        // 这里仅做演示，显示当前页面URL
        qrCodeContainer.innerHTML = `
          <div class="qr-code-placeholder">
            <div class="qr-code-content">
              <div class="qr-code-pattern"></div>
              <div class="qr-code-text">扫描分享</div>
            </div>
            <p class="qr-code-hint">当前页面URL: ${pageUrl}</p>
          </div>
        `;
        
        // 添加二维码样式
        this.addQRCodeStyles();
      }
    },
    
    // 添加二维码样式
    addQRCodeStyles: function() {
      // 检查样式是否已存在
      if (document.getElementById('qr-code-styles')) {
        return;
      }
      
      const style = document.createElement('style');
      style.id = 'qr-code-styles';
      style.textContent = `
        .qr-code-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .qr-code-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .qr-code-pattern {
          width: 160px;
          height: 160px;
          background-color: #fff;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-bottom: 10px;
        }
        
        .qr-code-pattern::before {
          content: '';
          position: absolute;
          width: 140px;
          height: 140px;
          background: 
            linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%, #333),
            linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%, #333);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
          opacity: 0.1;
        }
        
        .qr-code-text {
          font-size: 14px;
          color: #666;
          margin-bottom: 10px;
        }
        
        .qr-code-hint {
          font-size: 12px;
          color: #999;
          text-align: center;
          margin: 10px 0 0 0;
          max-width: 200px;
          word-break: break-all;
        }
      `;
      
      document.head.appendChild(style);
    },
    
    // 复制当前页面链接
    copyCurrentLink: function() {
      const pageUrl = window.location.href;
      
      // 使用现代的Clipboard API
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(pageUrl).then(() => {
          this.showCopyLinkToast();
        }).catch(err => {
          console.error('复制失败:', err);
          // 降级处理
          this.fallbackCopyLink(pageUrl);
        });
      } else {
        // 降级处理
        this.fallbackCopyLink(pageUrl);
      }
    },
    
    // 降级复制链接方法
    fallbackCopyLink: function(url) {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      
      // 放置在屏幕外
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        if (successful) {
          this.showCopyLinkToast();
        }
      } catch (err) {
        console.error('降级复制也失败了:', err);
      }
      
      document.body.removeChild(textArea);
    },
    
    // 显示复制链接成功提示
    showCopyLinkToast: function() {
      // 检查提示是否已存在
      let toast = document.getElementById('copy-link-toast');
      
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'copy-link-toast';
        toast.className = 'copy-link-toast';
        document.body.appendChild(toast);
        
        // 添加提示样式
        this.addToastStyles();
      }
      
      toast.textContent = '链接已复制！';
      toast.classList.add('active');
      
      // 一段时间后隐藏提示
      setTimeout(() => {
        toast.classList.remove('active');
      }, this.config.copyLinkToastDuration);
    },
    
    // 添加提示样式
    addToastStyles: function() {
      const style = document.createElement('style');
      style.textContent = `
        .copy-link-toast {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 12px 20px;
          border-radius: 4px;
          font-size: 14px;
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }
        
        .copy-link-toast.active {
          opacity: 1;
          visibility: visible;
        }
      `;
      
      document.head.appendChild(style);
    },
    
    // 添加微信分享模态框处理
    addWechatModalHandling: function() {
      // 关闭按钮点击事件
      const closeButtons = document.querySelectorAll(this.config.closeButtonSelector);
      closeButtons.forEach(button => {
        button.addEventListener('click', function() {
          this.hideWechatModal();
        }.bind(this));
      });
      
      // 点击模态框背景关闭
      const modalBackgrounds = document.querySelectorAll(this.config.modalBackgroundSelector);
      modalBackgrounds.forEach(background => {
        background.addEventListener('click', function(e) {
          if (e.target === background) {
            this.hideWechatModal();
          }
        }.bind(this));
      });
      
      // ESC键关闭模态框
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          this.hideWechatModal();
        }
      }.bind(this));
    },
    
    // 手动触发分享
    share: function(platform) {
      if (platform && this.config.platforms.includes(platform)) {
        if (platform === 'wechat') {
          this.showWechatModal();
        } else if (platform === 'copyLink') {
          this.copyCurrentLink();
        } else {
          const pageInfo = this.getPageInfo();
          const shareLink = this.generateShareLink(platform, pageInfo);
          this.openShareLink(shareLink);
        }
      }
    },
    
    // 更新配置
    updateConfig: function(options) {
      if (options) {
        Object.assign(this.config, options);
        // 重新初始化分享按钮监听
        this.addShareButtonListeners();
      }
    }
  };
  
  // 将ShareSystem对象暴露给全局作用域
  window.ShareSystem = ShareSystem;
  
  // DOM加载完成后初始化分享功能
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // 检查页面是否已经有分享功能的配置
      if (typeof theme !== 'undefined' && theme.share) {
        ShareSystem.init(theme.share);
      } else {
        // 使用默认配置初始化
        ShareSystem.init();
      }
    });
  } else {
    // DOM已经加载完成
    if (typeof theme !== 'undefined' && theme.share) {
      ShareSystem.init(theme.share);
    } else {
      ShareSystem.init();
    }
  }
  
  // 支持CommonJS模块导出
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShareSystem;
  }
})();