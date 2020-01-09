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
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/586d03755285890793844198105/beYg2Yrsjn4A.mp4
  - title: 一个项目过程中工程化的表现
    duration: 237
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/b7c8c9885285890793845959739/lGg847b5A8QA.mp4
  - title: 工程化不等于工具
    duration: 208
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/cd88f8515285890793336772404/bfEb42a7B1YA.mp4
  - title: 课程介绍
    duration: 82
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/5a3f1a2c5285890793844220074/4rarMaVxjY8A.mp4
  - title: 脚手架工具概要
    duration: 172
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/5a3f26465285890793844220320/vQXCfrUtATYA.mp4
  - title: 常用的脚手架工具
    duration: 120
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/0fb12b7f5285890793843339758/JaLICt7WGZgA.mp4
  - title: Yeoman 简介
    duration: 108
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/c0094a285285890793801136044/E3ex432SYx0A.mp4
  - title: Yeoman 基础使用
    duration: 432
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/5a64746e5285890793844242432/E9x73sN2E3kA.mp4
  - title: Sub Generator
    duration: 218
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/94a08f7c5285890793587209088/KqzjMHpakkIA.mp4
  - title: Yeoman 使用步骤总结
    duration: 148
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/5aadddf55285890793844284019/QPMsAT0oPcAA.mp4
  - title: 自定义 Generator
    duration: 95
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/0fac2a6b5285890793843330306/Tnd3PnGbmcsA.mp4
  - title: 创建 Generator 模块
    duration: 300
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/ef8b80925285890793846024364/biSppR3b5QkA.mp4
  - title: 根据模板创建文件
    duration: 145
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/0fac40335285890793843330845/TVxUCYgWtwsA.mp4
  - title: 接收用户输入
    duration: 176
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/cd88f8755285890793336772417/Xh0eFihIKAAA.mp4
  - title: Vue Generator 案例
    duration: 376
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/0fbf53ce5285890793843342153/CxSYxSaVptMA.mp4
  - title: 发布 Generator
    duration: 295
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/94a08f9e5285890793587209099/Y42CvKMAswsA.mp4
  - title: Plop 简介
    duration: 154
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/94a092af5285890793587209102/hXhotLDCSIEA.mp4
  - title: Plop 的基本使用
    duration: 440
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/cd88f8905285890793336772421/u9E5hAgAU3IA.mp4
  - title: 脚手架的工作原理
    duration: 561
    sources: http://1251429982.vod2.myqcloud.com/02e36d2dvodcq1251429982/cd88f8945285890793336772425/MpaavCr1CpYA.mp4
  # - title: 脚手架工具概要
  #   duration: 172
  #   sources:
  #     - size: 360
  #       src: https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/5a3f26465285890793844220320/v.f20.mp4
  #     - size: 720
  #       src: https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/5a3f26465285890793844220320/v.f30.mp4
  #     - size: 1080
  #       src: https://1251429982.vod2.myqcloud.com/d9cd5ad5vodtranscq1251429982/5a3f26465285890793844220320/v.f40.mp4
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
