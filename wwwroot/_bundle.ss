{{* run in host project directory with `web run wwwroot/_bundle.ss` *}}

{{ false | assignTo: debug }}
{{ (debug ? '' : '.min') | assignTo: min }}
{{ [`/css/bundle${min}.css`,`/js/lib.bundle${min}.js`,`/js/bundle${min}.js`] | map => fileDelete(it) | end }}

{{* Copy same bundle defintions from _layout.html as-is *}}

{{ ['/assets/css/'] | bundleCss({ minify:!debug, cache:!debug, disk:!debug, out:`/css/bundle${min}.css` }) }}

{{ [
    `/lib/vue/dist/vue${min}.js`,
    `/lib/vue-router/dist/vue-router${min}.js`,
    '/lib/vue-class-component/vue-class-component.js',
    '/lib/vue-property-decorator/vue-property-decorator.umd.js',
    '/lib/@servicestack/client/servicestack-client.umd.js',
    '/lib/@servicestack/vue/servicestack-vue.umd.js',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:`/js/lib.bundle${min}.js` }) }}

{{ [
    'content:/src/components/',
    'content:/src/shared/',
    'content:/src/',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:`/js/bundle${min}.js`, iife:true }) }}
