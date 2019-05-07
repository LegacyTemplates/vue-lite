import { Vue, Component } from 'vue-property-decorator'
import { client, checkAuth, Register, splitOnFirst, toPascalCase } from '../shared'
import { redirect } from '../shared/router';

@Component({ template: 
    `<div>
        <h3>Register New User</h3>

        <form ref="form" @submit.prevent="submit" :class="{ error:responseStatus, loading }" >
            <div class="form-group">
                <ErrorSummary except="displayName,email,password,confirmPassword" :responseStatus="responseStatus" />
            </div>    
            <div class="form-group">
                <Input id="displayName" v-model="displayName" placeholder="Display Name" :responseStatus="responseStatus" 
                       label="Name" help="Your first and last name" />
            </div>
            <div class="form-group">
                <Input id="email" v-model="email" placeholder="Email" :responseStatus="responseStatus" 
                       label="Email" />
            </div>
            <div class="form-group">
                <Input type="password" id="password" v-model="password" placeholder="Password" :responseStatus="responseStatus" 
                       label="Password" />
            </div>
            <div class="form-group">
                <Input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="Password" :responseStatus="responseStatus" 
                       label="Confirm Password" />
            </div>
            <div class="form-group">
                <CheckBox id="autoLogin" v-model="autoLogin" :responseStatus="responseStatus">
                    Auto Login
                </CheckBox>
            </div>
            <div class="form-group">
                <button class="btn btn-lg btn-primary" type="submit">Register</button>
            </div>
            <div class="pt-3">
                <b>Quick Populate:</b>
                <p class="pt-1">
                    <a class="btn btn-outline-info btn-sm" href="javascript:void(0)" @click.prevent="newUser('new@user.com')">new@user.com</a>
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
            redirect('/');
            
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
