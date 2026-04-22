/**
 * Runtime Configuration Loader
 *
 * Fetches /config.json at runtime for Docker deployments.
 * Falls back to defaults if not found (for editor.datacontract.com).
 *
 * Config schema matches the embed API - see CONFIGURATION.md
 */

/**
 * Load runtime config from /config.json
 * @returns {Promise<object>} Runtime config or empty object
 */
export async function loadRuntimeConfig() {
  try {
    const configUrl = new URL('config.json', document.baseURI).href;
    const response = await fetch(configUrl);
    if (response.ok) {
      const config = await response.json();
      console.log('Loaded runtime config:', Object.keys(config));
      return config;
    }
  } catch {
    // Expected when no config.json exists (e.g., editor.datacontract.com)
  }
  return {};
}

/**
 * Build editor config from runtime config
 * Passes through config using same schema as embed API
 * @param {object} runtimeConfig - Config from /config.json
 * @returns {object} Editor config for App component
 */
export function buildEditorConfig(runtimeConfig) {
  const config = {};

  // Tests config - only include values that are explicitly set in runtime config
  // to avoid overwriting user's persisted settings with null values
  if (runtimeConfig.tests !== undefined) {
    config.tests = {
      enabled: runtimeConfig.tests.enabled ?? true,
    };
    // Only include URL if explicitly set (not null/undefined/empty)
    if (runtimeConfig.tests.dataContractCliApiServerUrl) {
      config.tests.dataContractCliApiServerUrl = runtimeConfig.tests.dataContractCliApiServerUrl;
    }
  }
  // Don't set config.tests at all if no runtime config - let persisted values remain

  // AI config - pass through directly
  if (runtimeConfig.ai !== undefined) {
    if (runtimeConfig.ai.enabled === false) {
      config.ai = { enabled: false };
    } else if (runtimeConfig.ai.apiKey) {
      // For OpenRouter, the endpoint is optional at runtime: resolveAiConfig()
      // will fill in the default OpenRouter endpoint and model automatically.
      // For every other provider we still require an explicit endpoint.
      const isOpenRouter = runtimeConfig.ai.provider === 'openrouter';
      if (runtimeConfig.ai.endpoint || isOpenRouter) {
        config.ai = {
          enabled: true,
          provider: runtimeConfig.ai.provider || 'openai',
          endpoint: runtimeConfig.ai.endpoint || '',
          apiKey: runtimeConfig.ai.apiKey,
          model: runtimeConfig.ai.model,
          authHeader: runtimeConfig.ai.authHeader || 'bearer',
          headers: runtimeConfig.ai.headers || {},
        };
      }
    }
  }
  // If runtimeConfig.ai is undefined, don't set config.ai
  // This lets store.js defaults be used for editor.datacontract.com

  // Customizations - pass through directly, or explicitly clear persisted value
  config.customizations = runtimeConfig.customizations || null;

  return config;
}
