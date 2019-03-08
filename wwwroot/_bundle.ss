{{* run in host project directory with `web run wwwroot/_bundle.ss` *}}

{{ ['/css/bundle.css','/js/lib.bundle.js','/js/bundle.js'] | map => fileDelete(it) | end }}

{{ false | assignTo: debug }}
{{* Copy same bundle defintions from _layout.html as-is *}}

{{ ['/assets/css/'] | bundleCss({ minify:debug, cache:!debug, disk:!debug }) }}

{{ (debug ? '' : '.min') | assignTo: minjs }}
{{ [
    `/lib/vue/dist/vue${minjs}.js`,
    `/lib/vue-router/dist/vue-router${minjs}.js`,
    '/lib/vue-class-component/vue-class-component.js',
    '/lib/vue-property-decorator/vue-property-decorator.umd.js',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:'/js/lib.bundle.js' }) }}

{{ [
    '/lib/@servicestack/client/index.js',
    'content:/src/components/',
    'content:/src/shared/',
    'content:/src/',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:'/js/bundle.js' }) }}
