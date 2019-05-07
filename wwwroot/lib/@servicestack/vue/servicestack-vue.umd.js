var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "vue", "vue-property-decorator", "@servicestack/client"], factory);
    }
    else if (typeof window != "undefined") factory(window.require||function(){}, window["@servicestack/vue"]={});
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var vue_1 = require("vue") || { default: window.Vue };
    var vue_property_decorator_1 = require("vue-property-decorator") || window["vue-property-decorator"];
    var client_1 = require("@servicestack/client") || window["@servicestack/client"];
    var ErrorSummary = /** @class */ (function (_super) {
        __extends(ErrorSummary, _super);
        function ErrorSummary() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ErrorSummary.prototype, "errorSummary", {
            get: function () { return client_1.errorResponseExcept.call(this.$props, this.except); },
            enumerable: true,
            configurable: true
        });
        __decorate([
            vue_property_decorator_1.Prop({ default: null })
        ], ErrorSummary.prototype, "responseStatus", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], ErrorSummary.prototype, "except", void 0);
        ErrorSummary = __decorate([
            vue_property_decorator_1.Component({ template: "<div v-if=\"errorSummary\" class=\"alert alert-danger mt-2\">{{errorSummary}}</div>" })
        ], ErrorSummary);
        return ErrorSummary;
    }(vue_1.default));
    exports.ErrorSummary = ErrorSummary;
    vue_1.default.component('ErrorSummary', ErrorSummary);
    var Input = /** @class */ (function (_super) {
        __extends(Input, _super);
        function Input() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Input.prototype.concat = function (prefix, id, suffix) { return prefix + id + (suffix || ''); };
        Object.defineProperty(Input.prototype, "isCheck", {
            get: function () { return this.type == 'radio' || this.type == 'checkbox'; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "errorField", {
            get: function () { return client_1.errorResponse.call(this.$props, this.id); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "hasError", {
            get: function () { return !!this.errorField; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Input.prototype, "kvpValues", {
            get: function () {
                var kvps = (this.values || []).map(function (x) { return typeof x == 'string'
                    ? { key: x, value: x }
                    : x; });
                return kvps;
            },
            enumerable: true,
            configurable: true
        });
        Input.prototype.onInput = function (e) { return e.target.value; };
        Input.prototype.onInputValues = function (e) { return inputSelectedValues(e.target); };
        Input.prototype.hasValue = function (elValue) {
            return this.type == 'checkbox'
                ? (this.value instanceof Array
                    ? this.value.indexOf(elValue) >= 0
                    : false)
                : this.value == elValue;
        };
        __decorate([
            vue_property_decorator_1.Prop({ default: null })
        ], Input.prototype, "responseStatus", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: 'text' })
        ], Input.prototype, "type", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], Input.prototype, "id", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], Input.prototype, "placeholder", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], Input.prototype, "label", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], Input.prototype, "help", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: 'form-control-lg' })
        ], Input.prototype, "inputClass", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: false })
        ], Input.prototype, "inline", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: function () { return null; } })
        ], Input.prototype, "value", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: function () { return []; } })
        ], Input.prototype, "values", void 0);
        __decorate([
            vue_property_decorator_1.Emit('input')
        ], Input.prototype, "onInput", null);
        __decorate([
            vue_property_decorator_1.Emit('input')
        ], Input.prototype, "onInputValues", null);
        Input = __decorate([
            vue_property_decorator_1.Component({ template: "<div>\n        <label v-if=\"label\" :class=\"isCheck ? 'form-check-label' : 'form-label'\" :for=\"id\">{{label}}</label>\n        <div v-if=\"isCheck\" :class=\"['form-check',{'is-invalid':hasError,'form-control':hasError}]\">\n            <div v-if=\"type == 'radio'\" v-for=\"kvp in kvpValues\" :class=\"['custom-control','custom-radio',{'custom-control-inline':inline}]\">\n                <input type=\"radio\" :id=\"concat(id,'-',kvp.key)\" :name=\"id\" :value=\"kvp.key\" \n                       :class=\"['custom-control-input',inputClass]\" :checked=\"value==kvp.key\" @change=\"onInput\" />\n                <label class=\"custom-control-label\" :for=\"concat(id,'-',kvp.key)\">{{kvp.value}}</label> \n            </div>\n            <div v-if=\"type == 'checkbox'\" v-for=\"kvp in kvpValues\" :class=\"['custom-control','custom-checkbox',{'custom-control-inline':inline}]\">\n                <input type=\"checkbox\" :id=\"concat(id,'-',kvp.key)\" :name=\"id\" :value=\"kvp.key\" \n                       :class=\"['form-check-input']\" :checked=\"hasValue(kvp.key)\" @change=\"onInputValues\" />\n                <label class=\"form-check-label\" :for=\"concat(id,'-',kvp.key)\">{{kvp.value}}</label> \n            </div>\n            <small v-if=\"help\" class=\"text-muted\">{{help}}</small>\n        </div>\n        <input v-if=\"!isCheck\" :type=\"type\" :id=\"id\" :name=\"id\" @input=\"onInput\" :value=\"value\"\n            :class=\"['form-control',{'is-invalid':errorField},inputClass]\"\n            :placeholder=\"placeholder\" />\n        <small v-if=\"!isCheck && help\" class=\"text-muted\">{{help}}</small>\n        <div v-if=\"hasError\" class=\"invalid-feedback\">{{ errorField }}</div>\n    </div>"
            })
        ], Input);
        return Input;
    }(vue_1.default));
    exports.Input = Input;
    vue_1.default.component('Input', Input);
    function inputSelectedValues(input) {
        if (input.form == null)
            throw new Error("multiple values must be within a <form> element");
        var selectedValues = [];
        var elements = input.form.elements;
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            if (el.name == input.name && el.checked) {
                selectedValues.push(el.value);
            }
        }
        return selectedValues;
    }
    var Select = /** @class */ (function (_super) {
        __extends(Select, _super);
        function Select() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Select.prototype, "errorField", {
            get: function () { return client_1.errorResponse.call(this.$props, this.id); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Select.prototype, "hasError", {
            get: function () { return !!this.errorField; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Select.prototype, "kvpValues", {
            get: function () {
                var kvps = (this.values || []).map(function (x) { return typeof x == 'string'
                    ? { key: x, value: x }
                    : x; });
                return kvps;
            },
            enumerable: true,
            configurable: true
        });
        Select.prototype.hasValue = function (elValue) {
            return this.multiple
                ? (this.value instanceof Array
                    ? this.value.indexOf(elValue) >= 0
                    : false)
                : this.value == elValue;
        };
        Select.prototype.onInputValues = function (e) {
            return this.multiple ? selectedOptions(e.target) : e.target.value;
        };
        __decorate([
            vue_property_decorator_1.Prop({ default: null })
        ], Select.prototype, "responseStatus", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], Select.prototype, "id", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], Select.prototype, "label", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], Select.prototype, "help", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: 'form-control form-control-lg' })
        ], Select.prototype, "selectClass", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: false })
        ], Select.prototype, "multiple", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: function () { return null; } })
        ], Select.prototype, "value", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: function () { return []; } })
        ], Select.prototype, "values", void 0);
        __decorate([
            vue_property_decorator_1.Emit('input')
        ], Select.prototype, "onInputValues", null);
        Select = __decorate([
            vue_property_decorator_1.Component({ template: "<div>\n        <label v-if=\"label\" class=\"form-label\">{{label}}</label>\n        <select :id=\"id\" :name=\"id\" :class=\"['form-control',{'is-invalid':errorField}, selectClass]\" \n                :multiple=\"multiple\" @change=\"onInputValues\">\n            <option v-for=\"kvp in kvpValues\" :value=\"kvp.key\" :selected=\"hasValue(kvp.key)\">{{kvp.value}}</option>\n        </select>\n        <small v-if=\"help\" class=\"text-muted\">{{help}}</small>\n        <div v-if=\"errorField\" class=\"invalid-feedback\">{{errorField}}</div>\n    </div>"
            })
        ], Select);
        return Select;
    }(vue_1.default));
    exports.Select = Select;
    vue_1.default.component('Select', Select);
    function selectedOptions(select) {
        var selectedValues = [];
        for (var i = 0; i < select.options.length; i++) {
            if (select.options[i].selected) {
                selectedValues.push(select.options[i].value);
            }
        }
        return selectedValues;
    }
    var CheckBox = /** @class */ (function (_super) {
        __extends(CheckBox, _super);
        function CheckBox() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(CheckBox.prototype, "errorField", {
            get: function () { return client_1.errorResponse.call(this.$props, this.id); },
            enumerable: true,
            configurable: true
        });
        CheckBox.prototype.onInput = function (e) { return e.target.checked; };
        __decorate([
            vue_property_decorator_1.Prop({ default: null })
        ], CheckBox.prototype, "responseStatus", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], CheckBox.prototype, "id", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], CheckBox.prototype, "placeholder", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: false })
        ], CheckBox.prototype, "value", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], CheckBox.prototype, "help", void 0);
        __decorate([
            vue_property_decorator_1.Prop({ default: '' })
        ], CheckBox.prototype, "inputClass", void 0);
        __decorate([
            vue_property_decorator_1.Emit('input')
        ], CheckBox.prototype, "onInput", null);
        CheckBox = __decorate([
            vue_property_decorator_1.Component({ template: "<div>\n        <div :class=\"['form-check',{'is-invalid':errorField,'form-control':errorField}]\">\n            <input type=\"checkbox\" :id=\"id\" :name=\"id\" @input=\"onInput\" :checked=\"value\" value=\"true\"\n                :class=\"['form-check-input',{'is-invalid':errorField},inputClass]\" />\n            <label class=\"form-check-label\" :for=\"id\"><slot></slot></label>\n        </div>\n        <small v-if=\"help\" class=\"text-muted\">{{help}}</small>\n        <div v-if=\"errorField\" class=\"invalid-feedback\">{{errorField}}</div>\n    </div>"
            })
        ], CheckBox);
        return CheckBox;
    }(vue_1.default));
    exports.CheckBox = CheckBox;
    vue_1.default.component('CheckBox', CheckBox);
});
