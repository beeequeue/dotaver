# `dotaver`

Semver but for Dota 2 patch versions

## Usage

```shell
npm i dotaver
yarn add dotaver
pnpm i dotaver
```

```ts
import { DotaVersion } from "dotaver"

const version = DotaVersion.parse("7.36b")

console.log(version.toString()) // "7.36b"
```
