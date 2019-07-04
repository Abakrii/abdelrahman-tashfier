import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'
import {connect} from 'react-redux';
import {authSingIn} from '../../store/actions/index';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json


class LoginForm extends Component {
 
  

  // state = {
  //   email: '',
  //   password: '',
  //   fullName: ''
  // }
  state={
   
    controls:{
        email:{
            value:"",

        },
        password:{
            value:"",
        },
    }
};

updateInputState = (key, value) => {
  this.setState(prevState => {
      return {
          controls: {
              ...prevState.controls,
              [key]: {
                  ...prevState.controls[key],
                  value: value,
              }
          }
      };
  });
};


// onPressFunc =({props}) =>{
//   console.log("porps" , props);
//   console.log("this props", this.props);
 
//  this.props.navigation.dispatch(StackActions.reset({
//        index: 0,
//        actions: [
//          NavigationActions.navigate({ routeName: 'Details' })
//        ],
//      }))
  
// }
  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }
  authHandler = ({props} ) =>{
    const  authData ={
        email:this.state.controls.email.value,
        password:this.state.controls.password.value
    };
    this.props.onTryAuth(authData);
    console.log("props in auth" , this.props)
    // this.props.navigation.dispatch(StackActions.reset({
    //   index: 0,
    //   actions: [
    //     NavigationActions.navigate({ routeName: 'Details' })
    //   ],
    // }))
   
};

  render () {
    const { email, password } = this.state
    const { isLoading, onSignupLinkPress, onLoginPress } = this.props
    const isValid = email !== '' && password !== ''
    return (
      <View style={styles.container}>
        <View style={styles.form} ref={(ref) => { this.formRef = ref }}>
          <CustomTextInput
            name={'email'}
            ref={(ref) => this.emailInputRef = ref}
            placeholder={'Email'}
            keyboardType={'email-address'}
            editable={!isLoading}
            returnKeyType={'next'}
            blurOnSubmit={false}
            withRef={true}
            onSubmitEditing={() => this.passwordInputRef.focus()}

           onChangeText={val=>this.updateInputState("email",val)}
            isEnabled={!isLoading}
          />
          <CustomTextInput
            name={'password'}
            ref={(ref) => this.passwordInputRef = ref}
            placeholder={'Password'}
            editable={!isLoading}
            returnKeyType={'done'}
            secureTextEntry={true}
            withRef={true}
          
            onChangeText={val=>this.updateInputState("password",val)}

            isEnabled={!isLoading}

          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
         {this.props.isLoading ? <ActivityIndicator size="large" color="#fff"/> :
          <CustomButton
          onPress={this.authHandler}

          isEnabled={isValid}
          isLoading={isLoading}
          buttonStyle={styles.loginButton}
          textStyle={styles.loginButtonText}
          text={'Log In'}
        /> }
            
          </View>
          <Text
            ref={(ref) => this.linkRef = ref}
            style={styles.signupLink}
            onPress={onSignupLinkPress}
            animation={'fadeIn'}
            duration={600}
            delay={400}
          >
            {'Not registered yet?'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1
  },
  form: {
    marginTop: 20
  },
  footer: {
    height: 100,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'white'
  },
  loginButtonText: {
    color: '#3E464D',
    fontWeight: 'bold'
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    alignSelf: 'center',
    padding: 20
  }
})

const mapStateToProps = state =>{
  return{
      isLoading :state.ui.isLoading,
      auth: state.auth

  }  ;
};

const mapDispatchToProps = dispatch => {
  return{
      onTryAuth:(authData)=> dispatch(authSingIn(authData)),

  };
};
export default connect(mapStateToProps ,mapDispatchToProps)(LoginForm);
