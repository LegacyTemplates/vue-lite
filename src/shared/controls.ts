import { Vue, Component, Prop, Emit, Provide } from 'vue-property-decorator';
import { errorResponse, errorResponseExcept } from '../shared'

@Component({ template: `<div v-if="errorSummary" class="alert alert-danger mt-2">{{errorSummary}}</div>` })
export class ErrorSummary extends Vue {
    @Prop({ default: null }) responseStatus!:object
    @Prop({ default: '' }) except!:string
    get errorSummary(){ return errorResponseExcept.call(this.$props, this.except); }
}
Vue.component('ErrorSummary', ErrorSummary);

@Component({ template: 
    `<div>
        <input :type="type" :name="name" @input="onInput" :value="value"
            :class="['form-control',{'is-invalid':errorField},className]"
            :placeholder="placeholder" />
        <div v-if="errorField" class="invalid-feedback">{{ errorField }}</div>
    </div>`
})
export class Input extends Vue {
    @Prop({ default: null }) responseStatus!:object
    @Prop({ default: 'text' }) type!:string
    @Prop({ default: '' }) name!:string
    @Prop({ default: '' }) placeholder!:string
    @Prop({ default: '' }) value!:string
    @Prop({ default: '' }) model!:string
    @Prop({ default: 'form-control-lg' }) className!:string

    get errorField(){ return errorResponse.call(this.$props, this.name); }

    @Emit('input')
    onInput(e:InputEvent) { return e.target.value; }
}
Vue.component('Input', Input);

@Component({ template: 
    `<div>
        <div :class="['form-check',{'is-invalid':errorField,'form-control':errorField}]">
            <input type="checkbox" :id="name" :name="name" @input="onInput" :checked="value" value="true"
                :class="['form-check-input',{'is-invalid':errorField},className]" />
            <label class="form-check-label" :for="name"><slot></slot></label>
        </div>
        <div v-if="errorField" class="invalid-feedback">{{errorField}}</div>
    </div>`
})
export class CheckBox extends Vue {
    @Prop({ default: null }) responseStatus!:object
    @Prop({ default: '' }) name!:string
    @Prop({ default: '' }) placeholder!:string
    @Prop({ default: false }) value!:boolean
    @Prop({ default: '' }) model!:string
    @Prop({ default: '' }) className!:string

    get errorField(){ return errorResponse.call(this.$props, this.name); }

    @Emit('input')
    onInput(e:InputEvent) { return e.target.checked; }
}
Vue.component('CheckBox', CheckBox);
