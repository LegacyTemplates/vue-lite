import { Vue } from 'vue-property-decorator';
export declare class ErrorSummary extends Vue {
    responseStatus: object;
    except: string;
    readonly errorSummary: any;
}
export declare class Input extends Vue {
    responseStatus: object;
    type: string;
    id: string;
    placeholder: string;
    label: string;
    help: string;
    inputClass: string;
    inline: boolean;
    value: string[] | string;
    values: any[];
    concat(prefix: string, id: string, suffix: string): string;
    readonly isCheck: boolean;
    readonly errorField: any;
    readonly hasError: boolean;
    readonly kvpValues: any[];
    onInput(e: InputEvent): string;
    onInputValues(e: InputEvent): any[];
    hasValue(elValue: string): boolean;
}
export declare class Select extends Vue {
    responseStatus: object;
    id: string;
    label: string;
    help: string;
    selectClass: string;
    multiple: boolean;
    value: string[] | string;
    values: any[];
    readonly errorField: any;
    readonly hasError: boolean;
    readonly kvpValues: any[];
    hasValue(elValue: string): boolean;
    onInputValues(e: InputEvent): string | any[];
}
export declare class CheckBox extends Vue {
    responseStatus: object;
    id: string;
    placeholder: string;
    value: boolean;
    help: string;
    inputClass: string;
    readonly errorField: any;
    onInput(e: InputEvent): boolean;
}
