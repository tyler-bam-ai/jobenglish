// Simple module-level store for onboarding state
// Persists across page navigations within the same session

interface OnboardingState {
  goal: string | null;
  consents: Record<string, boolean>;
  diagnosticCompleted: boolean;
}

let state: OnboardingState = {
  goal: null,
  consents: {},
  diagnosticCompleted: false,
};

export function getOnboardingState() {
  return state;
}

export function setGoal(goal: string) {
  state.goal = goal;
}

export function setConsents(consents: Record<string, boolean>) {
  state.consents = consents;
}

export function setDiagnosticCompleted() {
  state.diagnosticCompleted = true;
}

export function resetOnboarding() {
  state = { goal: null, consents: {}, diagnosticCompleted: false };
}
