# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.3"></a>
## [2.0.3](https://github.com/vesparny/statty/compare/v2.0.2...v2.0.3) (2017-10-15)


### Bug Fixes

* setState when needed in case children update state in cWM/cDM closes #15 (#16) ([5ebe2c2](https://github.com/vesparny/statty/commit/5ebe2c2)), closes [#15](https://github.com/vesparny/statty/issues/15) [#16](https://github.com/vesparny/statty/issues/16)



<a name="2.0.2"></a>
## [2.0.2](https://github.com/vesparny/statty/compare/v2.0.1...v2.0.2) (2017-10-03)


### Bug Fixes

* remove useless typeof comparison ([87f3f6a](https://github.com/vesparny/statty/commit/87f3f6a))



<a name="2.0.1"></a>
## [2.0.1](https://github.com/vesparny/statty/compare/v2.0.0...v2.0.1) (2017-10-03)


### Bug Fixes

* if selectors returns undefined or null always rerender ([dc7b8b6](https://github.com/vesparny/statty/commit/dc7b8b6))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/vesparny/statty/compare/v1.0.0...v2.0.0) (2017-10-03)


### Bug Fixes

* throws if updaters invoke other updaters ([67e8a26](https://github.com/vesparny/statty/commit/67e8a26))


### Chores

* do not use xtend anymore ([08085de](https://github.com/vesparny/statty/commit/08085de))


### Performance Improvements

* improve performance with nested subscription by re-rendering only if necessary ([3e473fa](https://github.com/vesparny/statty/commit/3e473fa))


### BREAKING CHANGES

* updaters MUST return a complete new state, without
mutating the old one



<a name="1.0.0"></a>
# 1.0.0 (2017-09-25)


### Features

* add inspect ([97b6368](https://github.com/vesparny/statty/commit/97b6368))
* initial version ([ad8e5ba](https://github.com/vesparny/statty/commit/ad8e5ba))
