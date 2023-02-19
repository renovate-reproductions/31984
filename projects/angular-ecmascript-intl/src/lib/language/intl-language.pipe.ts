import {Inject, Optional, Pipe, PipeTransform} from '@angular/core';
import {INTL_LOCALES} from "../locale";
import {INTL_LANGUAGE_PIPE_DEFAULT_OPTIONS} from "./intl-language-pipe-default-options";

export type IntlLanguagePipeOptions = Partial<Intl.DisplayNamesOptions>;

@Pipe({
  name: 'intlLanguage',
  standalone: true,
})
export class IntlLanguagePipe implements PipeTransform {

  constructor(@Optional() @Inject(INTL_LOCALES) readonly locale?: string | string[] | null,
              @Optional() @Inject(INTL_LANGUAGE_PIPE_DEFAULT_OPTIONS) readonly defaultOptions?: IntlLanguagePipeOptions | null) {
  }

  transform(value: string | null | undefined, options?: IntlLanguagePipeOptions): string | null {
    if (!value) {
      return null;
    }

    try {
      return new Intl.DisplayNames(this.locale ?? undefined, {
        ...this.defaultOptions, ...options,
        type: 'language'
      }).of(value) ?? null;
    } catch (e) {
      console.error('Error while transforming the language', e);
      return value;
    }
  }

}
