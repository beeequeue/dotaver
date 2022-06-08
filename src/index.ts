export enum DotaPatchType {
  Major = "major",
  Minor = "minor",
  Patch = "patch",
}

export class DotaVersion {
  private static regex = /^(\d)\.(\d+)([a-z])?$/

  major: number
  minor: number
  patch: number

  get type(): DotaPatchType {
    return this.patch === 0
      ? this.minor === 0
        ? DotaPatchType.Major
        : DotaPatchType.Minor
      : DotaPatchType.Patch
  }

  constructor(major: number, minor: number, patch: number) {
    this.major = major
    this.minor = minor
    this.patch = patch
  }

  static parse(input: string) {
    const matches = this.regex.exec(input)

    if (matches == null) throw new Error(`Got invalid DotaVersion (${input}).`)

    const major = Number(matches[1])
    const minor = Number(matches[2])
    const patch = matches[3] != null ? matches[3].codePointAt(0)! - 97 + 1 : 0

    return new DotaVersion(major, minor, patch)
  }

  static from(version: DotaVersion) {
    return new DotaVersion(version.major, version.minor, version.patch)
  }

  next(type: DotaPatchType) {
    const newVersion = DotaVersion.from(this)

    switch (type) {
      case DotaPatchType.Major:
        newVersion.major++
        newVersion.minor = 0
        newVersion.patch = 0
        break
      case DotaPatchType.Minor:
        newVersion.minor++
        newVersion.patch = 0
        break
      case DotaPatchType.Patch:
        newVersion.patch++
        break
    }

    return newVersion
  }

  toNumber() {
    return this.major * 10_000 + this.minor * 100 + this.patch
  }

  toString() {
    let minorPart = this.minor.toString()
    if (this.minor < 10) {
      minorPart = minorPart.padStart(2, "0")
    }

    const patchPart = this.patch !== 0 ? String.fromCodePoint(this.patch + 97 - 1) : ""

    return `${this.major}.${minorPart}${patchPart}`
  }
}
