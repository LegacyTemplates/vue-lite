{{* run in host project directory with `web run wwwroot/_bundle.ss` *}}

{{ false | assignTo: debug }}
{{ (debug ? '' : '[hash].min') | assignTo: min }}
{{ [`/css/bundle${min}.css`,`/js/lib.bundle${min}.js`,`/js/bundle${min}.js`] 
   | map => filesFind(replace(it,'[hash]','.*'))
   | flatten
   | map => fileDelete(it.VirtualPath) | end }}

{{* Copy same bundle defintions from _layout.html as-is *}}

{{ ['!/assets/css/default.css','/assets/css/'] | bundleCss({ disk:!debug, out:`/css/lib.bundle${min}.css` }) }}

{{ [
    `/lib/vue/dist/vue${min}.js`,
    `/lib/vue-router/dist/vue-router${min}.js`,
    '/lib/vue-class-component/vue-class-component.js',
    '/lib/vue-property-decorator/vue-property-decorator.umd.js',
    '/lib/@servicestack/client/servicestack-client.umd.js',
    '/lib/@servicestack/vue/servicestack-vue.umd.js',
] | bundleJs({ disk:!debug, out:`/js/lib.bundle${min}.js` }) }}

{{ [
    'content:/src/components/',
    'content:/src/shared/',
    'content:/src/',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:`/js/bundle${min}.js`, iife:true }) }}
