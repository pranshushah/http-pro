import React from 'react';
type Playground = {
  name: string;
  url: string;
  img: string;
};
const playgrounds: Playground[] = [
  {
    name: 'CodeSandbox',
    url: 'https://codesandbox.io/s/http-pro-wcfp64?file=/src/index.ts',
    img: require('@site/static/img/codesandbox.png').default,
  },
  {
    name: 'StackBlitz',
    url: 'https://stackblitz.com/edit/typescript-vgeb2m?file=index.ts',
    img: require('@site/static/img/stackblitz.png').default,
  },
];

function PlayGroundCard({ name, url, img }: Playground) {
  return (
    <div className="col col-4 margin-bottom--md">
      <div className="card">
        <div className="card__image">
          <img src={img} alt={name} />
        </div>
        <div className="card__body">
          <h4>{name}</h4>
        </div>
        <div className="card__footer">
          <a
            href={url}
            style={{ background: 'var(--ifm-color-primary-light)' }}
            className="button button--block"
            target="_blank"
          >
            Try it now!
          </a>
        </div>
      </div>
    </div>
  );
}

export function PlayGround() {
  return (
    <div className="container">
      <div className="row">
        {playgrounds.map((playground, index) => {
          return <PlayGroundCard {...playground} key={index} />;
        })}
      </div>
    </div>
  );
}
