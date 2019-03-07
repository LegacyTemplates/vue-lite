import { Vue, Component, Watch } from 'vue-property-decorator'
import { bus, client, checkAuth, Register, errorResponse, errorResponseExcept, splitOnFirst, toPascalCase } from '../shared'
import { router } from '../shared/router';

@Component({ template: `<div>
    <h3>Register New User</h3>

    <form ref="form" @submit.prevent="submit" :class="[{ error:errorSummary, loading }]" >
        <div class="form-group">
            <div v-if="errorSummary" class="alert alert-danger mt-2">{{ errorSummary }}</div>
        </div>
    
        <div class="form-group">
            <input type="text" :class="['form-control','form-control-lg',{'is-invalid':errorResponse('displayName')}]" 
                   v-model="displayName" placeholder="Display Name">
            <div v-if="errorResponse('displayName')" class="invalid-feedback">{{ errorResponse('displayName') }}</div>
        </div>
        <div class="form-group">
            <input type="text" :class="['form-control','form-control-lg',{'is-invalid':errorResponse('email')}]" 
                   v-model="email" placeholder="Email">
            <div v-if="errorResponse('email')" class="invalid-feedback">{{ errorResponse('email') }}</div>
        </div>
        <div class="form-group">
            <input type="password" :class="['form-control','form-control-lg',{'is-invalid':errorResponse('password')}]" 
                   v-model="password" placeholder="Password">
            <div v-if="errorResponse('password')" class="invalid-feedback">{{ errorResponse('password') }}</div>
        </div>
        <div class="form-group">
            <input type="password" :class="['form-control','form-control-lg',{'is-invalid':errorResponse('confirmPassword')}]" 
                   v-model="confirmPassword" placeholder="Confirm Password">
            <div v-if="errorResponse('confirmPassword')" class="invalid-feedback">{{ errorResponse('confirmPassword') }}</div>
        </div>
        <div class="form-group">
            <input type="checkbox" id="autoLogin" v-model="autoLogin" value="true" checked>
            <label for="autoLogin" class="form-check-label">Auto Login</label>
        </div>
        <div class="form-group">
            <button class="btn btn-lg btn-primary" type="submit">Register</button>
        </div>
        <div class="pt-3">
        <b>Quick Populate:</b>
            <p class="pt-1">
                <a class="btn btn-outline-info btn-sm" href="#" @click.prevent="newUser('new@user.com')">new@user.com</a>
            </p>
        </div>
    </form>
    </div>`
})
export class SignUp extends Vue {
    displayName = ''
    email = ''
    password = ''
    confirmPassword = ''
    autoLogin = true
    loading = false
    responseStatus = null

    get errorSummary() { return errorResponseExcept.call(this,'displayName,email,password,confirmPassword') }
    errorResponse(name:string) { return errorResponse.call(this,name) }

    async submit() {        
        try {
            this.loading = true;
            this.responseStatus = null;

            const response = await client.post(new Register({
                displayName: this.displayName,
                email: this.email,
                password: this.password,
                confirmPassword: this.confirmPassword,
                autoLogin: this.autoLogin,
            }));
            
            await checkAuth();

            router.push({ path: '/' });
        } catch (e) {
            this.responseStatus = e.responseStatus || e;
        } finally {
            this.loading = false;
        }
    }

    newUser(email:string) {
        const names = email.split('@');
        this.displayName = toPascalCase(names[0]) + " " + toPascalCase(splitOnFirst(names[1],'.')[0]);
        this.email = email;
        this.password = this.confirmPassword = 'p@55wOrd';
    }


}
