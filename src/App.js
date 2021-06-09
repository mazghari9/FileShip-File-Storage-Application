import React from "react"
import Signup from "./components/authentication/SignUpComponent"
import { AuthProvider } from "./contexts/AuthenticationContexts"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Profile from "./components/authentication/ProfileComponent"
import Login from "./components/authentication/SignInComponent"
import PrivateRoute from "./components/authentication/OnlyUsersRoutes"
import ForgotPassword from "./components/authentication/ResetPasswordComponent"
import UpdateProfile from "./components/authentication/UpdateProfileComponent"
import './Logo.css'
import MainFolder from "./components/features/MainFolderComponent"
import WelcomePage from './components/features/WelcomePage'


function App() {
  return (

        <Router>
          <AuthProvider>
            <Switch>

              {/*features*/}
              <Route exact path="/" component={WelcomePage}/>
              <PrivateRoute exact path="/files" component={MainFolder}/>
              <PrivateRoute path='/folder/:folderId' component={MainFolder} />

              {/*Profile*/}
              <PrivateRoute path="/user" component={Profile} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />

              {/*Authentication*/}
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />

            </Switch>
          </AuthProvider>
        </Router>
      
  )
}

export default App
