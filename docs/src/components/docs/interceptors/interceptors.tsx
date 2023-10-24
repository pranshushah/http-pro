import React from 'react';
import { CodesandboxExample } from '../../common';

export function BeforeRequest() {
  return (
    <CodesandboxExample
      baseURL={'https://codesandbox.io/embed/before-request-interceptor-zmwdg5'}
    />
  );
}

export function AfterResponse() {
  return (
    <CodesandboxExample
      baseURL={'https://codesandbox.io/embed/after-response-interceptor-6wfxrt'}
    />
  );
}

export function BeforeError() {
  return (
    <CodesandboxExample baseURL="https://codesandbox.io/embed/before-error-interceptor-vqflqv" />
  );
}
