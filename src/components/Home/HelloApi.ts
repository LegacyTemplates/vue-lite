import Vue from 'vue';
import { Component, Prop, Watch } from 'vue-property-decorator';
import { client } from '../../shared';
import { Hello } from '../../shared/dtos';

@Component({ template:  
    `<div class="form-group">
        <v-input placeholder="Your name" v-model="txtName" />
        <h3 class="result pt-2">{{ result }}</h3>
    </div>`,
})
export class HelloApi extends Vue {
    @Prop() public name: string;
    public txtName: string = this.name;
    public result: string = '';

    public mounted() {
        this.nameChanged(this.name);
    }

    @Watch('txtName')
    public onNameChanged(value: string, oldValue: string) {
        this.nameChanged(value);
    }

    public async nameChanged(name: string) {
        if (name) {
            const request = new Hello();
            request.name = name;
            const r = await client.get(request);
            this.result = r.result;
        } else {
            this.result = '';
        }
    }
}
export default HelloApi;
Vue.component('hello-api', HelloApi);