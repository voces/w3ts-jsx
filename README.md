# w3ts-jsx

Add JSX to your WC3 maps!

## Features

| Feature                                                                                       | Status                  |
| --------------------------------------------------------------------------------------------- | ----------------------- |
| [Box model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model) | ❌                       |
| [Base frame types](https://github.com/voces/w3ts-jsx/issues/1)                                | ✔️                      |
| Lifecycle methods                                                                             | ❌ (possible with hooks) |
| JSX                                                                                           | ✔️                      |
| Class components                                                                              | ✔️                      |
| Functional components                                                                         | ✔️                      |
| [Hooks](https://github.com/voces/basic-pragma/issues/1)                                       | ✔️                      |
| [Fragments](https://github.com/voces/w3ts-jsx/issues/2)                                       | ✔️                      |

## Usage

1. Install the dependency

```
npm install -S w3ts-jsx
```

2. Configure `tsconfig.json`

```ts
{
  "compilerOptions": {
    "jsx": "react",
    "jsxFactory": "createElement",
    "jsxFragmentFactory": "Fragment"
  }
}
```

3. Implement a JSX component

```tsx
import { createElement, useEffect, useState } from "w3ts-jsx";
import { Timer } from "@voces/w3ts";

export const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = new Timer();
    timer.start(1, true, () => setCount((c) => c + 1));

    return () => timer.destroy();
  }, []);

  return (
    <button
      inherits="ScoreScreenTabButtonTemplate"
      absPosition={{ point: FRAMEPOINT_CENTER, x: 0.4, y: 0.3 }}
      size={{ width: 0.1, height: 0.04 }}
      onClick={() => print("Button Clicked")}
    >
      <backdrop
        position="parent"
        texture="ReplaceableTextures\\CommandButtons\\BTNSelectHeroOn"
      />
      <text text={`Waited ${count} seconds`} position="parent" />
    </button>
  );
};
```

4. Render it

```tsx
import { adapter, createElement, render, setAdapter } from "w3ts-jsx";
import { App } from "./App";

setAdapter(adapter);

render(<App />, BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0));
```

### Examples

- [w3ts-jsx-example](https://github.com/voces/w3ts-jsx-example).
- [duels](https://github.com/voces/duels).
