// Implementação simplificada do class-variance-authority
export type VariantProps<T extends (...args: any) => any> = Partial<
  Parameters<T>[0]
>;

export function cva(
  base: string,
  options?: {
    variants?: Record<string, Record<string, string>>;
    defaultVariants?: Record<string, string>;
  }
) {
  return function(props: Record<string, string> = {}) {
    let classes = base;
    
    if (options?.variants) {
      Object.entries(options.variants).forEach(([key, variants]) => {
        const value = props[key] || options?.defaultVariants?.[key];
        if (value && variants[value]) {
          classes += ` ${variants[value]}`;
        }
      });
    }
    
    if (props.className) {
      classes += ` ${props.className}`;
    }
    
    return classes;
  };
} 