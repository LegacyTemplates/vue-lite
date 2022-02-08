using Funq;
using ServiceStack;
using MyApp.ServiceInterface;

[assembly: HostingStartup(typeof(MyApp.AppHost))]

namespace MyApp;

public class AppHost : AppHostBase, IHostingStartup
{
    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices(services => {
            // Configure ASP.NET Core IOC Dependencies
        });

    public AppHost() : base("MyApp", typeof(MyServices).Assembly) {}

    public override void Configure(Container container)
    {
        SetConfig(new HostConfig
        {
            AddRedirectParamsToQueryString = true,
            EmbeddedResourceBaseTypes = { typeof(ServiceStack.Desktop.DesktopAssets) },
            DebugMode = AppSettings.Get(nameof(HostConfig.DebugMode), HostingEnvironment.IsDevelopment()),
        });

        if (Config.DebugMode)
        {
            Plugins.Add(new HotReloadFeature {
                VirtualFiles = VirtualFiles, // monitor all folders for changes inc. /src & /wwwroot
            });
        }
        
        // enable server-side rendering, see: https://sharpscript.net/docs/sharp-pages
        Plugins.Add(new SharpPagesFeature {
            EnableSpaFallback = true,
        }); 
    }
}
