import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ template: 
    `<div id="about">
        <div class="svg-users svg-8x ml-2"/>
        <h3>{{message}}</h3>
    </div>`
})
export class About extends Vue {
    @Prop({ default: null }) message: string;
}
export default About;
