import { Vue, Component, Watch } from 'vue-property-decorator'
import { bus, client, Authenticate, errorResponse, errorResponseExcept } from '../shared'
import { router } from '../shared/router';

@Component({ template: `<div>
    <h3>Sign In</h3>
    
    <form ref="form" @submit.prevent="submit" :class="{ error:errorSummary, loading }" >
        <div class="form-row">
            <div v-if="errorSummary" class="alert alert-danger mt-2">{{ errorSummary }}</div>
        </div>
        <div class="form-group">
            <input type="text" :class="['form-control','form-control-lg',{'is-invalid':errorResponse('userName')}]" 
                    v-model="userName" placeholder="UserName">
            <div v-if="errorResponse('userName')" class="invalid-feedback">{{ errorResponse('userName') }}</div>
        </div>
        <div class="form-group">
            <input type="password" :class="['form-control','form-control-lg',{'is-invalid':errorResponse('password')}]" 
                    v-model="password" placeholder="Password">
            <div v-if="errorResponse('password')" class="invalid-feedback">{{ errorResponse('password') }}</div>
        </div>
        <div class="form-group col-md-4">
            <button type="submit" class="btn btn-lg btn-primary">Login</button>
        </div>
        <div class="form-group">
            <input type="checkbox" id="rememberMe" name="rememberMe" value="true">
            <label for="rememberMe">Remember Me</label>
        </div>
        <div class="form-row">
            <router-link class="btn btn-outline-primary" to="/signup">Register New User</router-link>
        </div>
    </form>
    
    <div class="pt-3">
        <b>Quick Login:</b>
        <p class="pt-1">
            <a class="btn btn-outline-info btn-sm" href="#" @click.prevent="switchUser('admin@email.com')">admin@email.com</a>
            <a class="btn btn-outline-info btn-sm" href="#" @click.prevent="switchUser('new@user.com')">new@user.com</a>
        </p>
    </div>
    </div>`
})
export class SignIn extends Vue {
    
    userName = ''
    password = ''
    rememberMe = true
    loading = false
    responseStatus = null

    get errorSummary() { return errorResponseExcept.call(this,'userName,password') }
    errorResponse(name:string) { return errorResponse.call(this,name) }

    async submit() {        
        try {
            this.loading = true;
            this.responseStatus = null;

            const response = await client.post(new Authenticate({
                provider: 'credentials',
                userName: this.userName,
                password: this.password,
                rememberMe: this.rememberMe,
            }));
            bus.$emit('signin', response);

            router.push({ path: '/' });
        } catch (e) {
            this.responseStatus = e.responseStatus || e;
        } finally {
            this.loading = false;
        }
    }

    switchUser(email:string) {
        this.userName = email;
        this.password = 'p@55wOrd';
    }
}
