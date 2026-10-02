'use client';

import { useEffect, useMemo, useState } from 'react';
import Select from 'react-select';

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#fff',
    borderColor: state.isFocused ? '#2c1e17' : 'rgba(44, 30, 23, 0.15)',
    boxShadow: 'none',
    fontSize: 14,
    cursor: 'pointer',
    '&:hover': { borderColor: state.isFocused ? '#2c1e17' : 'rgba(44, 30, 23, 0.3)' },
    opacity: state.isDisabled ? 0.6 : 1,
  }),
  valueContainer: (base) => ({ ...base, padding: '2px 12px' }),
  placeholder: (base) => ({ ...base, color: 'rgba(90, 68, 56, 0.6)' }),
  singleValue: (base) => ({ ...base, color: '#2c1e17' }),
  input: (base) => ({ ...base, color: '#2c1e17' }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (base) => ({ ...base, color: '#5a4438' }),
  menu: (base) => ({ ...base, borderRadius: 12, overflow: 'hidden', fontSize: 14 }),
  // Scrollbar hide (scroll mouse/touch se phir bhi chalega)
  menuList: (base) => ({
    ...base,
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
  }),
  option: (base, state) => ({
    ...base,
    cursor: 'pointer',
    color: state.isSelected ? '#fff' : '#2c1e17',
    backgroundColor: state.isSelected ? '#614338' : state.isFocused ? '#ffe5cd' : '#fff',
    ':active': { backgroundColor: '#ffe5cd' },
  }),
  // Modal ke upar dikhane ke liye (modal z-index = 100)
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

export default function StateCitySelect({ state, city, onChange, disabled = false }) {
  const [data, setData] = useState(null);

  // Modal sirf client par khulta hai, isliye document available hai
  const portalTarget = typeof document !== 'undefined' ? document.body : null;

  // Library sirf tab load hogi jab modal khulega (bundle halka rehta hai)
  useEffect(() => {
    let active = true;

    import('country-state-city').then((mod) => {
      if (active) setData(mod);
    });

    return () => {
      active = false;
    };
  }, []);

  // India ke saare states
  const stateOptions = useMemo(() => {
    if (!data) return [];

    return data.State.getStatesOfCountry('IN').map((s) => ({
      value: s.name,
      label: s.name,
      isoCode: s.isoCode,
    }));
  }, [data]);

  const selectedState = stateOptions.find((s) => s.value === state) || null;

  // Selected state ki cities
  const cityOptions = useMemo(() => {
    if (!data || !selectedState) return [];

    return data.City.getCitiesOfState('IN', selectedState.isoCode).map((c) => ({
      value: c.name,
      label: c.name,
    }));
  }, [data, selectedState]);

  const selectedCity = cityOptions.find((c) => c.value === city) || null;

  return (
    <div className="grid grid-cols-2 gap-3">
      {/* State */}
      <div className="min-w-0">
        <label htmlFor="enquiry-state" className="mb-1.5 block text-[13px] font-medium text-ink">
          State <span className="text-red-600">*</span>
        </label>

        <Select
          inputId="enquiry-state"
          instanceId="enquiry-state-select"
          options={stateOptions}
          value={selectedState}
          onChange={(opt) => onChange({ state: opt ? opt.value : '', city: '' })}
          placeholder={data ? 'Select state' : 'Loading states...'}
          isLoading={!data}
          isDisabled={disabled || !data}
          noOptionsMessage={() => 'No state found'}
          styles={selectStyles}
          menuPortalTarget={portalTarget}
          menuPosition="fixed"
          menuPlacement="auto"
          maxMenuHeight={220}
        />
      </div>

      {/* City */}
      <div className="min-w-0">
        <label htmlFor="enquiry-city" className="mb-1.5 block text-[13px] font-medium text-ink">
          City <span className="text-red-600">*</span>
        </label>

        <Select
          inputId="enquiry-city"
          instanceId="enquiry-city-select"
          options={cityOptions}
          value={selectedCity}
          onChange={(opt) => onChange({ state, city: opt ? opt.value : '' })}
          placeholder={selectedState ? 'Select city' : 'Select state first'}
          isDisabled={disabled || !selectedState}
          noOptionsMessage={() => 'No city found'}
          styles={selectStyles}
          menuPortalTarget={portalTarget}
          menuPosition="fixed"
          menuPlacement="auto"
          maxMenuHeight={220}
        />
      </div>
    </div>
  );
}