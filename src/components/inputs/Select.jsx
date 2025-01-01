import { createPortal } from 'react-dom';
import { observer, useLocalObservable } from 'mobx-react';
import { useEffect } from 'react';
import { generateRandomId } from '../../utils/utils';
import { Tooltip } from 'react-tooltip';

const Select = observer(
  ({
    options = [],
    value,
    onChange = () => {},
    isMultiSelect = false,
    placeholder = 'Select',
    label = '',
    required = false,
    disabled = false,
    disabledInfo = '',
    isLoadingOptions = false,
    showErrorState = false,
    errorMessage = '',
    infoMessage = ''
  }) => {
    const state = useLocalObservable(() => ({
      options: options,
      setOptions: (options) => (state.options = options),
      currentValue: value,
      setCurrentValue: (value) => (state.currentValue = value),
      onChange: onChange,
      setOnChange: (onChange = () => {}) => (state.onChange = onChange),
      disabled: disabled,
      setDisabled: (isDisabled) => (state.disabled = isDisabled),
      isLoadingOptions: isLoadingOptions,
      setIsLoadingOptions: (isLoading) => (state.isLoadingOptions = isLoading),
      showErrorState: showErrorState,
      setShowErrorState: (isShown) => (state.showErrorState = isShown),
      errorMessage: errorMessage,
      setErrorMessage: (errorMessage) => (state.errorMessage = errorMessage),
      infoMessage: infoMessage,
      setInfoMessage: (message) => (state.infoMessage = message),

      value: undefined,
      setValue: (value) => {
        state.value = value;
        if (isMultiSelect) {
          if (!state.value.length) {
            if (state.onlySelectedToggled) {
              state.toggleOnlySelected();
            }
          }
        }
      },

      onSelectionChange: (optionValue) => {
        if (isMultiSelect) {
          const copy = state.value.slice();
          const foundIndex = copy.findIndex((value) => value === optionValue);
          if (foundIndex !== -1) {
            copy.splice(foundIndex, 1);
          } else {
            copy.push(optionValue);
          }
          state.value = state.options
            .filter((option) => copy.includes(option.value))
            .map((option) => option.value);
          if (!state.value.length) {
            if (state.onlySelectedToggled) {
              state.toggleOnlySelected();
            }
          }
        } else {
          state.value = optionValue;
        }
      },

      onSelectionConfirmation: () => {
        if (isMultiSelect) {
          state.onChange(state.value.slice());
        } else {
          state.onChange(state.value);
        }
        state.toggle();
      },

      toggled: false,
      toggle: () => {
        state.toggled = !state.toggled;
        state.value = state.toggled ? state.currentValue : undefined;
        state.searchKey = '';
        state.onlySelectedToggled = false;
      },

      onClick: () => {
        if (!state.isDisabled) {
          state.toggle();
        }
      },

      get showSelection() {
        return (
          !state.isLoadingOptions &&
          ((isMultiSelect && state.currentValue.length > 0) ||
            (!isMultiSelect && ['number', 'string'].includes(typeof state.currentValue)))
        );
      },
      get showPlaceholder() {
        return !state.isLoadingOptions && !state.showSelection;
      },
      get showLoadingOptions() {
        return state.isLoadingOptions;
      },
      get isDisabled() {
        return state.disabled || state.isLoadingOptions;
      },

      searchKey: '',
      setSearchKey: (text = '') => (state.searchKey = text),
      isSearchFocused: false,
      onSearchFocus: () => (state.isSearchFocused = true),
      onSearchBlur: () => (state.isSearchFocused = false),
      onlySelectedToggled: false,
      toggleOnlySelected: () => (state.onlySelectedToggled = !state.onlySelectedToggled),
      get displayOptions() {
        let optionsList = state.options;

        if (state.onlySelectedToggled) {
          optionsList = optionsList.filter((option) => state.value.includes(option.value));
        }

        if (state.searchKey) {
          const regex = new RegExp(state.searchKey, 'i');
          optionsList = optionsList.filter((option) => regex.test(option.name));
        }

        return optionsList;
      },

      get disableShowOnlySelected() {
        return !state.value.length;
      },
      get disableClearSelection() {
        const nonRemovableOptions = state.options
          .filter((option) => option.disabled && !option.allowDisabledDeselect)
          .map((option) => option.value);
        return isMultiSelect
          ? !state.value.length ||
              state.value.findIndex((optionValue) => !nonRemovableOptions.includes(optionValue)) ===
                -1
          : !['number', 'string'].includes(typeof state.value);
      },
      get disableRestoreSelection() {
        return (
          (isMultiSelect && !state.currentValue.length) ||
          (!isMultiSelect && !['number', 'string'].includes(typeof state.currentValue)) ||
          JSON.stringify(state.value) === JSON.stringify(state.currentValue)
        );
      },

      get showErrorMessages() {
        return state.showErrorState && state.errorMessage?.length > 1;
      },

      infoSelectTooltipInfoId: 'ISTI' + generateRandomId(),
      errorSelectTooltipInfoId: 'ESTI' + generateRandomId(),
      disabledSelectTooltipInfoId: 'DSTI' + generateRandomId()
    }));

    useEffect(() => {
      state.setOptions(options);
    }, [options]);

    useEffect(() => {
      state.setCurrentValue(value);
      if (state.toggled) {
        state.setValue(value);
      }
    }, [value]);

    useEffect(() => {
      state.setOnChange(onChange);
    }, [onChange]);

    useEffect(() => {
      state.setDisabled(disabled);
    }, [disabled]);

    useEffect(() => {
      state.setIsLoadingOptions(isLoadingOptions);
    }, [isLoadingOptions]);

    useEffect(() => {
      state.setShowErrorState(showErrorState);
    }, [showErrorState]);

    useEffect(() => {
      state.setErrorMessage(errorMessage);
    }, [errorMessage]);

    useEffect(() => {
      state.setInfoMessage(infoMessage);
    }, [infoMessage]);

    return (
      <>
        {state.toggled &&
          createPortal(
            <div className="component-input-select-portal">
              <div className="header">
                <div className="header-search">
                  <input
                    placeholder="Search options"
                    value={state.searchKey}
                    onChange={(ev) => state.setSearchKey(ev.target.value)}
                    onFocus={state.onSearchFocus}
                    onBlur={state.onSearchBlur}
                    style={state.isSearchFocused || state.searchKey ? { width: '300px' } : {}}
                  />
                  {!state.searchKey && (
                    <div className="search-icon">
                      <img src="icon-search.png" />
                    </div>
                  )}
                  {!!state.searchKey && (
                    <div className="clear-search-icon" onClick={() => state.setSearchKey()}>
                      <img src="icon-clear-search.png" />
                    </div>
                  )}
                </div>

                <div className="header-actions">
                  {isMultiSelect && (
                    <button
                      onClick={state.toggleOnlySelected}
                      disabled={state.disableShowOnlySelected}>
                      {state.onlySelectedToggled ? <b>Show only selected</b> : 'Show only selected'}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (isMultiSelect) {
                        const nonRemovableOptions = state.options
                          .filter((option) => option.disabled && !option.allowDisabledDeselect)
                          .map((option) => option.value);
                        state.setValue(
                          state.value.filter((optionValue) =>
                            nonRemovableOptions.includes(optionValue)
                          )
                        );
                      } else {
                        state.setValue(undefined);
                      }
                    }}
                    disabled={state.disableClearSelection}>
                    {isMultiSelect ? 'Clear selections' : 'Clear selection'}
                  </button>
                  <button
                    onClick={() => {
                      state.setValue(state.currentValue);
                    }}
                    disabled={state.disableRestoreSelection}>
                    {isMultiSelect ? 'Restore selections' : 'Restore selection'}
                  </button>
                </div>
              </div>
              <div className="options">
                {!state.displayOptions.length && <div>No options based on current criteria</div>}
                {state.displayOptions.map((option) => {
                  let isSelected = false;
                  if (isMultiSelect) {
                    if (state.value.includes(option.value)) {
                      isSelected = true;
                    }
                  } else {
                    if (option.value === state.value) {
                      isSelected = true;
                    }
                  }

                  const classNames = ['option'];
                  if (isSelected) {
                    classNames.push('selected');
                  }
                  if (option.disabled) {
                    classNames.push('disabled');
                    if (option.allowDisabledDeselect && isSelected) {
                      classNames.push('allow-disabled-deselect');
                    }
                  }
                  const className = classNames.join(' ');

                  const selectOptionTooltipInfoId = 'SOTI' + generateRandomId();
                  const disabledSelectOptionTooltipInfoId = 'DSOTI' + generateRandomId();

                  return (
                    <div
                      key={option.value}
                      className={className}
                      onClick={() => {
                        if (!option.disabled) {
                          if (!isMultiSelect && isSelected) {
                            console.log(
                              'Prevented unnecessary call for single select already selected option.'
                            );
                            // do nothing for now and probably forever
                          } else {
                            state.onSelectionChange(option.value);
                          }
                        } else {
                          if (option.allowDisabledDeselect && isSelected) {
                            state.onSelectionChange(option.value);
                          }
                        }
                      }}>
                      {isMultiSelect && (
                        <div className={`checkbox ${isSelected ? 'checked' : ''}`} />
                      )}
                      {!isMultiSelect && isSelected && (
                        <div className="single-selection-indicator">{'→'}</div>
                      )}
                      {!!option.image && (
                        <div className="option-image">
                          <img src={option.image} />
                        </div>
                      )}
                      <div className="name">{option.name}</div>
                      {!!option.optionInfo && (
                        <>
                          <div
                            className="select-option-info"
                            id={selectOptionTooltipInfoId}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              e.nativeEvent?.preventDefault();
                              e.nativeEvent?.stopPropagation();
                              e.nativeEvent?.stopImmediatePropagation();
                            }}>
                            i
                          </div>
                          <Tooltip
                            anchorSelect={`#${selectOptionTooltipInfoId}`}
                            variant="light"
                            opacity={1}
                            place="bottom-end"
                            content={option.optionInfo}
                            border="1px solid #5aa9ed"
                          />
                        </>
                      )}
                      {option.disabled && !!option.disabledOptionInfo && (
                        <>
                          <div
                            className="disabled-select-option-info"
                            id={disabledSelectOptionTooltipInfoId}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              e.nativeEvent?.preventDefault();
                              e.nativeEvent?.stopPropagation();
                              e.nativeEvent?.stopImmediatePropagation();
                            }}>
                            d
                          </div>
                          <Tooltip
                            anchorSelect={`#${disabledSelectOptionTooltipInfoId}`}
                            variant="dark"
                            opacity={1}
                            place="bottom-end"
                            content={option.disabledOptionInfo}
                          />
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="bottom-actions">
                <button onClick={state.toggle}>Cancel</button>
                <button onClick={state.onSelectionConfirmation}>Confirm</button>
              </div>
            </div>,
            document.getElementById('root-input-portals')
          )}
        <div className="component-input-select">
          {!!label && (
            <div className="label">
              {label}
              {required && <div className="required">*</div>}
            </div>
          )}
          <div
            className={`input-box ${state.isDisabled ? 'disabled' : ''}`}
            onClick={state.onClick}>
            {state.isLoadingOptions && (
              <div className="base-text text-placeholder">Loading options</div>
            )}
            {state.showPlaceholder && (
              <div className="base-text text-placeholder">{placeholder}</div>
            )}
            {state.showSelection && (
              <div className="base-text text-selection">
                {isMultiSelect && state.currentValue.length > 1
                  ? `${state.currentValue.length} Selected`
                  : state.options.find(
                      (option) =>
                        option.value ===
                        (Array.isArray(state.currentValue)
                          ? state.currentValue[0]
                          : state.currentValue)
                    )?.name ||
                    (Array.isArray(state.currentValue)
                      ? state.currentValue[0]
                      : state.currentValue)}
              </div>
            )}
            {!!state.infoMessage?.length && (
              <>
                <div
                  className="info-select-input-info"
                  id={state.infoSelectTooltipInfoId}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent?.preventDefault();
                    e.nativeEvent?.stopPropagation();
                    e.nativeEvent?.stopImmediatePropagation();
                  }}>
                  i
                </div>
                <Tooltip
                  anchorSelect={`#${state.infoSelectTooltipInfoId}`}
                  variant="light"
                  opacity={1}
                  place="bottom-end"
                  content={
                    Array.isArray(state.infoMessage)
                      ? state.infoMessage.join('\n')
                      : state.infoMessage
                  }
                  border="1px solid #5aa9ed"
                />
              </>
            )}
            {state.showErrorMessages && (
              <>
                <div
                  className="error-select-input-info"
                  id={state.errorSelectTooltipInfoId}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent?.preventDefault();
                    e.nativeEvent?.stopPropagation();
                    e.nativeEvent?.stopImmediatePropagation();
                  }}>
                  e
                </div>
                <Tooltip
                  anchorSelect={`#${state.errorSelectTooltipInfoId}`}
                  variant="light"
                  opacity={1}
                  place="bottom-end"
                  content={
                    Array.isArray(state.errorMessage)
                      ? state.errorMessage.join('\n')
                      : state.errorMessage
                  }
                  border="1px solid #b31102"
                />
              </>
            )}
            {state.disabled && !!disabledInfo && (
              <>
                <div
                  className="disabled-select-input-info"
                  id={state.disabledSelectTooltipInfoId}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    e.nativeEvent?.preventDefault();
                    e.nativeEvent?.stopPropagation();
                    e.nativeEvent?.stopImmediatePropagation();
                  }}>
                  d
                </div>
                <Tooltip
                  anchorSelect={`#${state.disabledSelectTooltipInfoId}`}
                  variant="dark"
                  opacity={1}
                  place="bottom-end"
                  content={disabledInfo}
                />
              </>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default Select;
