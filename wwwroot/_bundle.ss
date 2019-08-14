```code
* run in host project directory with `web run wwwroot/_bundle.ss` *

false | to => debug
(debug ? '' : '.min')       | to => min
(debug ? '' : '[hash].min') | to => dist

{{ [`/css/lib.bundle${dist}.css`,`/js/lib.bundle${dist}.js`,`/js/bundle${dist}.js`] 
   | map => it.replace('[hash]','.*').findFiles()
   | flatten
   | do => it.VirtualPath.deleteFile() }}

* Copy same bundle definitions from _layout.html as-is *

['!/assets/css/default.css','/assets/css/'] | bundleCss({ disk:!debug, out:`/css/lib.bundle${dist}.css` })

{{ [
    `/lib/vue/dist/vue${min}.js`,
    `/lib/vue-router/dist/vue-router${min}.js`,
    '/lib/vue-class-component/vue-class-component.js',
    '/lib/vue-property-decorator/vue-property-decorator.umd.js',
    '/lib/@servicestack/client/servicestack-client.umd.js',
    '/lib/@servicestack/vue/servicestack-vue.umd.js',
] | bundleJs({ disk:!debug, out:`/js/lib.bundle${dist}.js` }) }}

{{ [
    'content:/src/components/',
    'content:/src/shared/',
    'content:/src/',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:`/js/bundle${dist}.js`, iife:true }) }}
```
