import { computed, ref, Ref } from 'vue';
import { isUndefined } from '../utils';

type OnSet = (...args: any) => any;
type OnGet = (...args: any) => any;

export default <T>(
  modelValue: Ref<T | undefined>,
  defaultValue: T,
  onSet: OnSet = (data: T) => data,
  onGet: OnGet = (data: T) => data
) => {
  const controlValue = ref<T>(defaultValue);
  return computed({
    get() {
      const value = isUndefined(modelValue.value)
        ? controlValue.value
        : modelValue.value;
      return onGet(value);
    },
    set(value: T) {
      controlValue.value = value;
      onSet(value);
    },
  });
};
