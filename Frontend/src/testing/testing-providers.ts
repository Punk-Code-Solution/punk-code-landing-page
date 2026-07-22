import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

/** Providers comuns para specs de componentes com RouterLink / animações. */
export const testingProviders = [provideRouter([]), provideNoopAnimations()];
