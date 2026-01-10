---
title: "Winds CKEditor插件"
subtitle: "Typecho富文本编辑器增强插件"
date: 2025-01-12
categories: 
  - projects
tags:
  - Typecho插件
  - 富文本编辑器
  - CKEditor
  - 内容管理
description: "Winds CKEditor插件为Typecho提供强大的富文本编辑功能，支持多种编辑模式和丰富的插件扩展。"
icon: /images/projects/4.jpg
thumbnail: /images/projects/4.jpg
---

# Winds CKEditor插件

## 项目简介

Winds CKEditor插件是一个专为Typecho博客系统开发的富文本编辑器增强插件，基于CKEditor 5构建，提供现代化的编辑体验和丰富的功能特性。插件支持多种编辑模式、实时协作、代码高亮、图片上传等功能，让内容创作更加高效便捷。

## 核心特性

### 编辑功能
- **所见即所得**：实时预览编辑效果
- **多种模式**：经典、内联、气球编辑模式
- **实时协作**：多用户同时编辑支持
- **自动保存**：防止内容丢失

### 内容支持
- **富文本格式**：支持粗体、斜体、下划线等
- **列表支持**：有序列表、无序列表
- **表格编辑**：创建和编辑表格
- **代码高亮**：支持多种编程语言

### 媒体处理
- **图片上传**：支持拖拽上传图片
- **图片编辑**：内置图片编辑器
- **视频嵌入**：支持视频内容嵌入
- **文件管理**：完整的文件管理系统

## 技术架构

### 前端架构
```javascript
// CKEditor 5 初始化
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

class WindsCKEditor {
    constructor(element, options = {}) {
        this.element = element;
        this.options = Object.assign({}, this.defaultOptions, options);
        this.init();
    }
    
    async init() {
        try {
            this.editor = await ClassicEditor.create(this.element, {
                plugins: [
                    Essentials,
                    Bold,
                    Italic,
                    Paragraph,
                    // 更多插件...
                ],
                toolbar: [
                    'heading',
                    '|',
                    'bold',
                    'italic',
                    'link',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'blockQuote',
                    'insertTable',
                    '|',
                    'undo',
                    'redo'
                ],
                ...this.options
            });
            
            this.bindEvents();
        } catch (error) {
            console.error('CKEditor初始化失败:', error);
        }
    }
}
```

### 后端PHP实现
```php
<?php
/**
 * Winds CKEditor插件主类
 */
class WindsCKEditor_Plugin implements Typecho_Plugin_Interface
{
    /**
     * 插件激活
     */
    public static function activate()
    {
        // 注册管理页面
        Helper::addPanel(1, 'WindsCKEditor/manage.php', '编辑器设置', '编辑器配置', 'administrator');
        
        // 注册钩子
        Typecho_Plugin::factory('admin/write-post.php')->bottom = array('WindsCKEditor_Plugin', 'renderEditor');
        Typecho_Plugin::factory('admin/write-page.php')->bottom = array('WindsCKEditor_Plugin', 'renderEditor');
        
        // 注册AJAX处理
        Typecho_Plugin::factory('Widget_Options')->action = array('WindsCKEditor_Plugin', 'handleAjax');
    }
    
    /**
     * 渲染编辑器
     */
    public static function renderEditor()
    {
        $options = Typecho_Widget::widget('Widget_Options');
        $pluginOptions = $options->plugin('WindsCKEditor');
        
        echo '<script src="' . $options->pluginUrl . '/WindsCKEditor/assets/ckeditor.js"></script>';
        echo '<script>
            document.addEventListener("DOMContentLoaded", function() {
                const editor = new WindsCKEditor("#text", {
                    uploadUrl: "' . $options->siteUrl . '/action/winds-ckeditor-upload",
                    language: "' . $pluginOptions->language . '",
                    theme: "' . $pluginOptions->theme . '"
                });
            });
        </script>';
    }
}
```

## 安装配置

### 1. 环境要求
- Typecho 1.2.0+
- PHP 7.0+
- 现代浏览器支持
- 文件上传权限

### 2. 安装步骤
```bash
# 下载插件
git clone https://github.com/ongwu/typecho-winds-ckeditor.git

# 复制到插件目录
cp -r typecho-winds-ckeditor /path/to/typecho/usr/plugins/WindsCKEditor

# 设置权限
chmod -R 755 /path/to/typecho/usr/plugins/WindsCKEditor
chmod 777 /path/to/typecho/usr/uploads
```

### 3. 配置选项
```php
// 插件配置
return array(
    'editorMode' => 'classic',           // 编辑器模式
    'language' => 'zh-cn',               // 界面语言
    'theme' => 'default',                // 主题样式
    'toolbar' => 'full',                 // 工具栏配置
    'enableUpload' => true,              // 启用文件上传
    'maxFileSize' => '10MB',             // 最大文件大小
    'allowedTypes' => 'jpg,jpeg,png,gif,pdf,doc,docx', // 允许的文件类型
    'enableAutoSave' => true,            // 启用自动保存
    'autoSaveInterval' => 30,            // 自动保存间隔(秒)
    'enableCollaboration' => false,      // 启用协作编辑
    'enableCodeHighlight' => true        // 启用代码高亮
);
```

## 使用指南

### 1. 基本使用
```html
<!-- 在编辑页面中 -->
<textarea id="text" name="text" class="winds-ckeditor">
    <!-- 编辑器将在这里初始化 -->
</textarea>

<script>
// 初始化编辑器
const editor = new WindsCKEditor('#text', {
    language: 'zh-cn',
    theme: 'default',
    toolbar: 'full'
});
</script>
```

