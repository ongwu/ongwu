// 主要 JavaScript 功能

document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    initSearch();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 响应式菜单
    initResponsiveMenu();
});

// 搜索功能初始化
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

// 执行搜索
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        // 简单的客户端搜索实现
        const posts = document.querySelectorAll('.post-item');
        let found = false;
        
        posts.forEach(function(post) {
            const title = post.querySelector('.post-title a').textContent.toLowerCase();
            const content = post.querySelector('.post-preview').textContent.toLowerCase();
            
            if (title.includes(query.toLowerCase()) || content.includes(query.toLowerCase())) {
                post.style.display = 'block';
                found = true;
            } else {
                post.style.display = 'none';
            }
        });
        
        if (!found) {
            showNoResults();
        }
    } else {
        // 显示所有文章
        const posts = document.querySelectorAll('.post-item');
        posts.forEach(function(post) {
            post.style.display = 'block';
        });
        hideNoResults();
    }
}

// 显示无结果提示
function showNoResults() {
    let noResults = document.getElementById('no-results');
    if (!noResults) {
        noResults = document.createElement('div');
        noResults.id = 'no-results';
        noResults.className = 'no-results';
        noResults.innerHTML = '<p>未找到相关文章</p>';
        document.querySelector('.posts-container').appendChild(noResults);
    }
    noResults.style.display = 'block';
}

// 隐藏无结果提示
function hideNoResults() {
    const noResults = document.getElementById('no-results');
    if (noResults) {
        noResults.style.display = 'none';
    }
}

// 平滑滚动初始化
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 响应式菜单初始化
function initResponsiveMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (!mobileMenuToggle || !sidebar) {
        return;
    }
    
    // 确保只绑定一次事件监听器
    if (mobileMenuToggle.hasAttribute('data-listener-bound')) {
        return;
    }
    
    // 移动端菜单切换功能
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = sidebar.classList.contains('active');
        
        if (isActive) {
            // 关闭菜单
            mobileMenuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            // 打开菜单
            mobileMenuToggle.classList.add('active');
            sidebar.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
    
    // 点击侧边栏外部关闭菜单
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !mobileMenuToggle.contains(e.target)) {
            
            mobileMenuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 点击侧边栏链接关闭菜单
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // 处理窗口大小变化
    const handleResize = debounce(function() {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.style.overflow = '';
        }
    }, 250);
    
    window.addEventListener('resize', handleResize);
    
    // 标记已绑定事件监听器
    mobileMenuToggle.setAttribute('data-listener-bound', 'true');
    
    // 确保汉堡菜单在移动端可见
    if (window.innerWidth <= 768) {
        mobileMenuToggle.style.display = 'flex';
        // 确保侧边栏默认隐藏
        sidebar.style.display = 'none';
        
        // 确保主内容区显示
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.style.width = '100%';
        }
    }
    
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 窗口大小改变时的处理
window.addEventListener('resize', debounce(function() {
    // 重新初始化响应式功能
    initResponsiveMenu();
}, 250));
