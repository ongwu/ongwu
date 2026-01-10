# Ongwu Simple 主题 - 简洁大气的Hexo主题

> 一个让你爱上写博客的简洁主题，移动端自适应，PC端优雅，专为懒人设计！

[![Hexo](https://img.shields.io/badge/Hexo-5.0+-blue.svg)](https://hexo.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-1.0.0-orange.svg)](https://github.com/ongwu/ongwu-simple)

### demo：https://ongwu.cn/demo/Ongwu-Simple

## 主题截图
<img width="2096" height="3016" alt="ongwu github io_" src="https://github.com/user-attachments/assets/0a717733-5412-418c-bef8-21a98bcb8bc1" />


## 🌟 主题特色

### 📱 移动端友好
- **自适应设计**：手机、平板、电脑，一个主题搞定所有设备
- **汉堡菜单**：经典的汉堡包菜单，点击就能展开侧边栏
- **触摸优化**：专为移动端优化的触摸体验
- **简洁大气**：大字体、大间距，移动端阅读体验极佳

### 💻 PC端优雅
- **双栏布局**：左侧导航，右侧内容，经典博客布局
- **响应式设计**：从手机到4K显示器，完美适配
- **性能优化**：加载速度快，运行流畅
- **SEO友好**：搜索引擎优化，让你的文章更容易被找到 

### 🎯 功能丰富
- **搜索功能**：内置搜索，快速找到你想要的文章
- **评论系统**：支持Waline评论系统，与读者互动
- **代码高亮**：支持多种编程语言代码高亮
- **数学公式**：支持LaTeX数学公式渲染
- **图片懒加载**：提升页面加载速度
- **返回顶部**：一键回到页面顶部

## 🚀 快速开始

### 安装主题

```bash
# 克隆主题到你的Hexo主题目录
git clone https://github.com/ongwu/ongwu-simple.git themes/ongwu_simple

# 或者使用npm安装（如果发布到npm）
npm install hexo-theme-ongwu-simple
```

### 启用主题

在你的 `_config.yml` 文件中设置：

```yaml
theme: ongwu_simple
```

### 配置主题

主题配置文件位于 `themes/ongwu_simple/_config.yml`，你可以在这里配置：

- 网站基本信息
- 个人资料
- 导航菜单
- 友链设置
- 评论系统
- 搜索功能
- 主题样式
- 等等...

## 📖 详细配置

### 网站基本信息

```yaml
# 网站标题
site_title: "你的博客名称"
# 网站副标题
site_subtitle: "简洁大气的个人博客主题"
# 网站描述
site_description: "基于 Hexo 的简洁个人博客主题"
# 网站关键词
site_keywords: "博客,个人网站,Hexo,简洁"
```

### 个人资料

```yaml
# 个人头像
avatar: /images/avatar.jpg
# 个人姓名
author_name: "你的名字"
# 个人职业
author_job: "全栈开发者"
# 个人位置
author_location: "中国"
# 个人简介
author_bio: "热爱技术，喜欢分享，追求简洁与美感的平衡。"
```

### 导航菜单

```yaml
menu:
  - name: "首页"
    url: "/"
    icon: "home"
  - name: "留言"
    url: "/guestbook"
    icon: "file-text"
  - name: "友链"
    url: "/links"
    icon: "link"
  - name: "关于"
    url: "/about"
    icon: "user"
```

### 评论系统

```yaml
comments:
  service: waline
  waline:
    serverURL: https://your-comment-server.com
    visitor: true
    comment: true
    pageview: true
    pageSize: 10
    avatar: https://cdn.sep.cc/avatar/${hash}
    lang: zh-CN
    placeholder: "欢迎留言讨论..."
```

## 🎨 主题定制

### 颜色配置

```yaml
color:
  primary: "#3498db"    # 主色调
  secondary: "#2c3e50"  # 辅助色
  success: "#27ae60"    # 成功色
  warning: "#f39c12"    # 警告色
  danger: "#e74c3c"     # 危险色
  info: "#17a2b8"       # 信息色
  light: "#f8f9fa"      # 浅色
  dark: "#343a40"       # 深色
```

### 字体配置

```yaml
font:
  body: "LXGW WenKai Screen"      # 正文字体
  heading: "LXGW WenKai Screen"   # 标题字体
  code: "JetBrainMono"            # 代码字体
  size: 16px                      # 字体大小
  line_height: 1.6                # 行高
```

### 布局配置

```yaml
layout:
  max_width: 1400px      # 容器最大宽度
  sidebar_width: 360px   # 侧边栏宽度
  main_width: 800px      # 主内容区宽度
  gap: 60px              # 两栏间距
  padding: 30px          # 内边距
```

## 📱 移动端特性

### 自适应设计
- 响应式布局，自动适配不同屏幕尺寸
- 移动端优化的触摸体验
- 汉堡菜单，节省屏幕空间
- 大字体、大间距，提升阅读体验

### 性能优化
- 图片懒加载，提升加载速度
- CSS和JS优化，减少文件大小
- 触摸优化，提升交互体验
- 动画性能优化，流畅的过渡效果

## 🔧 开发说明

### 项目结构

```
themes/ongwu_simple/
├── _config.yml          # 主题配置文件
├── layout/              # 布局文件
│   ├── index.ejs        # 首页布局
│   ├── post.ejs         # 文章页布局
│   ├── page.ejs         # 页面布局
│   └── partial/         # 部分布局
├── source/              # 静态资源
│   ├── css/             # 样式文件
│   ├── js/              # JavaScript文件
│   └── images/          # 图片资源
└── README.md            # 说明文档
```

### 自定义开发

如果你想自定义主题，可以：

1. Fork 这个仓库
2. 修改 `source/css/style.css` 来自定义样式
3. 修改 `source/js/main.js` 来自定义功能
4. 修改 `layout/` 目录下的模板文件来自定义布局
5. 提交你的修改并创建 Pull Request

## 🤝 贡献指南

我们欢迎任何形式的贡献！

- 🐛 发现Bug？请提交Issue
- 💡 有好的想法？请提交Issue讨论
- 🔧 想贡献代码？请Fork并提交Pull Request
- 📖 想改进文档？请提交Pull Request

## 📄 许可证

本项目基于 [MIT License](https://opensource.org/licenses/MIT) 开源协议。

## 🙏 致谢

感谢以下开源项目：

- [Hexo](https://hexo.io/) - 静态博客框架
- [Waline](https://waline.js.org/) - 评论系统
- [Font Awesome](https://fontawesome.com/) - 图标库
- [LXGW WenKai](https://github.com/lxgw/LxgwWenKai) - 中文字体

## 📞 联系方式

- 作者：Ongwu
- 邮箱：ongwu007@gmail.com
- 网站：https://ongwu.cn
- GitHub：https://github.com/ongwu

---

## 🎉 最后

如果你觉得这个主题不错，请给个 ⭐ Star 支持一下！

如果使用过程中遇到问题，欢迎提交 Issue 或联系我。

**记住：好的主题让写博客变成一种享受，而不是负担！** 🚀

---

*"简洁是智慧的灵魂，复杂是愚蠢的根源。"* - 这个主题的设计理念
