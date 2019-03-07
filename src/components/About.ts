import { Vue, Component } from 'vue-property-decorator';

@Component({ template: 
    `<div id="about">
        <h3>{{ message }}</h3>
    </div>`
})
export class About extends Vue {
    message = 'About page'
}