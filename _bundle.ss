```code
* run in .csproj AfterPublish, manual usage: `x run _bundle.ss -to <path>` *

let dist = '[hash].min'
{{ [`bundle${dist}.css`,`bundle${dist}.js`] 
   |> map => vfsContent.findFilesInDirectory(to,it.replace('[hash]','.*'))
   |> flat
   |> do => vfsContent.deleteFile(it.VirtualPath) }}

[ 'content:/src/css/' ] |> bundleCss({ minify:true, disk:true, out:`content:${to}/bundle${dist}.css` })

{{ [
    'content:/src/components/',
    'content:/src/shared/',
    'content:/src/',
] |> bundleJs({ minify:true, disk:true, out:`content:${to}/bundle${dist}.js`, iife:true }) }}
```
