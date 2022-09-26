// mdx-m3-viewer preps a canvas even though we don't use it
import "jest-environment-jsdom";
HTMLCanvasElement.prototype.getContext = jest.fn();

// TextDecoder used with Fengari interface
import { TextDecoder, TextEncoder } from "util";
Object.assign(globalThis, { TextDecoder, TextEncoder });

// WC3 APIs
import * as w3api from "w3api/dist/api";
Object.assign(globalThis, w3api);

// w3ts APIs
import * as w3ts from "w3api/dist/w3ts";
Object.assign(globalThis, w3ts);
