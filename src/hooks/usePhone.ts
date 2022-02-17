import { useState } from 'react';

export const usePhone = (value: string) => {
  const [phone, setPhone] = useState(value);

  const [dialCode, setDialCode] = useState('1');

  const [phoneIsDirty, setPhoneIsDirty] = useState(false);

  const onChangePhone = (value: string, dialCode: string) => {
    setPhone(value);
    setDialCode(dialCode);
    !phoneIsDirty && setPhoneIsDirty(true);
  };

  const getPhone = () => {
    const phoneNumber = phone.slice(dialCode.length);
    return `${dialCode} ${phoneNumber}`;
  };

  return { phone, phoneIsDirty, onChangePhone, getPhone };
};
