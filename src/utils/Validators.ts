export const StringValidators = {
    lengthValidation: (str: string): boolean => str.length >= 8,
  
    emailSubjectLengthValidation: (str: string): boolean => str.length > 988,
  
    emailBodyLengthValidation: (str: string): boolean => str.length > 384000,
  
    containsUppercase: (str: string): boolean => /[A-Z]/.test(str),
  
    containsLowercase: (str: string): boolean => /[a-z]/.test(str),
  
    containsNumbers: (str: string): boolean => /[0-9]/.test(str),
  
    containsSpecialChars: (str: string): boolean => /[!@#\$&*~_^]/.test(str),
  
    mobileValidate: (str: string): boolean =>
      /^(\+0?1\s)?((\d{3})|(\(\d{3}\)))?(\s|-)\d{3}(\s|-)\d{4}$/.test(str),
  
    emailValidate: (str: string): boolean =>
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        str
      ),
  
    imageValidate: (str: string): string =>
      str.replace(/^data:image\/[a-z]+;base64,/, ''),
  
    numberValidate: (): RegExp => /[0-9+]/
  };
  export const DateUtils = {
    nextDay: (date: Date): Date => {
      const next = new Date(date);
      next.setDate(date.getDate() + 1);
      return next;
    },
  
    isSameDay: (date1: Date, date2: Date): boolean =>
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate(),
  
    isSameDayOrAfter: (date1: Date, date2: Date): boolean =>
      date1 >= date2 || DateUtils.isSameDay(date1, date2),
  
    isSameDayOrBefore: (date1: Date, date2: Date): boolean =>
      date1 <= date2 || DateUtils.isSameDay(date1, date2),
  
    removeTime: (date: Date): Date =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate()),
  
    isSameMonth: (date1: Date, date2: Date): boolean =>
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth()
  };
  