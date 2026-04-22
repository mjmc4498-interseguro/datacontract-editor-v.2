# ISDataContractEditor360

Editor web para crear y gestionar contratos de datos con el estándar [Open Data Contract Standard (ODCS)](https://bitol-io.github.io/open-data-contract-standard/latest/), con soporte para ODCS v3.1.0.

## Características principales

- **Edición visual**: define modelos de datos y relaciones en un diagrama interactivo.
- **Edición por formulario**: completa campos guiados para construir el contrato.
- **Edición YAML**: modifica directamente el contrato con ayuda de autocompletado.
- **Vista previa**: renderizado HTML del contrato en tiempo real.
- **Validación**: detección de errores y advertencias sobre la estructura del contrato.
- **Pruebas**: ejecución de pruebas mediante Data Contract CLI API Server.
- **Asistente de IA**: soporte para generación y mejora de contratos (configurable).

## Personalización aplicada en esta versión

- Nombre de aplicación configurado como **ISDataContractEditor360**.
- Interfaz y textos de producto en **español**.
- **Logo** y **favicon** personalizados con `public/logo-interseguro.png`.
- Paleta visual ajustada al azul de marca (base `#0061AE`) en toda la UI.

## Uso

### Editor web

Accede al editor hospedado:

<https://editor.datacontract.com>

### Ejecución local (CLI)

Inicia el editor localmente:

```bash
npx datacontract-editor
```

Abrir un contrato específico:

```bash
npx datacontract-editor mi-contrato.odcs.yaml
```

### Docker

Ejecuta el editor en contenedor:

```bash
docker run -d -p 4173:4173 datacontract/editor
```

Luego abre:

<http://localhost:4173>

## Configuración del asistente de IA (Docker)

En Docker, el asistente de IA está desactivado por defecto. Para activarlo, configura un endpoint compatible con OpenAI.

### OpenAI

```bash
docker run -d -p 4173:4173 \
  -e AI_ENDPOINT=https://api.openai.com/v1/chat/completions \
  -e AI_API_KEY=sk-tu-api-key \
  -e AI_MODEL=gpt-4o \
  datacontract/editor
```

### Azure OpenAI

```bash
docker run -d -p 4173:4173 \
  -e AI_ENDPOINT=https://tu-recurso.openai.azure.com/openai/deployments/gpt-4o/chat/completions?api-version=2024-02-15-preview \
  -e AI_API_KEY=tu-clave-azure \
  -e AI_AUTH_HEADER=api-key \
  datacontract/editor
```

### LLM local (Ollama)

```bash
docker run -d -p 4173:4173 \
  -e AI_ENDPOINT=http://host.docker.internal:11434/v1/chat/completions \
  -e AI_API_KEY=ollama \
  -e AI_MODEL=llama3.2 \
  datacontract/editor
```

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `AI_ENDPOINT` | URL de chat completions compatible con OpenAI | API hospedada |
| `AI_API_KEY` | Clave API de autenticación | API hospedada |
| `AI_MODEL` | Nombre del modelo | `gpt-4o` |
| `AI_AUTH_HEADER` | Tipo de cabecera: `bearer` o `api-key` | `bearer` |

## Integración con Data Contract CLI

Puede iniciarse desde la CLI de Data Contract:

```bash
datacontract editor datacontract.yaml
```

## Producto comercial

Data Contract Editor forma parte del producto comercial [Entropy Data](https://entropy-data.com), orientado a gestionar múltiples contratos de datos en una sola aplicación.

## Licencia

Este proyecto es mantenido por [Entropy Data](https://entropy-data.com) y se distribuye bajo licencia [MIT](LICENSE).
