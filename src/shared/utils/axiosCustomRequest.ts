// src/api/axiosCustomRequest.ts
import { Observable } from 'rxjs';
import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import api from './axios';

export type AxiosResponseWithCancel<T = any> = {
  response: AxiosResponse<T>;
  cancelRequest: () => void;
};

/**
 * Creates an Observable that wraps an Axios request with cancellation support
 * @param config The Axios request configuration
 * @returns An Observable that emits the Axios response and provides a cancel method
 */
export function axiosCustomRequest<T = any>(
  config: AxiosRequestConfig
): Observable<AxiosResponse<T>> {
  return new Observable<AxiosResponse<T>>(observer => {
    const cancelToken: CancelTokenSource = axios.CancelToken.source();

    // Add cancelToken to the request config
    const requestConfig: AxiosRequestConfig = {
      ...config,
      cancelToken: cancelToken.token
    };

    api(requestConfig)
      .then((result: AxiosResponse<T>) => {
        observer.next(result);
        observer.complete();
      })
      .catch((error: any) => {
        // Check if the request was cancelled
        if (axios.isCancel(error)) {
          observer.complete();
        } else {
          observer.error(error);
        }
      });

    // Return cancellation function
    return () => cancelToken.cancel();
  });
}

export default axiosCustomRequest;