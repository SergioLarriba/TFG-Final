import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import theme from '@/constants/Theme';
import { ArrowBackIconWithoutPadding, ProfileIcon } from '@/components/Styled/HeaderIcons';
import { IAPromptPersonalized, IAPromptPersonalized_En } from '@/constants/Prompt';
import ComponentLayout from '@/layout/ComponentLayout';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import StyledText from '@/components/Styled/StyledText';
import Step1BasicInfo from './(steps)/Step1BasicInfo';
import Step2CookingInfo from './(steps)/Step2CoookingInfo';
import Step3Extras from './(steps)/Step3Extras';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';


export interface AssistantFRForm {
	// Step 1
	dietaryPreferences: string[], 
	budget: string, 
	availability: string[], 
	// Step 2
	mealTimes: string[], 
	cookingFrequency: string, 
	flavourTypes: string[], 
	// Step 3
	cuisineTypes: string[], 
	additionalNotes: string,
	allergies: string[],
}

export interface AssistantFRErrors {
	dietaryPreferences: string, 
	availability: string, 
	mealTimes: string, 
	cookingFrequency: string, 
	flavourTypes: string, 
	cuisineTypes: string, 
}

export default function AssistantFR() {
	const navigation = useNavigation(); 
	const [step, setStep] = useState<number>(1); 
	const [formData, setFormData] = useState<AssistantFRForm>({
		dietaryPreferences: ['Sin Gluten'], 
		budget: 'Económico', 
		availability: [], 
		mealTimes: [], 
		cookingFrequency: '', 
		flavourTypes: [], 
		cuisineTypes: [], 
		additionalNotes: '',
		allergies: [],
	})
	const [errors, setErrors] = useState<AssistantFRErrors>(); 
	const [errorMsg, setErrorMsg] = useState<string>(''); 
  const { t } = useTranslation(); 

	/* Configuracion del header */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('Assistant.header.foodRecommendations'),
      headerTintColor: theme.colors.white,
      headerStyle: {
        backgroundColor: theme.colors.primary,
      }, 
      headerRight: () => (<ProfileIcon />),
      headerLeft: () => <ArrowBackIconWithoutPadding />
    })
  }, [])

	/* Validar si se han rellenado los campos necesarios */
	const validateStep = () => {
		let newErrors = {}; 
		if (step === 1) {
      if (!formData.dietaryPreferences.length) newErrors.dietaryPreferences = 'Selecciona al menos una preferencia'
			if (!formData.availability.length) newErrors.availability = 'Selecciona tu disponibilidad'
		}
		if (step === 2) {
      if (!formData.mealTimes.length) newErrors.mealTimes = 'Selecciona tus momentos clave'
			if (!formData.cookingFrequency) newErrors.cookingFrequency = 'Selecciona las veces que sueles cocinar semanalmente'
			if (!formData.flavourTypes.length) newErrors.flavourTypes = 'Selecciona tu sabor favorito'
		}
    if (step === 3) {
      if (!formData.cuisineTypes.length) newErrors.cuisineTypes = 'Selecciona un tipo de cocina'

    }
		setErrors(newErrors)
		return Object.keys(newErrors).length === 0
	}

	/* Navegar de una pantalla a otra */
	const handleNext = () => {
		if (validateStep()) {
			setErrorMsg(''); 
			setStep(step + 1)
		} else {
			setErrorMsg('Te faltan algunos campos por rellenar')
		}
	}

	const handleBack = () => setStep(step - 1); 

	const handleSubmit = () => {
    const language = i18n.language; 

    if (language === 'es') {
      const userPrompt = t("Assistant.prompts.assistantFR", {
        metaData: IAPromptPersonalized.metaData,
        additionalContext: IAPromptPersonalized.additionalContext,
        dietaryPreferences: formData.dietaryPreferences,
        budget: formData.budget,
        availability: formData.availability,
        mealTimes: formData.mealTimes,
        cookingFrequency: formData.cookingFrequency,
        flavourTypes: formData.flavourTypes,
        cuisineTypes: formData.cuisineTypes,
        allergies: formData.allergies.join(', '),
        additionalNotes: formData.additionalNotes || t('Assistant.prompts.none'),
        warning: IAPromptPersonalized.warning,
        answerFormat: IAPromptPersonalized.answerFormat
      });
    
      router.push({
        pathname: '/Assistant/AssistantResponse',
        params: { userPrompt }
      });
    } else if (language === 'en') {
      const userPrompt = t("Assistant.prompts.assistantFR", {
        metaData: IAPromptPersonalized_En.metaData,
        additionalContext: IAPromptPersonalized_En.additionalContext,
        dietaryPreferences: formData.dietaryPreferences,
        budget: formData.budget,
        availability: formData.availability,
        mealTimes: formData.mealTimes,
        cookingFrequency: formData.cookingFrequency,
        flavourTypes: formData.flavourTypes,
        cuisineTypes: formData.cuisineTypes,
        allergies: formData.allergies.join(', '),
        additionalNotes: formData.additionalNotes || t('Assistant.prompts.none'),
        warning: IAPromptPersonalized_En.warning,
        answerFormat: IAPromptPersonalized_En.answerFormat
      });
    
      router.push({
        pathname: '/Assistant/AssistantResponse',
        params: { userPrompt }
      });
    }
    
  };
  

	return (
		<ComponentLayout>
			<ScrollView 
        contentContainerStyle={styles.container}
        removeClippedSubviews={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyboardShouldPersistTaps="handled" 
      >
				<StyledText>{t('Assistant.step.stepIndicator', { current: step, total: 3 })}</StyledText>

				{ step === 1 && <Step1BasicInfo formData={formData} setFormData={setFormData} errors={errors}/> }
				{ step === 2 && <Step2CookingInfo formData={formData} setFormData={setFormData} errors={errors}/> }
				{ step === 3 && <Step3Extras formData={formData} setFormData={setFormData} errors={errors}/> }

				<View style={styles.buttons}>
          {step > 1 && (
            <Pressable style={styles.backBtn} onPress={handleBack}>
              <Text style={styles.btnText}>{t('Assistant.step.back')}</Text>
            </Pressable>
          )}
          {step < 3 && (
            <Pressable style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.btnText}>{t('Assistant.step.next')}</Text>
            </Pressable>
          )}
          {step === 3 && (
            <Pressable style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.btnText}>{t('Assistant.step.ask')}</Text>
            </Pressable>
          )}
        </View>

        {errorMsg && (
          <StyledText color="red" fontWeight="bold" alignSelf="center" marginTop={10}>
            {errorMsg}
          </StyledText>
        )}
			</ScrollView>
		</ComponentLayout>
	)
}

const styles = StyleSheet.create({
	container: {
    paddingBottom: 100,
    paddingHorizontal: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  nextBtn: {
    backgroundColor: '#00FE87',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
  },
  backBtn: {
    backgroundColor: theme.colors.grey,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
  },
  submitBtn: {
    backgroundColor: theme.colors.green,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    flex: 1,
  },
  btnText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})