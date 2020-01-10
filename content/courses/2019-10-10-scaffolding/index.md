---
title: 前端脚手架
slug: scaffolding
date: 2019-10-10 15:29:00
cover: cover.png
description: 前端工程化的发起者
categories:
  - 工程化
tags:
  - Yeoman
  - Plop
sections:
  - title: 工程化的定义和主要解决的问题
    duration: 285
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/9a4e916d5285890797461910025/R2nTG1RS3sYA.mp4
  - title: 一个项目过程中工程化的表现
    duration: 237
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/d1aab25f5285890797591875263/ZIbLwwabV24A.mp4
  - title: 工程化不等于工具
    duration: 208
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/01d15f5e5285890797547813719/sM8xejp9uUUA.mp4
  - title: 课程介绍
    duration: 82
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/01d15fba5285890797547813742/Fsw055fbcXwA.mp4
  - title: 脚手架工具概要
    duration: 172
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/0ba0b89b5285890797592024776/0FHm0CnQCH8A.mp4
  - title: 常用的脚手架工具
    duration: 120
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/0ba0c0385285890797592024908/xA3tH9ANFhMA.mp4
  - title: Yeoman 简介
    duration: 108
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/0ba126b35285890797592025038/L0PFVAT2TGcA.mp4
  - title: Yeoman 基础使用
    duration: 432
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/01d163b85285890797547813821/jv1pQlgTK9IA.mp4
  - title: Sub Generator
    duration: 218
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/01d164415285890797547813866/okqmiCsnSMEA.mp4
  - title: Yeoman 使用步骤总结
    duration: 148
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/5d4539975285890797593224454/gVkUJ0xzMKUA.mp4
  - title: 自定义 Generator
    duration: 95
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/5d56cdb85285890797593233617/0GiBQxktav4A.mp4
  - title: 创建 Generator 模块
    duration: 300
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/5d4546be5285890797593224785/idRye7POoyMA.mp4
  - title: 根据模板创建文件
    duration: 145
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/7219e6e15285890797590086695/8NLDDPtBFFwA.mp4
  - title: 接收用户输入
    duration: 176
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/0ba1b7955285890797592026156/Qgz6NkndxvUA.mp4
  - title: Vue Generator 案例
    duration: 376
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/5d45c19a5285890797593225348/mMYF5njKeBwA.mp4
  - title: 发布 Generator
    duration: 295
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/3fd809c45285890797460387959/MSygZxIiu0oA.mp4
  - title: Plop 简介
    duration: 154
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/9a4e91d25285890797461910057/2zGaBnpzwIUA.mp4
  - title: Plop 的基本使用
    duration: 440
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/5d23d77d5285890797593209853/fwAg0AZBtnAA.mp4
  - title: 脚手架的工作原理
    duration: 561
    source: https://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/d1ac4e375285890797591878000/KimPhSEolSUA.mp4
---

在对前端工程化的整体有了初步的认识之后，我们顺着一个项目的开发过程，先从脚手架开始，探讨前端工程化在项目创建环节中的具体表现。

脚手架可以简单理解为用来自动帮我们创建项目基础文件的工具。看似很普通的需求，背后却饱含哲学，因为除了创建文件，它更重要的是提供给开发者一些约定或规范。

### 脚手架的本质作用

通常我们在开发相同类型的项目时都会使用一些相同的约定，其中包括：

- 相同的文件组织结构
- 相同的代码开发范式
- 相同的模块依赖
- 相同的工具模块配置
- 相同的基础代码

这样一来就会出现在搭建新项目时有大量重复工作要做。脚手架工具就是用来解决此类问题的。我们可以通过脚手架工具快速搭建特定类型项目的基础骨架结构，然后基于这个基础结构进行后续的开发工作。

如果你用过一些例如 Visual Studio 或者 Eclipse 这样的大型 IDE，它们创建项目的过程实际上就是一个脚手架的工作流程。
