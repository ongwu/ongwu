---
title: "GotifyNotify插件"
subtitle: "Typecho博客通知推送插件"
date: 2025-01-14
categories: 
  - projects
tags:
  - Typecho插件
  - 通知推送
  - Gotify
  - 消息系统
description: "GotifyNotify是一个Typecho博客插件，通过集成Gotify服务实现实时消息推送功能。"
icon: /images/projects/2.jpg
thumbnail: /images/projects/2.jpg
---

# GotifyNotify插件

## 项目简介

GotifyNotify是一个专为Typecho博客系统开发的通知推送插件，通过集成Gotify自托管消息推送服务，为博客管理员和用户提供实时的消息通知功能。无论是新评论、新文章发布还是系统重要事件，都能及时推送到指定设备。

## 核心功能

### 通知类型
- **评论通知**：新评论发布时自动推送
- **文章通知**：新文章发布时通知订阅用户
- **系统通知**：重要系统事件实时推送
- **自定义通知**：支持手动发送自定义消息

### 推送特性
- **多平台支持**：Android、iOS、Web、桌面客户端
- **实时推送**：毫秒级消息传递
- **离线存储**：消息持久化存储
- **优先级设置**：支持不同优先级的消息推送

## 技术架构

### 系统架构图
```
Typecho博客 → GotifyNotify插件 → Gotify服务器 → 客户端设备
     ↓              ↓              ↓           ↓
   事件触发     消息处理      消息分发     消息接收
```

### 核心代码结构
```php
<?php
/**
 * GotifyNotify插件主类
 */
class GotifyNotify_Plugin implements Typecho_Plugin_Interface
{
    /**
     * 插件激活
     */
    public static function activate()
    {
        // 注册钩子函数
        Typecho_Plugin::factory('Widget_Feedback')->comment = array('GotifyNotify_Plugin', 'sendCommentNotification');
        Typecho_Plugin::factory('Widget_Contents_Post_Edit')->finishPublish = array('GotifyNotify_Plugin', 'sendPostNotification');
    }
    
    /**
     * 插件配置
     */
    public static function config(Typecho_Widget_Helper_Form $form)
    {
        $gotifyUrl = new Typecho_Widget_Helper_Form_Element_Text('gotifyUrl', NULL, '', 'Gotify服务器地址');
        $appToken = new Typecho_Widget_Helper_Form_Element_Text('appToken', NULL, '', '应用Token');
        
        $form->addInput($gotifyUrl);
        $form->addInput($appToken);
    }
}
```

## 安装配置

### 1. 环境要求
- Typecho 1.2.0+
- PHP 7.0+
- cURL扩展
- JSON扩展

### 2. 安装步骤
```bash
# 下载插件文件
wget https://github.com/ongwu/typecho-gotify-notify/archive/main.zip

# 解压到插件目录
unzip main.zip -d /path/to/typecho/usr/plugins/

# 重命名插件目录
mv typecho-gotify-notify-main GotifyNotify
```

### 3. 配置插件
```php
// 插件配置示例
return array(
    'gotifyUrl' => 'https://your-gotify-server.com',
    'appToken' => 'your-app-token-here',
    'enableComments' => true,
    'enablePosts' => true,
    'enableSystem' => true,
    'notificationPriority' => 0,
    'retryAttempts' => 3,
    'timeout' => 30
);
```

## 使用指南

### 1. 获取Gotify Token
```bash
# 登录Gotify管理界面
# 创建新应用
# 获取应用Token
```

### 2. 配置通知规则
```php
// 自定义通知规则
class GotifyNotify_Rules
{
    public static function shouldNotify($type, $data)
    {
        switch ($type) {
            case 'comment':
                return $data['status'] == 'approved';
            case 'post':
                return $data['status'] == 'publish';
            default:
                return true;
        }
    }
}
```

### 3. 发送自定义通知
```php
// 发送自定义通知
$notifier = new GotifyNotify_Notifier();
$notifier->sendNotification(
    '系统通知',
    '博客系统运行正常',
    5 // 高优先级
);
```

## 高级功能

