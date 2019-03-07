{{* run in host dir with: web run wwwroot/_bundle.ss *}}

{{ false | assignTo: debug }}

{{ ['/assets/css/'] | bundleCss({ minify:debug, disk:!debug, bundle:!debug })  }}

{{ [
    '/lib/vue/dist/vue.js',
    '/lib/vue-router/dist/vue-router.js',
    '/lib/vue-class-component/vue-class-component.js',
    '/lib/vue-property-decorator/vue-property-decorator.umd.js',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:'/js/lib.bundle.js' }) }}

{{ [
    '/lib/@servicestack/client/index.js',
    'content:/src/components/',
    'content:/src/shared/',
    'content:/src/',
] | bundleJs({ minify:!debug, cache:!debug, disk:!debug, out:'/js/bundle.js' }) }}
