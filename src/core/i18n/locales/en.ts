const en = {
  auth: {
    continueAsGuest: 'Continue as guest',
    continueWithGoogle: 'Continue with Google',
    heroTitle: 'SMART BUDGET',
    subtitle:
      'So your budget templates, goals, and gold tracker stay neatly saved.',
    title: 'SIGN IN FIRST.',
  },
  common: {
    back: 'Back',
    continue: 'Continue',
    expoDocumentation: 'Expo documentation',
    learnMore: 'Learn more',
    skip: 'Skip',
  },
  explore: {
    androidIosWebSupportBody:
      'You can open this project on Android, iOS, and the web. To open the web version, press w in the terminal running this project.',
    androidIosWebSupportTitle: 'Android, iOS, and web support',
    animationsBody:
      'This template includes an example animated component. The `src/core/components/ui/collapsible.tsx` component uses `react-native-reanimated` to animate this panel.',
    animationsTitle: 'Animations',
    imagesBody:
      'For static images, you can use the @2x and @3x suffixes to provide assets for different screen densities.',
    imagesTitle: 'Images',
    lightDarkBody:
      'This template already supports light and dark mode. The useColorScheme() hook helps you inspect the user preference so the UI can adapt.',
    lightDarkTitle: 'Light and dark mode components',
    manualNavigationBody:
      'This app defines screens manually in src/core/navigation/root-navigator.tsx and src/core/navigation/app-tabs.tsx.',
    manualNavigationExtra:
      'Main page components are imported directly from presentation/views, keeping navigation flow and UI separate without adding thin screen wrappers.',
    manualNavigationTitle: 'Manual navigation',
    subtitle: 'This starter app includes example code to help you get started faster.',
    title: 'Explore',
  },
  home: {
    devTools: 'Dev tools',
    devToolsDevice: 'shake device or press m in the terminal',
    devToolsSimulator: 'press %{shortcut}',
    devToolsWeb: 'use browser devtools',
    freshStart: 'Fresh start',
    freshStartHint: 'npm run reset-project',
    getStarted: 'get started',
    title: 'Welcome to Expo',
    tryEditing: 'Try editing',
    tryEditingHint: 'src/core/navigation/root-navigator.tsx',
  },
  interactiveQuiz: {
    cta: {
      chooseAnswerFirst: 'Choose an answer first',
      enterApp: 'Enter the app',
      seeRecommendation: 'See recommendation',
    },
    questionCounter: 'Question %{current}/%{total}',
    recommendation: {
      antiImpulse: {
        description:
          'Each income is split clearly into essentials, savings, sinking funds, and spending limits. Great if you want a stronger brake on impulse spending.',
        label: 'Zero-Impulse Budget',
        summary:
          'This method fits you if you feel calm when every amount already has a job.',
      },
      eyebrow: 'Recommended method',
      flexible: {
        description:
          'The main focus stays on the goal you are currently chasing. Daily categories still exist, but decisions always return to your nearest goal.',
        label: 'Goal-First Budget',
        summary:
          'You seem most comfortable when budgeting stays flexible but your big goal is clear.',
      },
      freedom: {
        description:
          'Budgeting is used to grow savings, investments, and your life runway. Great if you are willing to live leaner for faster progress toward a bigger target.',
        label: 'Freedom Builder',
        summary:
          'Your direction leans strongly toward assets and long-term financial freedom.',
      },
      intro:
        'Based on your answers, this pattern fits best to help manage your cashflow without feeling too restrictive.',
      pill: 'Your quiz result',
      priorityBased: {
        description:
          'Income is split into a few main buckets so spending decisions stay light. Easy to use consistently without feeling overly constrained.',
        label: 'Priority Buckets',
        summary:
          'You need a system that feels simple, quick to scan, and still keeps life balanced.',
      },
      title: 'THE BUDGETING METHOD THAT FITS YOU BEST.',
      zeroBased: {
        description:
          'Every unit of money gets a role from the start of the month, so leftovers are never a mystery. Great if you like detail, control, and regular review.',
        label: 'Zero-Based Budget',
        summary:
          'You tend to feel comfortable when daily cashflow is visible and measurable.',
      },
    },
    questions: {
      comfortStyle: {
        options: {
          detailDisciplined: {
            subtitle: 'Checklists keep you calm',
            title: 'Detailed and disciplined',
          },
          everyRupiahTask: {
            subtitle: 'Full allocation mode',
            title: 'Every rupiah has a job',
          },
          futureExtreme: {
            subtitle: 'Advanced mode',
            title: 'Extreme saving for the future',
          },
          goalTarget: {
            subtitle: 'Goal-driven',
            title: 'Flexible but target-focused',
          },
          simpleFast: {
            subtitle: 'Not complicated',
            title: 'Simple and fast',
          },
        },
        title: 'WHICH STYLE FEELS MORE COMFORTABLE TO YOU?',
      },
      expenseTracking: {
        options: {
          allocateAll: {
            subtitle: 'Full control from day one',
            title: 'Every rupiah must have an allocation',
          },
          focusBiggest: {
            subtitle: 'More focused on big priorities',
            title: 'Split income into major categories',
          },
          freedomFirst: {
            subtitle: 'Long game mode',
            title: 'Save hard for financial freedom',
          },
          goalFirst: {
            subtitle: 'Goals sit at the center',
            title: 'Save specifically for a target',
          },
          trackAll: {
            subtitle: 'You want to know where it goes',
            title: 'Track every expense in detail',
          },
        },
        title: 'HOW DO YOU USUALLY MANAGE YOUR SPENDING?',
      },
      financialFocus: {
        options: {
          balanceLife: {
            subtitle: 'Stability first',
            title: 'Balance life and savings',
          },
          cutDaily: {
            subtitle: 'Start from the small details',
            title: 'Reduce daily spending',
          },
          fullControl: {
            subtitle: 'Precision budgeting',
            title: 'Full control over every rupiah',
          },
          passiveIncome: {
            subtitle: 'Financial freedom',
            title: 'Invest aggressively for early retirement',
          },
          shortGoal: {
            subtitle: 'Progress feels faster',
            title: 'Save for short-term goals',
          },
        },
        title: 'WHAT IS YOUR MAIN FINANCIAL FOCUS RIGHT NOW?',
      },
      mainPriority: {
        options: {
          dailyControl: {
            subtitle: 'So the pattern becomes clear quickly',
            title: 'Control daily cashflow',
          },
          everyRupiah: {
            subtitle: 'Nothing goes unused',
            title: 'Assign every rupiah with discipline',
          },
          longTerm: {
            subtitle: 'Pushing assets aggressively',
            title: 'Long-term financial freedom',
          },
          needsVsWants: {
            subtitle: 'A tidy life that still feels enjoyable',
            title: 'Balance needs and wants',
          },
          specialGoals: {
            subtitle: 'Specific targets first',
            title: 'Save for wedding/gadgets/travel',
          },
        },
        title: 'WHAT IS YOUR BIGGEST PRIORITY RIGHT NOW?',
      },
      promoResponse: {
        options: {
          compareToGoal: {
            subtitle: 'Goals still come first',
            title: 'Check whether it supports your goal first',
          },
          investmentFirst: {
            subtitle: 'Future-first mindset',
            title: 'Not tempted, stay focused on investing',
          },
          oftenBuy: {
            subtitle: 'Detailed budgeting helps with brakes',
            title: 'Sometimes tempted, still in control',
          },
          rarelyTempted: {
            subtitle: 'Discipline really suits you',
            title: 'Hold back, rarely tempted',
          },
          veryTempted: {
            subtitle: 'Needs a stronger priority filter',
            title: 'Often tempted',
          },
        },
        title: 'WHEN THERE IS A PROMO OR FLASH SALE, YOU USUALLY...',
      },
    },
  },
  onboarding: {
    slides: {
      cashflow: {
        copy:
          'Track your cashflow, choose a budgeting method that fits, and let the app help set up categories automatically from your income.',
        title: 'YOUR BUDGET, BUT SANER.',
      },
      gold: {
        copy:
          'Track Antam, UBS, or jewelry grams. Goals can be set as money targets or gram targets.',
        title: 'GOLD JOINS THE PLAN TOO.',
      },
      quiz: {
        copy:
          'Answer 5 quick questions about spending habits, impulses, goals, comfort level, and risk appetite.',
        title: 'QUIZ FIRST, THEN BUDGETING.',
      },
    },
  },
  tabs: {
    explore: 'Explore',
    home: 'Home',
  },
} as const;

export default en;