### 2. 自定义工具栏
```javascript
// 自定义工具栏配置
const editor = new WindsCKEditor('#text', {
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'alignment',
            '|',
            'link',
            'insertTable',
            'blockQuote',
            'codeBlock',
            '|',
            'undo',
            'redo'
        ],
        shouldNotGroupWhenFull: true
    }
});
```

### 3. 文件上传配置
```javascript
// 文件上传配置
const editor = new WindsCKEditor('#text', {
    upload: {
        url: '/action/winds-ckeditor-upload',
        method: 'POST',
        headers: {
            'X-CSRF-Token': getCsrfToken()
        },
        onUpload: function(file) {
            console.log('开始上传:', file.name);
        },
        onSuccess: function(response) {
            console.log('上传成功:', response);
        },
        onError: function(error) {
            console.error('上传失败:', error);
        }
    }
});
```

## 高级功能

### 1. 代码高亮
```javascript
// 代码高亮配置
const editor = new WindsCKEditor('#text', {
    codeBlock: {
        languages: [
            { language: 'javascript', label: 'JavaScript' },
            { language: 'php', label: 'PHP' },
            { language: 'python', label: 'Python' },
            { language: 'html', label: 'HTML' },
            { language: 'css', label: 'CSS' },
            { language: 'sql', label: 'SQL' }
        ]
    }
});
```

### 2. 表格编辑
```javascript
// 表格功能配置
const editor = new WindsCKEditor('#text', {
    table: {
        contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells',
            'tableProperties',
            'tableCellProperties'
        ]
    }
});
```

### 3. 实时协作
```javascript
// 协作编辑配置
const editor = new WindsCKEditor('#text', {
    collaboration: {
        enabled: true,
        serverUrl: 'wss://your-collaboration-server.com',
        channelId: 'document-123',
        userId: getCurrentUserId(),
        userData: {
            name: getCurrentUserName(),
            avatar: getCurrentUserAvatar()
        }
    }
});
```

## 插件扩展

### 1. 自定义插件
```javascript
// 自定义插件示例
class CustomPlugin extends Plugin {
    static get pluginName() {
        return 'CustomPlugin';
    }
    
    init() {
        const editor = this.editor;
        
        // 添加自定义按钮
        editor.ui.componentFactory.add('customButton', locale => {
            const buttonView = new ButtonView(locale);
            
            buttonView.set({
                label: '自定义功能',
                icon: '<svg>...</svg>',
                tooltip: true
            });
            
            buttonView.on('execute', () => {
                // 自定义功能逻辑
                this.showCustomDialog();
            });
            
            return buttonView;
        });
    }
    
    showCustomDialog() {
        // 显示自定义对话框
        console.log('执行自定义功能');
    }
}
```

### 2. 主题定制
```css
/* 自定义编辑器样式 */
.ck-editor__editable {
    min-height: 300px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.ck-editor__toolbar {
    border: 1px solid #ddd;
    border-bottom: none;
    border-radius: 4px 4px 0 0;
}

/* 自定义按钮样式 */
.ck-button.custom-button {
    background: #007bff;
    color: white;
}

.ck-button.custom-button:hover {
    background: #0056b3;
}
```

## 性能优化

### 1. 懒加载
```javascript
// 懒加载配置
const editor = new WindsCKEditor('#text', {
    lazyLoad: {
        enabled: true,
        threshold: 100,
        placeholder: '点击开始编辑...'
    }
});
```

### 2. 缓存机制
```php
// 内容缓存
class WindsCKEditor_Cache
{
    public static function cacheContent($content, $hash)
    {
        $cacheFile = self::getCachePath($hash);
        file_put_contents($cacheFile, $content);
    }
    
    public static function getCachedContent($hash)
    {
        $cacheFile = self::getCachePath($hash);
        if (file_exists($cacheFile)) {
            return file_get_contents($cacheFile);
        }
        return null;
    }
}
```

## 安全考虑

### 1. 内容过滤
```php
// 内容安全过滤
class WindsCKEditor_Security
{
    public static function filterContent($content)
    {
        // 移除危险标签
        $content = strip_tags($content, '<p><br><strong><em><u><ul><ol><li><table><tr><td><th><img><a><code><pre>');
        
        // 过滤危险属性
        $content = preg_replace('/on\w+\s*=\s*["\'][^"\']*["\']/', '', $content);
        
        // 验证链接
        $content = preg_replace_callback('/<a[^>]+href=["\']([^"\']+)["\'][^>]*>/', function($matches) {
            $url = $matches[1];
            if (filter_var($url, FILTER_VALIDATE_URL)) {
                return $matches[0];
            }
            return '';
        }, $content);
        
        return $content;
    }
}
```

### 2. 文件上传安全
```php
// 文件上传安全验证
class WindsCKEditor_Upload
{
    public static function validateFile($file)
    {
        // 检查文件类型
        $allowedTypes = array('jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx');
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        
        if (!in_array($extension, $allowedTypes)) {
            throw new Exception('不支持的文件类型');
        }
        
        // 检查文件大小
        $maxSize = 10 * 1024 * 1024; // 10MB
        if ($file['size'] > $maxSize) {
            throw new Exception('文件大小超出限制');
        }
        
        // 检查文件内容
        if (!self::isValidFileContent($file['tmp_name'])) {
            throw new Exception('文件内容验证失败');
        }
        
        return true;
    }
}
```

## 更新日志

### v1.2.0 (2025-01-12)
- 新增实时协作功能
- 优化文件上传体验
- 改进代码高亮支持
- 增强安全性配置

### v1.1.0 (2024-12-15)
- 新增表格编辑功能
- 优化编辑器性能
- 改进移动端支持
- 修复已知问题

## 许可证

本项目采用 MIT 许可证，详情请参阅 [LICENSE](LICENSE) 文件。

---

*Winds CKEditor插件让内容创作更专业、更高效！*
