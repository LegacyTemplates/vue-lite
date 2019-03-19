using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Funq;
using ServiceStack;
using ServiceStack.Text;
using ServiceStack.Configuration;
using ServiceStack.Validation;
using MyApp.ServiceInterface;

namespace MyApp
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public Startup(IConfiguration configuration) => Configuration = configuration;

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseServiceStack(new AppHost
            {
                AppSettings = new NetCoreAppSettings(Configuration)
            });
        }
    }

    public class AppHost : AppHostBase
    {
        public AppHost() : base("MyApp", typeof(MyServices).Assembly) { }

        // Configure your AppHost with the necessary configuration and dependencies your App needs
        public override void Configure(Container container)
        {
            SetConfig(new HostConfig
            {
                DebugMode = AppSettings.Get(nameof(HostConfig.DebugMode), false),
                AddRedirectParamsToQueryString = true,
                UseSameSiteCookies = true,
            });
            
            // enable server-side rendering, see: https://sharpscript.net/docs/sharp-pages
            Plugins.Add(new SharpPagesFeature()); 

            Plugins.Add(new ValidationFeature());

            if (Config.DebugMode)
            {
                Plugins.Add(new HotReloadFeature {
                    DefaultPattern = "*.html;*.js;*.css",
                    VirtualFiles = VirtualFiles // Monitor ContentRoot to detect changes in /src
                });
            }
        }
    }
}
