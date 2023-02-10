# vue-lite

> For a modern Vue 3 Tailwind alternative that also doesn't use an npm build system, checkout the
[Razor Vue Tailwind Templates](https://docs.servicestack.net/vue/#getting-started).

--

.NET 6.0 simple + lite (npm-free) Vue SPA using TypeScript with integrated bundling + hot reloading

[![](https://raw.githubusercontent.com/ServiceStack/Assets/master/csharp-templates/vue-lite.png)](http://vue-lite.web-templates.io/)

> Browse [source code](https://github.com/NetCoreTemplates/vue-lite) and view live demo [vue-lite.web-templates.io](http://vue-lite.web-templates.io)

Install with [x dotnet tool](https://docs.servicestack.net/dotnet-tool):

    $ dotnet tool install -g x

    $ x new vue-lite ProjectName

Alternatively write new project files directly into an empty repository, using the Directory Name as the ProjectName:

    $ git clone https://github.com/<User>/<ProjectName>.git
    $ cd <ProjectName>
    $ x new vue-lite

### About

This template goal is to provide the richest suite of functionality with the least amount of complexity. 
TypeScript was adopted because it runs as a non-invasive global tool with no dependencies that enables us to use 
the latest JavaScript language features to be able to develop with the same source code as a fully-fledged 
npm webpack build system should you wish to upgrade to one in future.

### Development workflow

All that's needed during development is to run TypeScript in "watch" mode:

    $ tsc -w

Which monitors any changes to any `.ts` files and incrementally compiles their `.js` files on save. ServiceStack's built-in 
[static files](https://docs.servicestack.net/templates-single-page-apps#optimal-dev-workflow-with-hot-reloading) hot-reloading detects 
changes to any `.js` files to automatically reload the page, whilst the built-in [dynamic .html page](https://sharpscript.net/docs/hot-reloading) 
monitors for changes to any of its dependent resources.

In a new Terminal window start your .NET Web App HTTP Server with:

    $ dotnet watch

Using `watch run` will monitor changes to `C#` source files where it will automatically re-build and restart the Server.

After changing your ServiceStack Services, you can re-generate their [Typed TypeScript DTOs](https://docs.servicestack.net/typescript-add-servicestack-reference) with:

    $ x ts

#### Bundling

The integrated `.js` and `.css` bundling is configured to use a fast unminified in-memory bundle for an optimal development experience whilst
it utilizes an advanced minified bundle in production releases. 

When publishing, the project's **Bundle** task:

```xml
<Target Name="Bundle" BeforeTargets="AfterPublish">
    <Exec Command="x run _bundle.ss -to /bin/Release/net5/publish/wwwroot" />
</Target>    
```

Runs [_bundle.ss](https://github.com/NetCoreTemplates/vue-lite/blob/master/_bundle.ss) to produce an optimized, minified & hashed bundle using 
ServiceStack's [built-in bundling](https://docs.servicestack.net/html-css-and-javascript-minification#optimal-library-bundles) 
embedded in the [dotnet tools](https://docs.servicestack.net/dotnet-tool) which is pre-configured to use [NUglify's](https://github.com/xoofx/NUglify) 
advanced compression.

### Publishing and Deployment

The standard .NET Core tools can be used to publish:

    $ dotnet publish -c Release

Then deploy as normal, e.g. via [rsync deployments to Linux](https://docs.servicestack.net/netcore-deploy-rsync) or to an 
[AWS EC2 container using Docker](https://docs.servicestack.net/deploy-netcore-docker-aws-ecs).
