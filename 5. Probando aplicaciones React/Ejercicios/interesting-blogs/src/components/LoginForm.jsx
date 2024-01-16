import PropTypes from 'prop-types'

const LoginForm = (props) => (
  <div>
    <h2>Log in to see your Blogs</h2>
    <form onSubmit={props.handleLogin}>
      <div>
        <label>Username: </label>
        <input
          type='text'
          value={props.username}
          name='Username'
          onChange={props.handleUsernameChange} />
      </div>
      <div>
        <label>Password: </label>
        <input
          type='password'
          value={props.password}
          name='Password'
          onChange={props.handlePasswordChange} />
      </div>
      <div>
        <button type="submit">Log In</button>
      </div>
    </form>
  </div>
)

LoginForm.PropTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm