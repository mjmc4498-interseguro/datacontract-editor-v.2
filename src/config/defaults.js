/** Nombre mostrado en cabecera, pestaña del navegador y mensajes de error. */
export const APP_DISPLAY_NAME = 'ISDataContractEditor360';

/**
 * Default configuration for the Data Contract Editor
 *
 * Uses Vite build-time environment variables (VITE_*).
 * For local dev: create .env.local with your keys
 * For Azure Static Web Apps: set env vars in Azure portal
 * For Docker: these are overridden by config.json at runtime
 */

export const OPENROUTER_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
export const OPENROUTER_DEFAULT_MODEL = 'openrouter/auto';

export const DEFAULT_AI_CONFIG = {
  enabled: !!import.meta.env.VITE_AI_API_KEY,
  provider: import.meta.env.VITE_AI_PROVIDER || 'openai',
  endpoint: import.meta.env.VITE_AI_ENDPOINT || '',
  apiKey: import.meta.env.VITE_AI_API_KEY || '',
  model: import.meta.env.VITE_AI_MODEL || 'gpt-4o',
  authHeader: import.meta.env.VITE_AI_AUTH_HEADER || 'bearer',
  maxTokens: 16384,
  temperature: 0.7,
};

export const DEFAULT_TESTS_CONFIG = {
  enabled: true,
  dataContractCliApiServerUrl: import.meta.env.VITE_TESTS_SERVER_URL || null,
  apiKey: null,
};

/**
 * Returns true if the endpoint URL targets OpenRouter.
 * Matches `openrouter.ai` as a standalone host (not a substring of other domains).
 * @param {string} endpoint
 * @returns {boolean}
 */
export function isOpenRouterEndpoint(endpoint) {
  if (typeof endpoint !== 'string' || !endpoint) return false;
  try {
    const url = new URL(endpoint);
    return url.hostname === 'openrouter.ai' || url.hostname.endsWith('.openrouter.ai');
  } catch {
    return /(^|\/\/|\.)openrouter\.ai(\/|:|$)/i.test(endpoint);
  }
}

/**
 * Resolve an AI config object, filling in provider-specific defaults.
 *
 * - Auto-detects `provider: 'openrouter'` when the endpoint points at openrouter.ai
 *   (unless `provider` was explicitly set to something other than 'openai').
 * - Supplies OpenRouter endpoint, model and auth defaults when provider is 'openrouter'.
 * - Leaves all other providers (openai, anthropic, Azure, Ollama, ...) untouched.
 *
 * @param {object} config - Partial AI config
 * @returns {object} Config with defaults filled in
 */
export function resolveAiConfig(config = {}) {
  const resolved = { ...config };

  const providerWasSet = !!config.provider && config.provider !== 'openai';
  if (!providerWasSet && isOpenRouterEndpoint(resolved.endpoint)) {
    resolved.provider = 'openrouter';
  }

  if (resolved.provider === 'openrouter') {
    if (!resolved.endpoint) resolved.endpoint = OPENROUTER_ENDPOINT;
    if (!resolved.model) resolved.model = OPENROUTER_DEFAULT_MODEL;
    if (!resolved.authHeader) resolved.authHeader = 'bearer';
  }

  return resolved;
}
