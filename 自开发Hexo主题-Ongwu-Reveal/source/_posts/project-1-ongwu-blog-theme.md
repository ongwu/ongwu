---
title: "Ongwu博客主题"
subtitle: "基于Hexo的现代化个人博客主题"
date: 2025-01-15
categories: 
  - projects
tags:
  - Hexo主题
  - 个人博客
  - 前端开发
  - 响应式设计
description: "Ongwu是一个专为个人博客设计的Hexo主题，具有现代化的界面设计和丰富的功能特性。"
icon: /images/projects/1.jpg
thumbnail: /images/projects/1.jpg
---

# Ongwu博客主题

## 项目概述

Ongwu是一个基于Hexo的现代化个人博客主题，专为技术爱好者和内容创作者设计。该主题具有简洁美观的界面、响应式设计以及丰富的功能特性，让用户能够轻松搭建专业的个人博客。

## 主要特性

### 界面设计
- **现代化UI**：采用Material Design设计语言
- **响应式布局**：完美适配各种设备尺寸
- **暗色模式**：支持明暗主题切换
- **自定义配色**：灵活的配色方案配置

### 功能特性
- **多栏目支持**：项目作品、技术深究、教程分享等
- **搜索功能**：内置本地搜索支持
- **评论系统**：集成多种评论服务
- **SEO优化**：完善的SEO配置和元数据

### 技术架构
- **Hexo框架**：基于Node.js的静态站点生成器
- **EJS模板**：灵活的模板引擎
- **SCSS预处理器**：模块化样式管理
- **JavaScript ES6+**：现代JavaScript特性

## 技术实现

### 主题结构
```
themes/ongwu/
├── layout/           # 模板文件
│   ├── index.ejs     # 首页模板
│   ├── post.ejs      # 文章模板
│   └── _partial/     # 部分模板
├── source/           # 静态资源
│   ├── css/          # 样式文件
│   ├── js/           # JavaScript文件
│   └── images/       # 图片资源
└── _config.yml       # 主题配置
```

### 核心配置
```yaml
# 主题配置
name: ongwu
version: "1.3.0"

# 导航菜单
menu:
  home: "首页"
  projects: "项目作品"
  tech: "技术深究"
  tutorial: "教程分享"
  ranking: "网站留言"

# 首页配置
index:
  projects_count: 4
  tech_count: 12
  tutorial_count: 12
```

## 安装使用

### 1. 安装主题
```bash
# 克隆主题到themes目录
git clone https://github.com/ongwu/hexo-theme-ongwu.git themes/ongwu
```

### 2. 配置主题
```yaml
# _config.yml
theme: ongwu

# 主题配置
ongwu:
  menu:
    home: "首页"
    projects: "项目作品"
    tech: "技术深究"
    tutorial: "教程分享"
```

### 3. 创建内容
```bash
# 创建新文章
hexo new post "文章标题"

# 创建项目页面
hexo new page "projects"
```

## 自定义开发

### 样式定制
```scss
// 自定义变量
$primary-color: #007bff;
$secondary-color: #6c757d;
$success-color: #28a745;

// 自定义样式
.custom-header {
  background: linear-gradient(135deg, $primary-color, $secondary-color);
  color: white;
  padding: 2rem 0;
}
```

### 功能扩展
```javascript
// 自定义JavaScript功能
class OngwuTheme {
  constructor() {
    this.init();
  }
  
  init() {
    this.setupDarkMode();
    this.setupSearch();
    this.setupComments();
  }
  
  setupDarkMode() {
    // 暗色模式切换逻辑
  }
}
```

## 性能优化

### 资源优化
- **图片压缩**：自动压缩和优化图片
- **CSS合并**：合并和压缩样式文件
- **JS压缩**：压缩JavaScript代码
- **CDN加速**：支持CDN资源加载

### 加载优化
- **懒加载**：图片和内容懒加载
- **预加载**：关键资源预加载
- **缓存策略**：合理的缓存配置
- **代码分割**：按需加载代码

## 浏览器兼容性

| 浏览器 | 版本支持 | 备注 |
|--------|----------|------|
| Chrome | 60+ | 完全支持 |
| Firefox | 55+ | 完全支持 |
| Safari | 12+ | 完全支持 |
| Edge | 79+ | 完全支持 |
| IE | 11+ | 基础支持 |

## 更新日志

### v1.3.0 (2025-01-15)
- 新增暗色模式支持
- 优化移动端体验
- 改进搜索功能
- 修复已知问题

### v1.2.0 (2024-12-01)
- 新增多栏目支持
- 优化SEO配置
- 改进评论系统
- 增强自定义能力

## 贡献指南

### 开发环境
```bash
# 安装依赖
npm install

# 启动开发服务器
hexo server

# 构建静态文件
hexo generate
```

### 提交规范
- 使用语义化提交信息
- 遵循代码规范
- 添加必要的测试
- 更新文档说明

## 许可证

本项目采用 MIT 许可证，详情请参阅 [LICENSE](LICENSE) 文件。

## 联系方式

- **GitHub**: [https://github.com/ongwu/hexo-theme-ongwu](https://github.com/ongwu/hexo-theme-ongwu)
- **邮箱**: ongwu@example.com
- **网站**: [https://ongwu.cn](https://ongwu.cn)

---

*Ongwu主题让个人博客更专业、更美观！*
