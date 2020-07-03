import { Observable } from 'rxjs';
import { ChangeDetectorRef, Type } from '@angular/core';

export interface StrategySelection {
  [strategy: string]: RenderStrategy;
}

export interface RenderStrategyFactoryConfig<T> {
  cdRef: ChangeDetectorRef;
  component: Type<T> | HTMLElement;
}

/**
 * @description
 *
 */
export interface RenderStrategy {
  /**
   * @property
   * Name of the strategy
   */
  name: string;
  /**
   * @property
   * Static method to uses the strategy specific behavior when call the render method.
   * Takes a callback that signals the render and returns an AbortController to stop scheduled work
   */
  scheduleCD: <T>(afterCD?: () => T) => AbortController;
  /**
   * @property
   * RxJS operator to uses the strategy specific behavior when call the render method.
   * Takes a callback that signals the render and returns and Observable to unsubscribe from and stop work.
   */
  rxScheduleCD: <T>(o: Observable<T>) => Observable<any>;
  /**
   * @property
   * Calls the render method directly
   */
  detectChanges: () => void;
}
