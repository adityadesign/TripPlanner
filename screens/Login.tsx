import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {FIREBASE_AUTH} from '../firebase/Firebase.config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
//import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}:any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toggleBtn, setToggleBtn] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [error, setError] = useState(false)
  const auth = FIREBASE_AUTH;

  //Function for User Login
  const signIn = async () => {
    setLoading(true);
    setError(false)
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log(response);
      navigation.navigate('Home')
    } catch (err) {
      console.log(err);
      setError(true)
    } finally {
      setLoading(false);
    }
  };

  //Function for new User Registration
  const signUp = async () => {
    setLoading(true);
    setPasswordMatch(true)
    setError(false)
    if (password === confirmPassword) {
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        console.log(response);
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setLoading(false);
      }
    } else {
        console.log('Password does not matches')
        setLoading(false)
        setPasswordMatch(false)
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1}}>
        <View style={{flex: 0.6, justifyContent: 'flex-end'}}>
          <View style={styles.logo}>
            <Image
              style={{flex: 0, alignSelf: 'center'}}
              source={require('../Images/Logo.png')}
            />
          </View>
          <Text style={styles.brand}>Trip Adviser</Text>
        </View>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.btnsView}>
            <TouchableOpacity
              onPress={() => {
                if (!toggleBtn) setToggleBtn(true);
              }}
              style={[
                styles.btn,
                toggleBtn && {
                  backgroundColor: '#FE726DFF',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                },
              ]}>
              <Text style={styles.btnText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (toggleBtn) setToggleBtn(false);
              }}
              style={[
                styles.btn,
                !toggleBtn && {
                  backgroundColor: '#FE726DFF',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                },
              ]}>
              <Text style={styles.btnText}>SignUp</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="email"
              autoCapitalize="none"
              value={email}
              onChangeText={text => setEmail(text)}></TextInput>
            <TextInput
              style={styles.input}
              placeholder="password"
              autoCapitalize="none"
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}></TextInput>
            {!toggleBtn && (
              <TextInput
                style={styles.input}
                placeholder="confirm password"
                autoCapitalize="none"
                value={confirmPassword}
                secureTextEntry={true}
                onChangeText={text => setConfirmPassword(text)}></TextInput>
            )}
            {!passwordMatch && <Text style={styles.errText}>Password does not matches*</Text>}
            {error && <Text style={styles.errText}>Enter the details properly*</Text>}
          </View>

          {loading ? (
            <ActivityIndicator
              color="#fe4b44"
              style={{marginTop: 15}}
              size={40}
            />
          ) : (
            <TouchableOpacity
              style={styles.loginSignUpBtn}
              onPress={toggleBtn ? signIn : signUp}>
              <Text style={styles.btnText}>
                {toggleBtn ? 'Login' : 'SignUp'}
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 30,
  },
  logo: {
    flex: 0,
    alignSelf: 'center',
    borderWidth: 2,
    borderRadius: 100,
    padding: 5,
  },
  brand: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '700',
    marginBottom: 30,
  },
  btnsView: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#fe4b44',
    borderRadius: 10,
    marginBottom: 20,
  },
  btn: {
    paddingVertical: 10,
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  inputView: {
    flex: 0,
    gap: 10,
  },
  input: {
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  loginSignUpBtn: {
    flex: 0,
    backgroundColor: '#fe4b44',
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
  },
  errText:{
    color: 'red',
    fontWeight: '500'
  }
});

export default Login;
