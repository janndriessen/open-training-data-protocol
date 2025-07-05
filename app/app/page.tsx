'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { PrivyConnect } from '@/components/privy'
import { StravaConnectButton } from '@/components/strava-connect'
import { Button } from '@/components/ui/button'

// Types
type Step = 'welcome' | 'signin' | 'select' | 'dashboard'

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

  const setStep = (step: Step) => {
    const currentIndex = steps.indexOf(currentStep)
    const nextIndex = steps.indexOf(step)
    setDirection(nextIndex > currentIndex ? 'forward' : 'backward')
    setCurrentStep(step)
  }

  return {
    currentStep,
    direction,
    nextStep,
    setStep,
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
        <motion.h2
          variants={itemVariants}
          className="text-6xl font-bold text-center mb-16 text-black"
        >
          {title}
        </motion.h2>
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

// Welcome Step Component
function WelcomeActionButton({
  children,
  onClick,
  variant = 'default',
}: {
  children: React.ReactNode
  onClick: () => void
  variant?: 'default' | 'outline'
}) {
  const baseClass =
    'text-xl px-8 py-4 min-h-16 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl w-full md:w-auto'
  const variantClass =
    variant === 'outline'
      ? 'border-black text-black hover:bg-gray-100'
      : 'bg-black text-white hover:bg-gray-800'
  return (
    <Button
      onClick={onClick}
      size="lg"
      variant={variant === 'outline' ? 'outline' : undefined}
      className={`${baseClass} ${variantClass}`}
    >
      {children}
    </Button>
  )
}

type WelcomeStepProps = {
  onShowOnchain: () => void
  onUpload: () => void
}

function WelcomeStep({ onShowOnchain, onUpload }: WelcomeStepProps) {
  return (
    <Slide title="Open Training Data Protocol">
      <div className="flex flex-col items-center w-full max-w-xl">
        <h2 className="text-4xl font-semibold text-center mb-8 text-gray-700">
          Free your training data
        </h2>
        <div className="flex flex-col gap-4 w-full justify-center">
          <WelcomeActionButton onClick={onShowOnchain}>
            Show my onchain training data
          </WelcomeActionButton>
          <WelcomeActionButton onClick={onUpload} variant="outline">
            Upload new training data
          </WelcomeActionButton>
        </div>
      </div>
    </Slide>
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

// SelectList component for the select step
type SelectListItem = { key: string; value: string }

function SelectList({
  items,
  onSelect,
  selectedKey,
}: {
  items: SelectListItem[]
  onSelect: (key: string) => void
  selectedKey?: string
}) {
  return (
    <ul className="w-full max-w-xl mx-auto flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.key}>
          <button
            className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all font-medium text-lg md:text-xl shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black/30
              ${
                selectedKey === item.key
                  ? 'border-black bg-black text-white'
                  : 'border-gray-300 bg-white text-black hover:bg-gray-50'
              }`}
            onClick={() => onSelect(item.key)}
          >
            {item.value}
          </button>
        </li>
      ))}
    </ul>
  )
}

// Select Step Component
function SelectStep({ onNext }: { onNext: () => void }) {
  // Example options array
  const options: SelectListItem[] = [
    { key: 'onchain', value: 'Show my onchain training data' },
    { key: 'upload', value: 'Upload new training data' },
    { key: 'explore', value: 'Explore public datasets' },
  ]
  const [selected, setSelected] = useState<string | undefined>()

  return (
    <Slide title="Select" onNext={onNext}>
      <SelectList
        items={options}
        selectedKey={selected}
        onSelect={setSelected}
      />
    </Slide>
  )
}

// Dashboard Step Component
function DashboardStep({ onNext }: { onNext: () => void }) {
  return (
    <Slide title="" onNext={onNext} isLastStep={true}>
      <PrivyConnect onConnect={onNext} />
    </Slide>
  )
}

// Main Onboarding Flow Component
export default function OnboardingFlow() {
  const steps: Step[] = ['welcome', 'signin', 'select', 'dashboard']
  const { currentStep, direction, nextStep, setStep, isLastStep } =
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
      case 'welcome':
        return (
          <WelcomeStep
            onShowOnchain={() => setStep('dashboard')}
            onUpload={() => setStep('signin')}
          />
        )
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
