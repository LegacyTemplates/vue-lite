import { Vue, Component, Watch } from 'vue-property-decorator'
import { bus, client, Hello } from '../shared'

@Component({ template:  
    `<div class="container">
        <div class="row">
            <div class="form-group">
                <div>/hello API:</div>
                <input class="form-control" type="text" placeholder="Your name" v-model="txtName" />
                <h3 class="result pt-2">{{ result }}</h3>
            </div>
        </div>
        <div class="row">
            <div v-if="isAuthenticated">
                <p class="pt-3">Hi {{userSession.displayName}}!</p> 
                <a class="btn btn-primary" href="#" @click="signout">Sign Out</a>
            </div>
            <div v-else>
                <p class="pt-3">You're not authenticated, please Sign In:</p>
                <ul class="nav flex-column">
                    <li class="nav-item"><router-link class="nav-link" to="/signin">Sign In</router-link></li>
                    <li class="nav-item"><router-link class="nav-link" to="/signup">Register new User</router-link></li>
                </ul>
            </div>
        </div>
    </div>
    `
})
export class Home extends Vue {
    
    txtName = 'Vue'
    result = ''

    get isAuthenticated() { return bus.store.isAuthenticated; }
    get userSession(){ return bus.store.userSession; }

    created() {
        this.nameChanged(this.txtName);
    }

    @Watch('txtName')
    onTxtNameChanged(value:string) {
        this.nameChanged(value);
    }

    async nameChanged(name:string) {
        this.result = name
            ? (await client.get(new Hello({ name }) )).result
            : '';
    }

    async signout() {
        bus.$emit('signout');
    }

}
