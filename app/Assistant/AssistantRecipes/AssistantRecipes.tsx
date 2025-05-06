import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import theme from '@/constants/Theme';
import { ArrowBackIcon, ArrowBackIconWithoutPadding, ProfileIcon } from '@/components/Styled/HeaderIcons';
import ComponentLayout from '@/layout/ComponentLayout';
import { Pressable, ScrollView } from 'react-native-gesture-handler';
import StyledText from '@/components/Styled/StyledText';
import Step1BasicInfo from './(steps)/Step1BasicInfo';
import { IAPromptRecipes, IAPromptRecipes_En } from '@/constants/Prompt';
import Step2CookingInfo from './(steps)/Step2CookingInfo';
import Step3Extras from './(steps)/Step3Extras';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';


export interface AssistantRecipesForm {
	selectedMealTime: string,
	selectedSkill: string,
	allergies: string[],
	dietaryPreferences: string[],
	cuisineTypes: string[],
	cookingTime: string,
	spicy: string,
	ingredients: string,
	ingredientsToAvoid: string,
	numPeople: string,
	takeAwayOptions: boolean,
	additionalNotes: string,
}

export interface AssistantRecipeErrors {
	selectedMealTime: string,
	selectedSkill: string,
	dietaryPreferences: string,
	cuisineTypes: string,
	cookingTime: string,
	spicy: string,
}

export default function AssistantRecipes() {
	const navigation = useNavigation(); 
	const [step, setStep] = useState<number>(1); 
	const [formData, setFormData] = useState<AssistantRecipesForm>({
		selectedMealTime: '',
    selectedSkill: '',
    allergies: ['Sin gluten'],
    dietaryPreferences: [],
    cuisineTypes: [],
    cookingTime: '',
    spicy: 'Sin picante',
    ingredients: '',
    ingredientsToAvoid: '',
    numPeople: '',
    takeAwayOptions: false,
    additionalNotes: '',
	})
	const [errors, setErrors] = useState<AssistantRecipeErrors>(); 
	const [errorMsg, setErrorMsg] = useState<string>(''); 
  const { t } = useTranslation(); 

	/* Configuracion del header */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: t('Assistant.header.recipes'),
      headerTintColor: theme.colors.white,
      headerStyle: {
        backgroundColor: theme.colors.primary,
      }, 
      headerRight: () => (<ProfileIcon />),
      headerLeft: () => (<ArrowBackIconWithoutPadding />), 
    })
  }, [])

	/* Validar si se han rellenado los campos necesarios */
	const validateStep = () => {
    let newErrors = {}
    if (step === 1) {
      if (!formData.selectedMealTime) newErrors.selectedMealTime = 'Selecciona un momento del día'
      if (!formData.selectedSkill) newErrors.selectedSkill = 'Selecciona tu nivel de cocina'
      if (!formData.dietaryPreferences.length) newErrors.dietaryPreferences = 'Selecciona al menos una preferencia'
    }

    if (step === 2) {
      if (!formData.cuisineTypes.length) newErrors.cuisineTypes = 'Selecciona un tipo de cocina'
      if (!formData.cookingTime) newErrors.cookingTime = 'Selecciona tu tiempo disponible'
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
      const userPrompt = t("Assistant.prompts.assistantRecipes", {
        metaData: IAPromptRecipes.metaData,
        additionalContext: IAPromptRecipes.additionalContext,
        selectedMealTime: formData.selectedMealTime,
        selectedSkill: formData.selectedSkill,
        allergies: formData.allergies.join(', '),
        dietaryPreferences: formData.dietaryPreferences.join(', '),
        cuisineTypes: formData.cuisineTypes.join(', '),
        numPeople: formData.numPeople,
        cookingTime: formData.cookingTime,
        takeAwayOptions: formData.takeAwayOptions,
        spicy: formData.spicy,
        ingredients: formData.ingredients || t('Assistant.prompts.all'),
        ingredientsToAvoid: formData.ingredientsToAvoid || t('Assistant.prompts.none'),
        additionalNotes: formData.additionalNotes || t('Assistant.prompts.none'),
        warning: IAPromptRecipes.warning,
        answerFormat: IAPromptRecipes.answerFormat
      });

      router.push({
        pathname: '/Assistant/AssistantResponse',
        params: { userPrompt }
      });
    } else if (language === 'en') {
      const userPrompt = t("Assistant.prompts.assistantRecipes", {
        metaData: IAPromptRecipes_En.metaData,
        additionalContext: IAPromptRecipes_En.additionalContext,
        selectedMealTime: formData.selectedMealTime,
        selectedSkill: formData.selectedSkill,
        allergies: formData.allergies.join(', '),
        dietaryPreferences: formData.dietaryPreferences.join(', '),
        cuisineTypes: formData.cuisineTypes.join(', '),
        numPeople: formData.numPeople,
        cookingTime: formData.cookingTime,
        takeAwayOptions: formData.takeAwayOptions,
        spicy: formData.spicy,
        ingredients: formData.ingredients || t('Assistant.prompts.all'),
        ingredientsToAvoid: formData.ingredientsToAvoid || t('Assistant.prompts.none'),
        additionalNotes: formData.additionalNotes || t('Assistant.prompts.none'),
        warning: IAPromptRecipes_En.warning,
        answerFormat: IAPromptRecipes_En.answerFormat
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