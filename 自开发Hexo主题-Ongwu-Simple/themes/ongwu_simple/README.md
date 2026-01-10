# 🎨 Ongwu Simple - Hexo主题

> 一个简洁大气的Hexo主题，专为追求简洁与美感的博主设计

## ✨ 主题特色

- 📱 **移动端自适应**：完美适配手机、平板、电脑
- 🎯 **简洁大气**：大字体、大间距，阅读体验极佳
- 🚀 **性能优化**：加载速度快，运行流畅
- 🔍 **搜索功能**：内置搜索，快速找到文章
- 💬 **评论系统**：支持Waline评论系统
- 🎨 **高度可定制**：丰富的配置选项

## 🚀 快速开始

### 1. 安装主题

```bash
# 克隆主题
git clone https://github.com/ongwu/ongwu-simple.git themes/ongwu_simple
```

### 2. 启用主题

在 `_config.yml` 中设置：

```yaml
theme: ongwu_simple
```

### 3. 配置主题

编辑 `themes/ongwu_simple/_config.yml` 文件来自定义主题。

## 📖 配置说明

### 网站基本信息

```yaml
# 网站标题
site_title: "你的博客名称"
# 网站副标题
site_subtitle: "简洁大气的个人博客主题"
# 网站描述
site_description: "基于 Hexo 的简洁个人博客主题"
```

### 个人资料

```yaml
# 个人头像
avatar: /images/avatar.jpg
# 个人姓名
author_name: "你的名字"
# 个人职业
author_job: "全栈开发者"
# 个人简介
author_bio: "热爱技术，喜欢分享，追求简洁与美感的平衡。"
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
```

## 🎨 自定义样式

主题支持丰富的自定义选项：

- 颜色配置
- 字体设置
- 布局调整
- 功能开关
- 动画效果

## 📱 移动端优化

- 响应式设计
- 触摸优化
- 汉堡菜单
- 大字体显示
- 性能优化

## 🔧 开发说明

### 文件结构

```
themes/ongwu_simple/
├── _config.yml          # 主题配置
├── layout/              # 布局文件
├── source/              # 静态资源
│   ├── css/             # 样式文件
│   ├── js/              # JavaScript文件
│   └── images/          # 图片资源
└── README.md            # 说明文档
```

### 自定义开发

1. 修改 `source/css/style.css` 来自定义样式
2. 修改 `source/js/main.js` 来自定义功能
3. 修改 `layout/` 目录下的模板文件来自定义布局

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有开源项目的支持！

---

*简洁是智慧的灵魂* - 这个主题的设计理念
