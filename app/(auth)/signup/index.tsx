import { useLayoutEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {  Link, router, useNavigation } from 'expo-router';
import { z } from 'zod';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from '@/lib/supabase';
import { zodResolver } from '@hookform/resolvers/zod';
import ComponentLayout from '@/layout/ComponentLayout';
import theme from '@/constants/Theme';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
 

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation(); 
  const { t } = useTranslation(); 
  const signUpSchema = z.object({
    name: z.string().min(2, t('register.errors.name')),
    email: z.string().trim().email(t('register.errors.email')),
    password: z
      .string()
      .min(6, t('register.errors.password1'))
      .max(50, t('register.errors.password2')),
  });
  
  type SignUpForm = z.infer<typeof signUpSchema>;

  const { control, handleSubmit, formState: { errors } } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema)
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, 
    })
  }, [])


  /* Una vez que la información del formulario se haya completado y validado */
  const onSubmit = async (data: SignUpForm) => {
    try {
      setLoading(true);
      setError(null);
      // Registrar usuario en Supabase Auth
      const { data: { user }, error: signupError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          }
        }
      });
      if (signupError) {
        throw signupError;
      }

      // Inserto el ususario en la tabla de usuarios
      if (user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({
            user_id: user.id,
            username: data.name,
            email: data.email,
          });
        if (insertError) {
          throw insertError;
        }
      }
      
      // El usuario inicia sesión automáticamente después de registrarse
      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (loginError) {
        throw loginError;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ha ocurrido un error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ComponentLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <Text style={styles.title}>{t('register.hello')}</Text>

              <View style={styles.form}>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>{t('register.name')}</Text>
                      <View style={styles.inputWrapper}>
                        <Ionicons name="person-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="Sergio"
                          placeholderTextColor="#999"
                          autoCapitalize="words"
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                      {errors.name && (
                        <Text style={styles.errorMessage}>{errors.name.message}</Text>
                      )}
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>{t('register.email')}</Text>
                      <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="sergio@gmail.com"
                          placeholderTextColor="#999"
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                      {errors.email && (
                        <Text style={styles.errorMessage}>{errors.email.message}</Text>
                      )}
                    </View>
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <View style={styles.inputContainer}>
                      <Text style={styles.inputLabel}>{t('register.password')}</Text>
                      <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                        <TextInput
                          style={styles.input}
                          placeholder="********"
                          placeholderTextColor="#999"
                          secureTextEntry
                          onChangeText={onChange}
                          value={value}
                        />
                      </View>
                      {errors.password && (
                        <Text style={styles.errorMessage}>{errors.password.message}</Text>
                      )}
                    </View>
                  )}
                />

                {error && <Text style={styles.errorText}>{error}</Text>}

                <TouchableOpacity 
                  style={styles.button}
                  onPress={handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                  {t('register.registerBtn')}
                  </Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                  <Text style={styles.footerText}>
                   {t('register.alreadyHaveAnAccount')}{' '}
                    <Link href="/login">
                      <Text style={styles.linkText}>{t('register.loginBtn')}</Text>
                    </Link>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
    </ComponentLayout>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: theme.colors.primary, 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.green,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.grey,
    marginBottom: 32,
    lineHeight: 24,
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    color: theme.colors.grey,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 48,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Roboto',
    fontSize: 16,
    color: theme.colors.white, 
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    flex: 1,
    color: theme.colors.grey,    
    fontFamily: 'Roboto',
    lineHeight: 20,
  },
  button: {
    backgroundColor: theme.colors.green,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.secundary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    color: theme.colors.grey,
  },
  linkText: {
    color: theme.colors.green,
    fontWeight: 'bold', 
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  }
});