### 1. 消息模板
```php
// 自定义消息模板
class GotifyNotify_Templates
{
    public static function getCommentTemplate($comment)
    {
        return sprintf(
            "新评论：%s\n作者：%s\n文章：%s",
            $comment['text'],
            $comment['author'],
            $comment['title']
        );
    }
}
```

### 2. 批量推送
```php
// 批量推送消息
$messages = array(
    array('title' => '标题1', 'message' => '内容1'),
    array('title' => '标题2', 'message' => '内容2')
);

$notifier->sendBatchNotifications($messages);
```

### 3. 条件推送
```php
// 基于条件的推送
if (GotifyNotify_Conditions::isHighTraffic()) {
    $notifier->sendNotification('流量提醒', '当前访问量较高');
}
```

## 性能优化

### 1. 异步推送
```php
// 使用队列异步推送
class GotifyNotify_Queue
{
    public static function addToQueue($message)
    {
        // 添加到推送队列
        $queue = new GotifyNotify_Queue_Manager();
        $queue->push($message);
    }
}
```

### 2. 缓存机制
```php
// 缓存推送状态
class GotifyNotify_Cache
{
    public static function cachePushStatus($messageId, $status)
    {
        $cache = Typecho_Cache::getInstance();
        $cache->set('gotify_push_' . $messageId, $status, 3600);
    }
}
```

### 3. 错误重试
```php
// 智能重试机制
class GotifyNotify_Retry
{
    public static function retryPush($message, $maxAttempts = 3)
    {
        for ($i = 0; $i < $maxAttempts; $i++) {
            if (self::sendMessage($message)) {
                return true;
            }
            sleep(pow(2, $i)); // 指数退避
        }
        return false;
    }
}
```

## 安全考虑

### 1. Token安全
```php
// 加密存储Token
class GotifyNotify_Security
{
    public static function encryptToken($token)
    {
        $key = self::getEncryptionKey();
        return base64_encode(openssl_encrypt($token, 'AES-256-CBC', $key));
    }
    
    public static function decryptToken($encryptedToken)
    {
        $key = self::getEncryptionKey();
        return openssl_decrypt(base64_decode($encryptedToken), 'AES-256-CBC', $key);
    }
}
```

### 2. 输入验证
```php
// 验证输入数据
class GotifyNotify_Validator
{
    public static function validateMessage($message)
    {
        if (empty($message['title']) || empty($message['message'])) {
            throw new InvalidArgumentException('消息标题和内容不能为空');
        }
        
        if (strlen($message['title']) > 100) {
            throw new InvalidArgumentException('消息标题过长');
        }
        
        return true;
    }
}
```

## 故障排除

### 1. 常见问题
- **连接失败**：检查网络连接和服务器状态
- **认证错误**：验证Token配置是否正确
- **推送延迟**：检查服务器负载和网络状况

### 2. 调试模式
```php
// 启用调试模式
define('GOTIFY_NOTIFY_DEBUG', true);

// 查看调试日志
$logger = new GotifyNotify_Logger();
$logger->debug('推送消息', $message);
```

### 3. 性能监控
```php
// 监控推送性能
class GotifyNotify_Monitor
{
    public static function recordPushTime($startTime, $endTime)
    {
        $duration = $endTime - $startTime;
        // 记录推送耗时
        self::logPerformance('push_duration', $duration);
    }
}
```

## 扩展开发

### 1. 自定义钩子
```php
// 注册自定义钩子
Typecho_Plugin::factory('GotifyNotify')->customEvent = array('YourPlugin', 'handleCustomEvent');
```

### 2. 插件集成
```php
// 与其他插件集成
class GotifyNotify_Integration
{
    public static function integrateWithOtherPlugin($data)
    {
        // 集成逻辑
    }
}
```

## 更新日志

### v1.2.0 (2025-01-14)
- 新增批量推送功能
- 优化错误重试机制
- 改进消息模板系统
- 增强安全性配置

### v1.1.0 (2024-12-15)
- 新增条件推送功能
- 优化性能表现
- 改进用户界面
- 修复已知问题

## 许可证

本项目采用 MIT 许可证，详情请参阅 [LICENSE](LICENSE) 文件。

## 贡献指南

欢迎提交Issue和Pull Request来改进这个插件！

---

*GotifyNotify让Typecho博客通知更及时、更智能！*
