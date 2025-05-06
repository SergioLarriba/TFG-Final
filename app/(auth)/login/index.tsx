import { useLayoutEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigation } from 'expo-router';
import { z } from 'zod';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 

import { supabase } from '@/lib/supabase'; 
import { zodResolver } from '@hookform/resolvers/zod';
import ComponentLayout from '@/layout/ComponentLayout';
import theme from '@/constants/Theme';
import { ScrollView } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation(); 
  const { t } = useTranslation(); 
  const signInSchema = z.object({
    email: z.string().email(t('login.errors.email')),
    password: z
      .string()
      .min(6, t('login.errors.password1'))
      .max(50, t('login.errors.password2')),
  });
  
  type SignInForm = z.infer<typeof signInSchema>;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false, 
    })
  }, [])

  const { control, handleSubmit, formState: { errors } } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema)
  });

  const onSubmit = async (data: SignInForm) => {
    try {
      setLoading(true);
      setError(null);
      
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
            <Text style={styles.title}>{t('login.hello')}</Text>
            <Text style={styles.subtitle}>
              {t('login.subheading')}
            </Text>

            <View style={styles.form}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>{t('login.emailInput')}</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                      <TextInput
                        style={styles.input}
                        placeholder={t('login.emailInputPlaceholder')}
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
                    <Text style={styles.inputLabel}>{t('login.password')}</Text>
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
                  {loading ? t('login.loginBtnLoading') : t('login.loginBtn')}
                </Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>
                  {t('login.dontHaveAnAccount')}{' '}
                  <Link href="/signup">
                    <Text style={styles.linkText}>{t('login.register')}</Text>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
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
    fontSize: 16,
    color: theme.colors.white,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  button: {
    backgroundColor: theme.colors.green,
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: theme.colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
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