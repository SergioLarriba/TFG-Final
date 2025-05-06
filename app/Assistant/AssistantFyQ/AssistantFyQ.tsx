import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import theme from '@/constants/Theme';
import { ArrowBackIconWithoutPadding, ProfileIcon } from '@/components/Styled/HeaderIcons';
import ComponentLayout from '@/layout/ComponentLayout';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import StyledText from '@/components/Styled/StyledText';
import { IAPromptFAQ, IAPromptFAQ_En } from '@/constants/Prompt';
import Step1 from './(steps)/Step1';
import Step2 from './(steps)/Step2';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

export interface AssistantRecipesForm {
	// Step 1
	healthProfile: string, 
	mainConcerns: string[], 
	experienceLevel: string, 
	// Step 2
	specificTopics: string[], 
	additionalNotes: string, 
}

export interface AssistantRecipeErrors {
	dietaryPreferences: string,
	cuisineTypes: string,
	cookingTime: string,
	spicy: string,
}

export default function AssistantFyQ() {
	const navigation = useNavigation(); 
	const [step, setStep] = useState<number>(1); 
	const [formData, setFormData] = useState<AssistantRecipesForm>({
    healthProfile: '', 
		mainConcerns: [], 
		experienceLevel: '', 
		specificTopics: [], 
		additionalNotes: '', 
	})
	const [errors, setErrors] = useState<AssistantRecipeErrors>(); 
	const [errorMsg, setErrorMsg] = useState<string>(''); 
  const { t } = useTranslation(); 

	/* Configuracion del header */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('Assistant.header.FyQ'),
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
    let newErrors = {}
    if (step === 1) {
    }

    if (step === 2) {
     
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
      const userPrompt = t("Assistant.prompts.assistantFyQ", {
        metaData: IAPromptFAQ.metaData,
        additionalContext: IAPromptFAQ.additionalContext,
        healthProfile: formData.healthProfile,
        experienceLevel: formData.experienceLevel,
        mainConcerns: formData.mainConcerns.join(', '),
        specificTopics: formData.specificTopics.join(', '),
        additionalNotes: formData.additionalNotes || t('Assistant.prompts.all'),
        warning: IAPromptFAQ.warning,
        answerFormat: IAPromptFAQ.answerFormat
      });
    
      router.push({
        pathname: '/Assistant/AssistantResponse',
        params: { userPrompt }
      });
    } else if (language === 'en') {
      const userPrompt = t("Assistant.prompts.assistantFyQ", {
        metaData: IAPromptFAQ_En.metaData,
        additionalContext: IAPromptFAQ_En.additionalContext,
        healthProfile: formData.healthProfile,
        experienceLevel: formData.experienceLevel,
        mainConcerns: formData.mainConcerns.join(', '),
        specificTopics: formData.specificTopics.join(', '),
        additionalNotes: formData.additionalNotes || t('Assistant.prompts.all'),
        warning: IAPromptFAQ_En.warning,
        answerFormat: IAPromptFAQ_En.answerFormat
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
				<StyledText>{t('Assistant.step.stepIndicator', { current: step, total: 2 })}</StyledText>

				{ step === 1 && <Step1 formData={formData} setFormData={setFormData} errors={errors}/> }
				{ step === 2 && <Step2 formData={formData} setFormData={setFormData} errors={errors}/> }


				<View style={styles.buttons}>
          {step > 1 && (
            <Pressable style={styles.backBtn} onPress={handleBack}>
              <Text style={styles.btnText}>{t('Assistant.step.back')}</Text>
            </Pressable>
          )}
          {step < 2 && (
            <Pressable style={styles.nextBtn} onPress={handleNext}>
              <Text style={styles.btnText}>{t('Assistant.step.next')}</Text>
            </Pressable>
          )}
          {step === 2 && (
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