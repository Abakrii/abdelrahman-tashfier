import React, { Component } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import { Text, View } from 'react-native-animatable'

import CustomButton from '../../components/CustomButton'
import CustomTextInput from '../../components/CustomTextInput'
import metrics from '../../config/metrics'
import {connect} from 'react-redux';
import {authSingIn } from '../../store/actions/index';
class LoginForm extends Component {
 
  

  // state = {
  //   email: '',
  //   password: '',
  //   fullName: ''
  // }
  state={
   
    authMode:"login",
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



  hideForm = async () => {
    if (this.buttonRef && this.formRef && this.linkRef) {
      await Promise.all([
        this.buttonRef.zoomOut(200),
        this.formRef.fadeOut(300),
        this.linkRef.fadeOut(300)
      ])
    }
  }
  authHandler = ( ) =>{
    const  authData ={
        email:this.state.controls.email.value,
        password:this.state.controls.password.value
    };
    this.props.onTryAuth(authData ,this.state.authMode );
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
           // onChangeText={(value) => this.setState({ email: value })}
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
            //onChangeText={(value) => this.setState({ password: value })}
            onChangeText={val=>this.updateInputState("password",val)}

            isEnabled={!isLoading}

          />
        </View>
        <View style={styles.footer}>
          <View ref={(ref) => this.buttonRef = ref} animation={'bounceIn'} duration={600} delay={400}>
         {this.props.isLoading ? <ActivityIndicator size="large" color="#fff"/> :
          <CustomButton
          //onPress={() => onLoginPress(email, password)}
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
      isLoading :state.ui.isLoading
  }  ;
};

const mapDispatchToProps = dispatch=>{
  return{
      onTryAuth:(authData , authMode)=> dispatch(authSingIn(authData, authMode)),
     // onAutoSignIn:()=> dispatch(authAutoSignIn())
  };
};
export default connect(mapStateToProps ,mapDispatchToProps)(LoginForm);
