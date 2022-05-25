import React from 'react';
import styles from './styles.module.css';

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <h1>Why Http pro?</h1>
        <ul>
          <li>
            Built on top of the Browser's{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
              target="_blank"
            >
              fetch api.
            </a>
          </li>
          <li>Better Typescript support than fetch api.</li>
          <li>Simpler syntax.</li>
          <li>Light weight {`(gzipped < 5kb)`}.</li>
          <li>
            Works well with{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/URL"
              target="_blank"
            >
              URL,{' '}
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Headers"
              target="_blank"
            >
              Header,{' '}
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams"
              target="_blank"
            >
              URLSearchParams,{' '}
            </a>
            <a href="" target="_blank">
              Request{' '}
            </a>
            Objects.
          </li>
          <li>lifecycle methods.</li>
          <li>Instance and extending instances with defaults.</li>
        </ul>
        <h1>Why Http pro over axios?</h1>
        <ul>
          <li>
            axios uses XMLHttpRequests in browser. so it can't leverage all the
            new features that javascript provides with fetch-api. for example,
            axios does not support the{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/URL"
              target="_blank"
            >
              URL,{' '}
            </a>
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Headers"
              target="_blank"
            >
              Header,{' '}
            </a>
            <a href="" target="_blank">
              Request{' '}
            </a>
            Objects.
          </li>
          <li>
            it does not have support for{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API#service_worker_concepts_and_usage"
              target="_blank"
            >
              service workers{' '}
            </a>
            and{' '}
            <a
              href="https://developer.mozilla.org/en-US/docs/Web/API/Cache"
              target="_blank"
            >
              Cache API{' '}
            </a>
            out of the box.
          </li>
          <li>
            axios has implemented a lot functionality that fetch provides out of
            the box. which means that fetch-based library will be less buggy.
          </li>
        </ul>
      </div>
    </section>
  );
}
