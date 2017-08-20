# React Toolkit
## Release Checklist

This is the release process for publishing version `x.y.z` to npm.

1. Merging Changes into the `master` branch:
    - [ ] Create a branch off of `develop` named `vx.y.z`
    - [ ] Update the `package.json` version to `x.y.z`
    - [ ] Update `CHANGELOG.md` and change `To be released` to `vx.y.z`
    - [ ] Execute the command `npm run build:docs`
    - [ ] Execute the command `npm run build`
    - [ ] Execute `npm publish`
    - [ ] Open a PR named `vx.y.z` and merge `vx.y.z` into master & delete the branch

1. Update `develop`
    - [ ] Merge `master` back into `develop`
    - [ ] Create a branch off of `develop` named `post-vx.y.z`
    - [ ] Update the `package.json` version to `x.y.z-dev`
    - [ ] Update `CHANGELOG.md` and add a `To be released` heading
    - [ ] Open a PR named `post-vx.y.z` and merge it

1. Create a release tag
    - [ ] Create a [release tag](https://github.com/tony-dinh/react-toolkit/releases) off of `master` name it `vx.y.z`

