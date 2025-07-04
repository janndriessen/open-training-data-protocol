'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { PrivyConnect } from '@/components/privy'
import { StravaConnectButton } from '@/components/strava-connect'
import { Button } from '@/components/ui/button'

// Types
type Step = 'signin' | 'select' | 'dashboard'

// Custom hook for managing flow state
function useMultiStepFlow(steps: Step[], initialStep: Step = steps[0]) {
  const [currentStep, setCurrentStep] = useState<Step>(initialStep)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const nextStep = () => {
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      setDirection('forward')
      setCurrentStep(steps[currentIndex + 1])
    }
  }

  return {
    currentStep,
    direction,
    nextStep,
    isLastStep: steps.indexOf(currentStep) === steps.length - 1,
  }
}

// Generic slide component
function Slide({
  title,
  onNext,
  isLastStep = false,
  children,
}: {
  title: string
  onNext?: () => void
  isLastStep?: boolean
  children?: React.ReactNode
}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen w-full p-8"
    >
      {title && (
        <motion.h1
          variants={itemVariants}
          className="text-6xl md:text-8xl font-bold text-center mb-16 text-black"
        >
          {title}
        </motion.h1>
      )}

      {children}

      {onNext && !isLastStep && (
        <motion.div variants={itemVariants}>
          <Button
            onClick={onNext}
            size="lg"
            className="text-lg px-8 py-4 rounded-full bg-black text-white hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isLastStep ? 'Get Started' : 'Next'}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  )
}

// Sign In Step Component
function SignInStep({ onNext }: { onNext: () => void }) {
  return (
    <Slide title="">
      <StravaConnectButton onClick={onNext} />
    </Slide>
  )
}

// Select Step Component
function SelectStep({ onNext }: { onNext: () => void }) {
  return <Slide title="Select" onNext={onNext} />
}

// Dashboard Step Component
function DashboardStep({ onNext }: { onNext: () => void }) {
  return (
    <Slide title="" onNext={onNext} isLastStep={true}>
      <PrivyConnect />
    </Slide>
  )
}

// Main Onboarding Flow Component
export default function OnboardingFlow() {
  const steps: Step[] = ['signin', 'select', 'dashboard']
  const { currentStep, direction, nextStep, isLastStep } =
    useMultiStepFlow(steps)

  // Animation variants for step transitions
  const stepVariants = {
    initial: (direction: 'forward' | 'backward') => ({
      opacity: 0,
      x: direction === 'forward' ? 100 : -100,
      scale: 0.95,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
    },
    exit: (direction: 'forward' | 'backward') => ({
      opacity: 0,
      x: direction === 'forward' ? -100 : 100,
      scale: 0.95,
    }),
  }

  const renderStep = () => {
    switch (currentStep) {
      case 'signin':
        return <SignInStep onNext={nextStep} />
      case 'select':
        return <SelectStep onNext={nextStep} />
      case 'dashboard':
        return (
          <DashboardStep onNext={() => (window.location.href = '/dashboard')} />
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen w-full bg-white overflow-hidden">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentStep}
          custom={direction}
          variants={stepVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="w-full h-full"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
