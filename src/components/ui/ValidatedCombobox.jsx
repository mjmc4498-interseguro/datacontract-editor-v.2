import { forwardRef } from 'react';
import Combobox from './Combobox.jsx';
import Tooltip from './Tooltip.jsx';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon.jsx';
import { es } from '../../locale/es.js';


/**
 * A self-validating combobox component that shows errors when required field is empty.
 * Combines the template structure from Overview.jsx with validation logic from ValidatedInput.jsx.
 */
const ValidatedCombobox = forwardRef(({
  name,
  label,
  value,
  onChange,
  options = [],
  required = false,
  tooltip,
  placeholder = es.combobox.defaultPlaceholder,
  className = '',
  externalErrors = [],
  displayValue,
  renderOption,
  renderSelectedIcon,
  filterKey = 'name',
  allowCustomValue = true,
  acceptAnyInput = true,
  disabled = false,
  pattern,
  patternMessage,
  validationKey,
  validationSection,
  skipInternalValidation = false,
  ...props
}, ref) => {

  // Internal validation - check if required field is empty
  const hasInternalError = !skipInternalValidation && required && (!value || value.trim === '' || (typeof value === 'string' && value.trim() === ''));

  // Pattern validation
  const hasPatternError = !skipInternalValidation && pattern && value && typeof value === 'string' && value.trim() !== '' && (() => {
    try {
      return !new RegExp(pattern).test(value);
    } catch {
      return false;
    }
  })();

  // Prepare error messages
  const errorMessages = [];
  if (hasInternalError) {
    errorMessages.push(es.validated.fieldRequired);
  }
  if (hasPatternError) {
    errorMessages.push(patternMessage || es.validated.patternFallback(pattern));
  }
  errorMessages.push(...externalErrors);

  const hasError = errorMessages.length > 0;

  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        <label className="block text-xs font-medium leading-4 text-gray-900">
          {label}
        </label>
        {tooltip && (
          <Tooltip content={tooltip}>
            <QuestionMarkCircleIcon />
          </Tooltip>
        )}
        {required && (
          <span className="ml-auto text-xs leading-4 text-gray-500">{es.common.required}</span>
        )}
      </div>
      <Combobox
        ref={ref}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        displayValue={displayValue}
        renderOption={renderOption}
        renderSelectedIcon={renderSelectedIcon}
        filterKey={filterKey}
        allowCustomValue={allowCustomValue}
        acceptAnyInput={acceptAnyInput}
        disabled={disabled}
        hasError={hasError}
        className={className}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...props}
      />
      {hasError && errorMessages.map((message, idx) => (
        <p key={idx} id={`${name}-error`} className="mt-1 text-xs text-red-600">
          {message}
        </p>
      ))}
    </div>
  );
});

ValidatedCombobox.displayName = 'ValidatedCombobox';

export default ValidatedCombobox;
