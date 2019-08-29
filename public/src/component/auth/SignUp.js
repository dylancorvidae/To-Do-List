import Component from '../Component.js';

class SignUp extends Component {

    onRender(form) {
        const onSignUp = this.props.onSignUp;

        form.addEventListener('submit', event => {
            console.log('hello');
            
            event.preventDefault();

            const formData = new FormData(form);

            const user = {
                displayName: formData.get('name'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            onSignUp(user);
        });
    }

    renderHTML() {
        return /*html*/`
            <form class="auth-form-standard">
                <p>
                    <label for="name">Name</label>
                    <input id="name" name="name" required placeholder="Corvus Corax">
                </p>
                    
                <p>
                    <label for="email">Email</label>
                    <input id="email" type="email" name="email" required placeholder="shinythings@crow.bar">
                </p>
                
                <p>
                    <label for="password">Password</label>
                    <input id="password" type="password" name="password" required placeholder="*********">
                </p>

                <p>
                    <button>Sign Up</button>
                </p>

            </form>
        `;
    }
}

export default SignUp;