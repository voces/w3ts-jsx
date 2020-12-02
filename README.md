# w3ts-jsx
Add JSX to your WC3 maps!

## Features
| Feature | Status |
| --- | --- |
| [Box model](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model) | ❌ |
| [Base frame types](https://github.com/voces/w3ts-jsx/issues/1) | ❌ |
| Lifecycle methods | ❌ |
| JSX | ✔️ |
| Class components | ✔️ |
| Functional components | ✔️ |
| [Hooks](https://github.com/voces/basic-pragma/issues/1) | 🚧 |
| [Fragments](https://github.com/voces/w3ts-jsx/issues/2) | ✔️ |

## Usage
1. Install the dependency.

```
npm install -S w3ts-jsx
```

2. Confiure `tsconfig.json`

```ts
{
    "compilerOptions": {
        "types": [
            "w3ts-jsx/dist/src/types" // Add `frame` to your known global types
        ]
    },
    "include": [
        // Ensure the packages are included in your lua
        "node_modules/w3ts-jsx/dist",
        "node_modules/w3ts-jsx/dist/node_modules/basic-pragma"
    ],
    "tstl": {
        // Add JSX support to Typescript-to-Lua
        "luaPlugins": [{
            "name": "tstl-jsx",
            "import": "JsxTransformer"
        }]
    }
}
```

3. Use JSX

```tsx
// Import using a relative URL to for path consistency with Typescript-to-Lua
import * as React from "../node_modules/w3ts-jsx/dist/src/index";

const App = (): React.Node => (
    <button
        inherits="ScoreScreenTabButtonTemplate"
        absPosition={[{ point: FRAMEPOINT_CENTER, x: 0.4, y: 0.3 }]}
        size={{ width: 0.05, height: 0.05 }}
        onClick={() => print("Button Clicked")}
    >
        <backdrop
            position="parent"
            texture={"ReplaceableTextures\\CommandButtons\\BTNSelectHeroOn"}
        />
    </button>
);

React.render(<App />, BlzGetOriginFrame(ORIGIN_FRAME_GAME_UI, 0));
```

### Example
See an example repo at [w3ts-jsx-example](https://github.com/voces/w3ts-jsx-example).
