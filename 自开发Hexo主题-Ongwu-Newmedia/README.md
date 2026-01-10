## Ongwu Newmedia 主题说明

### 示例demo ： https://ongwu.cn
<img width="1905" height="1123" alt="www ongwu cn_" src="https://github.com/user-attachments/assets/4852fc66-72c8-4ae6-860d-676305624214" />


###  主题简介

Ongwu Newmedia 是一款专为 Hexo 博客平台设计的现代化响应式主题，特别适合 Windows 技术分享类博客使用。该主题具有简洁美观的界面、丰富的功能和良好的用户体验。

###  功能特点

#### 1. 响应式设计
- 完全适配桌面端、平板和移动设备
- 移动端优化的布局和交互体验
- 自适应的侧边栏和内容区域

#### 2. 视觉设计
- 简洁现代的UI设计
- 可自定义的颜色方案
- 精美的Banner幻灯片展示
- 流畅的动画过渡效果
- 清晰的排版层次结构

#### 3. 核心功能
- **博客内容展示**：支持文章、页面、分类、标签等标准功能
- **侧边栏小部件**：包含热门文章、标签云、社交媒体链接、友情链接等
- **评论系统**：集成 Waline 评论系统
- **搜索功能**：支持站内搜索
- **返回顶部按钮**：方便长页面浏览
- **RSS订阅**：支持内容订阅
- **代码高亮**：优化的代码显示效果
- **网站运行时间统计**：实时显示网站运行时长

### 主题结构

```
themes/Ongwu Newmedia/
├── _config.yml         # 主题配置文件
├── layout/             # 布局文件
│   ├── _partial/       # 部分模板
│   ├── layout.ejs      # 主布局文件
│   ├── index.ejs       # 首页模板
│   ├── post.ejs        # 文章页面模板
│   ├── page.ejs        # 独立页面模板
│   └── ...
└── source/             # 静态资源文件
    ├── css/            # 样式文件
    ├── images/         # 图片资源
    └── js/             # JavaScript文件
```

### 主题配置

#### 基础设置

在 `_config.yml` 文件中可以配置以下内容：

1. **网站基础设置**
   ```yaml
   favicon: /favicon.ico
   logo:
     enable: false
     path: /images/logo.svg
   ```

2. **Banner幻灯片设置**
   ```yaml
   banner:
     enable: true
     slides:
       - image: /images/banner1.jpg
         description: Windows Server 2022 新功能详解
         link: /archives/2025/10/windows-server-2022-new-features
       # 更多幻灯片...
   ```

3. **网站信息**
   ```yaml
   site:
     title: Windows 极客
     subtitle: Windows 技术分享平台
     description: 专注于 Windows 系统、软件、技巧的极客知识分享平台
     keywords: Windows, 极客, 技术, 技巧, 教程, 软件, 系统优化
     author: Ongwu
     language: zh-CN
   ```

#### 主题功能设置

1. **颜色方案**
   ```yaml
   theme_settings:
     color_scheme:
       primary: '#3e61f9'
       secondary: '#6c757d'
       accent: '#3e61f9'
       background: '#ffffff'
       text: '#333333'
       text_secondary: '#666666'
       border: '#eaeaea'
       hover: '#2a40b9'
   ```

2. **布局设置**
   ```yaml
   theme_settings:
     layout:
       width: '1200px'
       sidebar_width: '300px'
       content_width: '860px'
     sidebar:
       show: true
       position: 'right' # left or right
       show_on_home: true
       show_on_post: true
       show_on_page: true
   ```

3. **导航栏设置**
   ```yaml
   theme_settings:
     navbar:
       fixed: true
       show_logo: false
       show_title: true
       menu:
         "Windows server": '/categories/Windows-server/'
         "网站留言": '/comment/'
       mobile_menu: true
   ```

4. **侧边栏小部件**
   ```yaml
   theme_settings:
     sidebar:
       widgets:
         search: true
         recent_posts: true
         popular_posts: true
         categories: true
         tags: true
         archives: true
         social: true
         links: true
   ```

5. **评论系统**
   ```yaml
   theme_settings:
     comment:
       enable: true
       type: 'waline'
       waline:
         serverURL: 'https://comment.ongwu.cn/'
         placeholder: '欢迎留言...'
         # 更多配置...
   ```

### 特殊功能说明

#### 标签云

主题支持在侧边栏显示标签云，并自动根据标签下的文章数量调整标签大小。标签云显示格式为："标签名 (文章数量)"。

#### 热门文章

侧边栏会显示最新的10篇热门文章列表。

#### 返回顶部按钮

当页面滚动超过指定距离时，右下角会显示返回顶部按钮，点击后平滑滚动到页面顶部。

#### 网站运行时间统计

页脚会实时显示网站的运行时长，从2025年10月1日开始计算。

#### 响应式优化

主题针对不同设备进行了专门优化：
- 在移动设备上自动调整布局
- 优化图片显示
- 适配小屏幕的导航体验

### 使用方法

1. 将主题文件夹复制到 Hexo 博客的 `themes` 目录下
2. 在博客的 `_config.yml` 文件中设置 `theme: Ongwu Newmedia`
3. 根据需要修改主题目录下的 `_config.yml` 配置文件
4. 运行 `hexo clean && hexo g && hexo s` 启动本地服务器查看效果

### 主题特色

1. **Windows 技术风格**：专为 Windows 技术内容定制的配色和布局
2. **现代化设计**：采用最新的设计趋势和用户体验标准
3. **性能优化**：优化的资源加载和渲染性能
4. **扩展性强**：支持多种第三方服务和插件集成
5. **用户友好**：直观的界面和便捷的操作体验

### 更新日志

- 初始版本：完成主题基础功能开发
- 支持标签云显示文章数量
- 优化移动端显示效果
- 修复分页样式问题

### 注意事项

1. 主题使用了 Font Awesome 和 Google Fonts，请确保网络连接正常
2. 如需自定义样式，可以修改 `source/css` 目录下的相关文件
3. 评论系统需要配置正确的 serverURL 才能正常工作
4. 主题支持 Hexo 3.0 及以上版本

### 开发者信息

- 作者：Ongwu
- GitHub：https://github.com/ongwu
- 邮箱：ongwu007@qq.com

如有任何问题或建议，欢迎联系开发者。
