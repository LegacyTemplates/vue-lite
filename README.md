# vue-lite

.NET Core 2.1 simple + lite (npm-free) Vue SPA using TypeScript with integrated bundling + hot reloading

[![](https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/vue-lite.png)](http://vue-lite.web-templates.io/)

> Browse [source code](https://github.com/NetCoreTemplates/vue-lite) and view live demo [vue-lite.web-templates.io](http://vue-lite.web-templates.io)

Install with `web` .NET Core tool:

    $ dotnet tool install -g web

    $ web new vue-lite ProjectName

### About

This template goal is to provide the richest suite of functionality with the least amount of complexity. 
TypeScript was adopted because it runs as a non-invasive global tool with no dependencies that enables us to use 
the latest JavaScript language features to be able to develop with the same source code as a fully-fledged 
npm webpack build system should you wish to upgrade to one in future.

### Development workflow

All that's needed during development is to run TypeScript in "watch" mode:

    $ tsc -w

To update all generated `*dtos.ts`, run:

    $ web ts

The built-in hot-reloading will monitor both the current pages dependent `*.html` files and monitor for any `*.js` changes
that TypeScript generates on save.

The integrated bundling is configured to use an optimal unminified in-memory bundle during development and
an in-memory minified cached bundle for production releases, or optionally the same bundling config in 
[_bundle.ss](https://github.com/NetCoreTemplates/vue-lite/blob/master/wwwroot/_bundle.ss)
can be used to generate a more optimized bundle using NUglify with:

    $ web run wwwroot\_bundle.ss

### Publishing and deployment

The standard .NET Core tools can be used to publish:

    $ dotnet publish -c Release

Then deploy as normal, e.g. via [rsync deployments to Linux](https://docs.servicestack.net/netcore-deploy-rsync) or to an 
[AWS EC2 container using Docker](https://docs.servicestack.net/deploy-netcore-docker-aws-ecs).
