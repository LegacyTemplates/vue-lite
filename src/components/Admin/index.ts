import { Component, Vue } from 'vue-property-decorator';
import { store } from '../../shared';

@Component({ template: 
    `<div id="admin" class="text-center">
        <div class="svg-female-business svg-8x ml-2"/>
        <p class="my-2">
            {{user.displayName}}
        </p>
        <p>
            {{user.userName}}
        </p>
        <p v-if="user && user.roles" class="roles">
            <mark v-for="x in user.roles" :key="x">{{x}}</mark>
        </p>
        <h3 class="mt-5">Admin Page</h3>
    </div>`
})
export class Admin extends Vue {
    protected get user() {
        return store.userSession;
    }
}
export default Admin;
